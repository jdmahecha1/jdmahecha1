<!-- Perfil de GitHub · toriikarii (jdmahecha1) -->
<div align="center">

<img src="https://capsule-render.vercel.app/api?type=waving&color=0:0d1117,55:1e3a8a,100:3ecf8e&height=210&section=header&text=toriikarii&fontSize=58&fontColor=ffffff&fontAlignY=36&desc=Ingenier%C3%ADa%20de%20Sistemas%20%C2%B7%20Bases%20de%20datos%20%C2%B7%20IA%20aplicada&descAlignY=60&descSize=18&animation=fadeIn" width="100%" alt="banner"/>

<a href="https://git.io/typing-svg">
  <img src="https://readme-typing-svg.demolab.com?font=JetBrains+Mono&weight=600&size=20&duration=3200&pause=900&color=3ECF8E&center=true&vCenter=true&width=640&lines=Dise%C3%B1o+bases+de+datos+en+Supabase+%2B+PostgreSQL;Construyo+agentes+de+IA+con+n8n;Automatizo+procesos+de+negocio+reales;Actualmente%3A+IDEA+IA+%F0%9F%A4%96" alt="typing"/>
</a>

<p>
  <img src="https://img.shields.io/badge/Tunja%2C%20Colombia-0d1117?style=flat-square&logo=googlemaps&logoColor=3ECF8E" alt="ubicación"/>
  <img src="https://img.shields.io/badge/Universidad%20Santo%20Tom%C3%A1s-0d1117?style=flat-square&logo=bookstack&logoColor=3ECF8E" alt="universidad"/>
  <img src="https://img.shields.io/badge/Abierto%20a%20pr%C3%A1cticas%20y%20freelance-3ECF8E?style=flat-square&logo=handshake&logoColor=0d1117" alt="disponible"/>
</p>

</div>

---

## 👨‍💻 Sobre mí

Estudiante de **Ingeniería de Sistemas** en la Universidad Santo Tomás (Tunja). Me gusta convertir problemas de negocio en sistemas que funcionan: modelo los datos, los protejo y les pongo una capa de IA encima.

- 🗄️ Diseño **bases de datos relacionales** en Supabase / PostgreSQL: modelado, políticas **RLS**, *triggers* y autenticación con **Google OAuth**.
- 🤖 Construyo **agentes de IA** y flujos de automatización en **n8n**.
- 🌐 Empecé por el **desarrollo web** (HTML, CSS y JavaScript) y de ahí salté al backend.
- 🧠 Trabajo con **IA como herramienta de desarrollo** (Claude + MCP) para diseñar, documentar y depurar más rápido.
- 🎯 Abierto a **prácticas** y proyectos **freelance** de bases de datos, backend o automatización con IA.

---

## 🚀 Proyecto destacado · IDEA IA

> Agente de IA para **IDEAPRO S.A.S.**, consultora que asesora a empresarios colombianos en **contratación pública y licitaciones** (SECOP, RUP, Colombia Compra Eficiente).

**El problema:** cada cliente llega con un nivel de experiencia distinto y necesita un servicio distinto.
**La solución:** un agente que conversa con el cliente, **diagnostica su nivel de madurez** y le recomienda el servicio adecuado, recordando el contexto entre conversaciones.

| | |
|---|---|
| 🧩 **Base de datos** | 14 tablas en PostgreSQL (Supabase) con **RLS habilitado en todas** |
| 🔐 **Autenticación** | Login con Google; un *trigger* sobre `auth.users` crea el perfil y la configuración del agente en el primer inicio de sesión |
| 🧠 **Memoria** | Memoria de largo plazo **por usuario** y configuración del agente individual, no global |
| 📊 **Diagnóstico** | Niveles de madurez, preguntas, sesiones y respuestas → recomendación de servicio |
| ⚙️ **Orquestación** | Nodo *AI Agent* en **n8n** conectado a la base de datos |

```mermaid
flowchart LR
    U([👤 Cliente]) -->|Google OAuth| AUTH[Supabase Auth]
    AUTH -->|trigger| PROV[(profiles<br/>user_ai_config)]
    U -->|chat| AG{{🤖 IDEA IA<br/>n8n · AI Agent}}
    AG <-->|lee / escribe| DB[(PostgreSQL<br/>14 tablas · RLS)]
    AG --> DIAG[Diagnóstico de<br/>madurez]
    DIAG --> REC[Recomendación<br/>de servicio]
    REC --> S1[Semillero]
    REC --> S2[Auditoría de pliegos]
    REC --> S3[Consorcios / alta complejidad]
```

<sub>Stack: Supabase · PostgreSQL · SQL · n8n · Google OAuth</sub>

---

## 🛠️ Tecnologías

**Datos & Backend**<br/>
<img src="https://img.shields.io/badge/Supabase-3ECF8E?style=for-the-badge&logo=supabase&logoColor=white"/>
<img src="https://img.shields.io/badge/PostgreSQL-4169E1?style=for-the-badge&logo=postgresql&logoColor=white"/>
<img src="https://img.shields.io/badge/SQL-0d1117?style=for-the-badge&logo=databricks&logoColor=white"/>

**IA & Automatización**<br/>
<img src="https://img.shields.io/badge/n8n-EA4B71?style=for-the-badge&logo=n8n&logoColor=white"/>
<img src="https://img.shields.io/badge/AI%20Agents-8B5CF6?style=for-the-badge&logo=probot&logoColor=white"/>
<img src="https://img.shields.io/badge/Claude%20%2B%20MCP-D97757?style=for-the-badge&logo=claude&logoColor=white"/>

**Web**<br/>
<img src="https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white"/>
<img src="https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white"/>
<img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black"/>

**Herramientas**<br/>
<img src="https://img.shields.io/badge/Git-F05032?style=for-the-badge&logo=git&logoColor=white"/>
<img src="https://img.shields.io/badge/GitHub-181717?style=for-the-badge&logo=github&logoColor=white"/>
<img src="https://img.shields.io/badge/Google%20Cloud-4285F4?style=for-the-badge&logo=googlecloud&logoColor=white"/>

---

## 📂 Otros proyectos

| Proyecto | Descripción | Stack |
|---|---|---|
| [**Deportes GGM**](https://github.com/jdmahecha1/deportesggm.github.io) | Sitio web multipágina sobre la vida deportiva de un colegio: fútbol, logros, juegos, ubicación y contacto. | `HTML` `CSS` `JavaScript` |

---

## 📈 En qué estoy ahora

```yaml
construyendo: IDEA IA — memoria de largo plazo, seguimientos y registro de eventos del agente
documentando: el diseño de la base de datos de IDEA PRO y el porqué de cada decisión
estudiando:   Ingeniería de Sistemas @ USTA Tunja (álgebra lineal, fundamentos)
```

---

## 📫 Contacto

<p>
  <a href="https://github.com/jdmahecha1"><img src="https://img.shields.io/badge/GitHub-jdmahecha1-181717?style=for-the-badge&logo=github&logoColor=white"/></a>
  <a href="mailto:dm901919@gmail.com"><img src="https://img.shields.io/badge/Gmail-dm901919%40gmail.com-EA4335?style=for-the-badge&logo=gmail&logoColor=white"/></a>
</p>

<div align="center">
<img src="https://capsule-render.vercel.app/api?type=waving&color=0:3ecf8e,45:1e3a8a,100:0d1117&height=110&section=footer" width="100%" alt="footer"/>
</div>
