// Genera las tarjetas de estadísticas del perfil (SVG) con la API de GitHub.
// Uso: GITHUB_TOKEN=... node scripts/estadisticas.mjs <usuario> <carpeta-salida>
import fs from 'node:fs';
import path from 'node:path';

const [usuario = 'jdmahecha1', salida = 'salida'] = process.argv.slice(2);
const token = process.env.GITHUB_TOKEN;
if (!token) throw new Error('Falta GITHUB_TOKEN');

async function consulta(query, variables) {
  const r = await fetch('https://api.github.com/graphql', {
    method: 'POST',
    headers: { Authorization: `bearer ${token}`, 'Content-Type': 'application/json', 'User-Agent': 'estadisticas-perfil' },
    body: JSON.stringify({ query, variables }),
  });
  const j = await r.json();
  if (j.errors) throw new Error(JSON.stringify(j.errors));
  return j.data;
}

const datos = await consulta(
  `query($u: String!) { user(login: $u) {
    repositories(first: 100, ownerAffiliations: OWNER, isFork: false, privacy: PUBLIC) {
      totalCount
      nodes { stargazerCount languages(first: 10, orderBy: { field: SIZE, direction: DESC }) { edges { size node { name color } } } }
    }
    contributionsCollection { contributionCalendar { totalContributions weeks { contributionDays { date contributionCount } } } }
  } }`,
  { u: usuario },
);

// Lenguajes: bytes de código sumados en todos los repos públicos propios.
const bytes = new Map();
for (const repo of datos.user.repositories.nodes) {
  for (const { size, node } of repo.languages.edges) {
    const prev = bytes.get(node.name) ?? { size: 0, color: node.color ?? '#8b949e' };
    prev.size += size;
    bytes.set(node.name, prev);
  }
}
const total = [...bytes.values()].reduce((a, b) => a + b.size, 0) || 1;
const lenguajes = [...bytes.entries()].map(([nombre, v]) => ({ nombre, color: v.color, pct: (v.size / total) * 100 })).sort((a, b) => b.pct - a.pct).slice(0, 6);

// Rachas a partir del calendario del último año.
const dias = datos.user.contributionsCollection.contributionCalendar.weeks.flatMap((w) => w.contributionDays);
const totalAnio = datos.user.contributionsCollection.contributionCalendar.totalContributions;
let mejor = 0;
let corrida = 0;
for (const d of dias) {
  corrida = d.contributionCount > 0 ? corrida + 1 : 0;
  mejor = Math.max(mejor, corrida);
}
// La racha actual no se rompe si hoy todavía no hay contribuciones.
let actual = 0;
let i = dias.length - 1;
if (i >= 0 && dias[i].contributionCount === 0) i--;
for (; i >= 0 && dias[i].contributionCount > 0; i--) actual++;
const diasActivos = dias.filter((d) => d.contributionCount > 0).length;
const ultimos30 = dias.slice(-30).reduce((a, d) => a + d.contributionCount, 0);
const repos = datos.user.repositories.totalCount;

const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' })[c]);
const FUENTE = "font-family='Segoe UI, Ubuntu, Helvetica, Arial, sans-serif'";
const marco = (alto, contenido) => `<svg xmlns='http://www.w3.org/2000/svg' width='420' height='${alto}' viewBox='0 0 420 ${alto}' role='img'>
<rect x='0.5' y='0.5' width='419' height='${alto - 1}' rx='10' fill='#0d1117' stroke='#30363d'/>
${contenido}
</svg>
`;

// Tarjeta de lenguajes: barra apilada y leyenda en dos columnas.
let x = 24;
const barra = lenguajes
  .map((l) => {
    const w = (l.pct / 100) * 372;
    const r = `<rect x='${x.toFixed(1)}' y='58' width='${Math.max(w, 1).toFixed(1)}' height='10' fill='${l.color}'/>`;
    x += w;
    return r;
  })
  .join('');
const leyenda = lenguajes
  .map((l, k) => {
    const cx = 24 + (k % 2) * 190;
    const cy = 98 + Math.floor(k / 2) * 26;
    return `<circle cx='${cx + 5}' cy='${cy - 4}' r='5' fill='${l.color}'/><text x='${cx + 18}' y='${cy}' ${FUENTE} font-size='13' fill='#c9d1d9'>${esc(l.nombre)} <tspan fill='#8b949e'>${l.pct.toFixed(1)}%</tspan></text>`;
  })
  .join('\n');
// Las dos tarjetas tienen la misma altura para verse parejas lado a lado.
const ALTO = 98 + Math.ceil(lenguajes.length / 2) * 26;
const svgLenguajes = marco(
  ALTO,
  `<text x='24' y='36' ${FUENTE} font-size='16' font-weight='600' fill='#3ecf8e'>Lenguajes más usados</text>
<clipPath id='c'><rect x='24' y='58' width='372' height='10' rx='5'/></clipPath><g clip-path='url(#c)'>${barra}</g>
${leyenda}`,
);

// Tarjeta de actividad: tres cifras grandes.
const dy = Math.max(0, (ALTO - 136) / 2);
const cifra = (cx, valor, etiqueta, color = '#f0f6fc') =>
  `<text x='${cx}' y='${86 + dy}' text-anchor='middle' ${FUENTE} font-size='30' font-weight='700' fill='${color}'>${valor}</text><text x='${cx}' y='${112 + dy}' text-anchor='middle' ${FUENTE} font-size='12' fill='#8b949e'>${etiqueta}</text>`;
const svgActividad = marco(
  ALTO,
  `<text x='24' y='36' ${FUENTE} font-size='16' font-weight='600' fill='#3ecf8e'>Actividad del último año</text>
${cifra(84, totalAnio, 'contribuciones')}
<line x1='147' y1='${60 + dy}' x2='147' y2='${116 + dy}' stroke='#30363d'/>
${cifra(210, ultimos30, 'en los últimos 30 días', '#f2b544')}
<line x1='273' y1='${60 + dy}' x2='273' y2='${116 + dy}' stroke='#30363d'/>
${cifra(336, repos, 'repositorios públicos')}`,
);

fs.mkdirSync(salida, { recursive: true });
fs.writeFileSync(path.join(salida, 'lenguajes.svg'), svgLenguajes);
fs.writeFileSync(path.join(salida, 'actividad.svg'), svgActividad);
console.log(JSON.stringify({ lenguajes: lenguajes.map((l) => `${l.nombre} ${l.pct.toFixed(1)}%`), totalAnio, ultimos30, repos, actual, mejor, diasActivos }));
