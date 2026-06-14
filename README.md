<div align="center">

<br/>

<img src="https://img.shields.io/badge/LANXA-TECHNOLOGY-7c5cff?style=for-the-badge&labelColor=06060f&color=7c5cff" height="36" alt="Lanxa Technology" />

<br/><br/>

# Lanxa Technology — Sitio Web Oficial

### *Ingeniería de software a la medida · Armenia, Colombia*

<br/>

[![Deploy](https://img.shields.io/badge/Deploy-Vercel-000000?style=flat-square&logo=vercel&logoColor=white)](https://lanxa-technology.vercel.app)
[![Next.js](https://img.shields.io/badge/Next.js-16-000000?style=flat-square&logo=next.js&logoColor=white)](https://nextjs.org)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?style=flat-square&logo=typescript&logoColor=white)](https://www.typescriptlang.org)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-CSS-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white)](https://tailwindcss.com)
[![License](https://img.shields.io/badge/License-MIT-1fe6cd?style=flat-square)](LICENSE)
[![Status](https://img.shields.io/badge/Status-Production-22c55e?style=flat-square)]()

<br/>

**[🌐 Ver sitio en vivo](https://lanxa-technology.vercel.app) · [📋 Reportar un issue](https://github.com/leonardeco/Lanxa-Technology/issues) · [💬 Contactar](https://wa.me/573226993891)**

<br/>

---

</div>

## Tabla de Contenidos

- [Visión General del Proyecto](#-visión-general-del-proyecto)
- [Objetivos Estratégicos](#-objetivos-estratégicos)
- [Arquitectura del Sistema](#-arquitectura-del-sistema)
- [Stack Tecnológico](#-stack-tecnológico)
- [Estructura del Proyecto](#-estructura-del-proyecto)
- [Secciones del Sitio](#-secciones-del-sitio)
- [Instalación y Configuración](#-instalación-y-configuración)
- [Variables de Entorno](#-variables-de-entorno)
- [Scripts Disponibles](#-scripts-disponibles)
- [Guía de Deploy](#-guía-de-deploy)
- [Equipo](#-equipo)
- [Hoja de Ruta](#-hoja-de-ruta)
- [Estándares de Calidad](#-estándares-de-calidad)
- [Contacto](#-contacto)

---

## 📌 Visión General del Proyecto

**Lanxa Technology** es un estudio de ingeniería de software especializado en el diseño y construcción de productos digitales a la medida. Este repositorio contiene el **sitio web corporativo oficial**, reconstruido desde cero en Next.js 16 para garantizar rendimiento, escalabilidad y mantenibilidad a largo plazo.

El sitio comunica la propuesta de valor de la empresa, presenta sus servicios, portafolio y equipo, y actúa como canal principal de captación de clientes tanto para el mercado B2C como B2B corporativo en LATAM y globalmente.

> **Versión anterior:** El sitio fue originalmente desarrollado en HTML/CSS/JS vanilla y desplegado en Netlify. Esta versión representa la migración completa a un stack moderno orientado a producción.

---

## 🎯 Objetivos Estratégicos

| # | Objetivo | Estado |
|---|----------|--------|
| 1 | Comunicar la propuesta de valor de Lanxa Technology de forma clara y profesional | ✅ Completado |
| 2 | Captar leads calificados a través de formulario de contacto y WhatsApp | ✅ Completado |
| 3 | Posicionar la empresa en Google para búsquedas de software a la medida en Colombia | 🔄 En progreso |
| 4 | Ofrecer una experiencia excelente en dispositivos móviles | ✅ Completado |
| 5 | Establecer canal B2B para empresas tecnológicas que buscan subcontratistas | ✅ Completado |
| 6 | Publicar contenido técnico (blog) para generar autoridad de dominio | 📅 Pendiente |

---

## 🏗 Arquitectura del Sistema

```
┌─────────────────────────────────────────────────────────────┐
│                        CLIENTE (Browser)                     │
│              React Components + Tailwind CSS                 │
└──────────────────────────┬──────────────────────────────────┘
                           │ HTTP / RSC
┌──────────────────────────▼──────────────────────────────────┐
│                      NEXT.JS 16 (App Router)                 │
│                                                              │
│  ┌─────────────────┐          ┌─────────────────────────┐   │
│  │  Static Pages   │          │      API Routes         │   │
│  │  / (Home)       │          │  /api/contact  (POST)   │   │
│  └─────────────────┘          └────────────┬────────────┘   │
│                                            │                 │
└────────────────────────────────────────────┼─────────────────┘
                                             │
                           ┌─────────────────▼──────────┐
                           │         Resend API          │
                           │    (Envío de emails)        │
                           └────────────────────────────┘
```

**Decisiones de arquitectura clave:**
- **App Router** — Aprovecha el renderizado en servidor (RSC) para mejor SEO y rendimiento
- **Single Page Application** — Todo el contenido en una sola ruta `/` con navegación por anclas
- **API Route propia** — El formulario usa un endpoint interno, sin dependencias de terceros para el envío
- **Sin base de datos** — El sitio es estático; los mensajes se envían por email vía Resend

---

## 🛠 Stack Tecnológico

### Core

| Tecnología | Versión | Propósito |
|------------|---------|-----------|
| [Next.js](https://nextjs.org) | 16.x | Framework principal — SSR, App Router, optimización |
| [React](https://react.dev) | 19.x | Librería de UI — componentes y estado |
| [TypeScript](https://www.typescriptlang.org) | 5.x | Tipado estático — seguridad y mantenibilidad |
| [Tailwind CSS](https://tailwindcss.com) | 4.x | Estilos — utility-first, responsive design |

### Fuentes

| Fuente | Uso |
|--------|-----|
| Space Grotesk | Títulos y headings |
| Inter | Cuerpo de texto |
| JetBrains Mono | Código, etiquetas, elementos monoespaciados |

### Servicios Externos

| Servicio | Plan | Propósito |
|----------|------|-----------|
| [Vercel](https://vercel.com) | Free | Deploy y hosting con CD automático desde `main` |
| [Resend](https://resend.com) | Free | Envío de emails desde el formulario de contacto |
| [GitHub](https://github.com) | Free | Control de versiones y CI/CD |

---

## 📁 Estructura del Proyecto

```
lanxa-technology/
│
├── 📂 app/                           # App Router de Next.js
│   ├── 📄 layout.tsx                 # Layout raíz — fuentes, metadata, viewport
│   ├── 📄 page.tsx                   # Página principal — ensambla todos los componentes
│   ├── 📄 globals.css                # Variables CSS, animaciones globales, design tokens
│   └── 📂 api/
│       └── 📂 contact/
│           └── 📄 route.ts           # POST /api/contact — procesa el formulario
│
├── 📂 components/                    # Componentes React organizados por sección
│   ├── 📄 Nav.tsx                    # Navegación fija + menú hamburguesa móvil
│   ├── 📄 Hero.tsx                   # Sección principal — canvas estrellas + orbital SVG
│   ├── 📄 Marquee.tsx                # Banda animada de tecnologías
│   ├── 📄 Services.tsx               # Grid de 6 servicios
│   ├── 📄 Process.tsx                # 5 fases del proceso de trabajo
│   ├── 📄 Stack.tsx                  # Stack tecnológico + terminal animada
│   ├── 📄 Work.tsx                   # Portafolio de proyectos
│   ├── 📄 B2B.tsx                    # Servicios corporativos y subcontratación
│   ├── 📄 WhyLanxa.tsx               # Diferenciadores de la empresa
│   ├── 📄 Pricing.tsx                # Planes de precio flexibles
│   ├── 📄 Contact.tsx                # Formulario + asesores + CTA
│   ├── 📄 Footer.tsx                 # Pie de página
│   └── 📄 WhatsAppFloat.tsx          # Botón flotante WhatsApp con selector de asesor
│
├── 📂 public/                        # Assets estáticos (imágenes, íconos)
├── 📄 .env.local                     # Variables de entorno locales (NO subir a Git)
├── 📄 .env.example                   # Plantilla de variables de entorno
├── 📄 next.config.ts                 # Configuración de Next.js
├── 📄 tailwind.config.ts             # Configuración de Tailwind CSS
├── 📄 tsconfig.json                  # Configuración de TypeScript
├── 📄 package.json                   # Dependencias y scripts del proyecto
└── 📄 README.md                      # Este archivo
```

---

## 🖥 Secciones del Sitio

| # | Ancla | Componente | Descripción | Estado |
|---|-------|-----------|-------------|--------|
| 1 | `#top` | `Hero.tsx` | Presentación principal con canvas de estrellas y orbital animado | ✅ |
| 2 | — | `Marquee.tsx` | Banda animada con tecnologías del stack | ✅ |
| 3 | `#servicios` | `Services.tsx` | 6 servicios: Web, Mobile, Desktop, APIs, Integraciones, IA | ✅ |
| 4 | `#proceso` | `Process.tsx` | 5 fases: Descubrimiento · Diseño · Desarrollo · Despliegue · Soporte | ✅ |
| 5 | `#stack` | `Stack.tsx` | Tabla de tecnologías + terminal de deploy animada | ✅ |
| 6 | `#trabajo` | `Work.tsx` | Portafolio: TradeSync, GanancIA, ReservaYa, LEOFIT, GymMatch | ✅ |
| 7 | `#empresas` | `B2B.tsx` | Servicios B2B: Staff Aug, Contratos, White-Label, QA, IA | ✅ |
| — | — | `WhyLanxa.tsx` | 4 diferenciadores: Sólido, Escalable, Transparente, Futurista | ✅ |
| 8 | `#precios` | `Pricing.tsx` | 3 planes flexibles según necesidad del cliente | ✅ |
| 9 | `#contacto` | `Contact.tsx` | Formulario, asesores, WhatsApp y correo | ✅ |
| — | — | `Footer.tsx` | Pie de página con branding y copyright | ✅ |
| — | — | `WhatsAppFloat.tsx` | Botón flotante con menú de asesores | ✅ |

---

## ⚙️ Instalación y Configuración

### Prerrequisitos

- **Node.js** `>= 18.x` — [Descargar](https://nodejs.org)
- **npm** `>= 9.x` (incluido con Node.js)
- **Git** — [Descargar](https://git-scm.com)

### Pasos

```bash
# 1. Clonar el repositorio
git clone https://github.com/leonardeco/Lanxa-Technology.git
cd Lanxa-Technology

# 2. Instalar dependencias
npm install

# 3. Configurar variables de entorno
cp .env.example .env.local
# Editar .env.local con tus valores reales

# 4. Iniciar servidor de desarrollo
npm run dev
```

Abrir **[http://localhost:3000](http://localhost:3000)** en el navegador.

---

## 🔐 Variables de Entorno

Crear un archivo `.env.local` en la raíz del proyecto con las siguientes variables:

```env
# ─────────────────────────────────────────────
# Resend — Envío de emails desde el formulario
# Obtener API key en: https://resend.com/api-keys
# ─────────────────────────────────────────────
RESEND_API_KEY=re_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
```

> **Importante:** El archivo `.env.local` está incluido en `.gitignore` y nunca debe subirse al repositorio. Usar `.env.example` como plantilla.

> **Sin RESEND_API_KEY:** El formulario de contacto igual funciona — el endpoint retorna `200 OK` pero no envía email. Configurar la variable en producción para activar el envío.

---

## 📜 Scripts Disponibles

| Comando | Descripción |
|---------|-------------|
| `npm run dev` | Inicia el servidor de desarrollo en `http://localhost:3000` con Turbopack |
| `npm run build` | Genera el build de producción optimizado en `.next/` |
| `npm run start` | Inicia el servidor en modo producción (requiere `build` previo) |
| `npm run lint` | Ejecuta ESLint para revisar la calidad y consistencia del código |

---

## 🚀 Guía de Deploy

### Deploy automático — Vercel (recomendado)

Cualquier push a la rama `main` dispara un deploy automático en Vercel:

```bash
# Flujo estándar de trabajo
git add .
git commit -m "feat: descripción del cambio"
git push
# ✓ Vercel despliega automáticamente en ~60 segundos
```

### Configuración del proyecto en Vercel

| Parámetro | Valor |
|-----------|-------|
| Framework Preset | `Next.js` (autodetectado) |
| Build Command | `npm run build` |
| Output Directory | `.next` |
| Install Command | `npm install` |
| Node.js Version | `18.x` |

### Variables de entorno en producción

En **Vercel Dashboard → [Proyecto] → Settings → Environment Variables**:

```
RESEND_API_KEY    →    re_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
```

Seleccionar entornos: **Production**, **Preview**, **Development**.

### Build y ejecución manual

```bash
# Build de producción
npm run build

# Iniciar en producción
npm run start
# → http://localhost:3000
```

---

## 👥 Equipo

<table>
  <thead>
    <tr>
      <th>Integrante</th>
      <th>Rol</th>
      <th>Responsabilidades</th>
      <th>Contacto</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><b>Leonardo Guzmán</b></td>
      <td>Fundador & CTO</td>
      <td>Arquitectura de software, desarrollo full-stack, decisiones técnicas, infraestructura</td>
      <td>
        <a href="mailto:leonardecojt@gmail.com">Email</a> ·
        <a href="https://wa.me/573226993891">WhatsApp</a>
      </td>
    </tr>
    <tr>
      <td><b>Julián Muñoz</b></td>
      <td>CEO & Líder de Proyectos</td>
      <td>Gestión de proyectos, relaciones comerciales, estrategia B2B, cierre de contratos</td>
      <td>
        <a href="https://wa.me/573136817238">WhatsApp</a>
      </td>
    </tr>
  </tbody>
</table>

---

## 🗺 Hoja de Ruta

### v2.0 — Actual ✅
- [x] Migración completa de HTML/CSS a Next.js 16 + TypeScript + Tailwind CSS
- [x] Diseño mobile-first totalmente responsive con menú hamburguesa
- [x] Formulario de contacto con API Route propia (Resend ready)
- [x] Botón flotante WhatsApp con selector de asesores
- [x] SEO avanzado: JSON-LD structured data, meta OG, Twitter Cards, favicon SVG
- [x] Sección de servicios corporativos B2B
- [x] Planes de precios flexibles
- [x] Deploy en Vercel con CD automático desde GitHub

### v2.1 — Contenido y conversión 📅
- [ ] Blog técnico con artículos en MDX
- [ ] Páginas de caso de estudio por proyecto del portafolio
- [ ] Integración de Google Analytics 4
- [ ] Sección de testimonios de clientes verificados
- [ ] Sitemap.xml y robots.txt optimizados

### v2.2 — Funcionalidad avanzada 📅
- [ ] Panel de administración para gestionar leads
- [ ] Integración con CRM (HubSpot o Notion)
- [ ] Dominio personalizado `lanxatechnology.com`
- [ ] Versión en inglés del sitio (i18n)
- [ ] OG image dinámica generada con `next/og`

### v3.0 — Plataforma 📅
- [ ] Área privada de clientes con seguimiento de proyectos
- [ ] Sistema de cotizaciones online
- [ ] Chat en vivo integrado

---

## ✅ Estándares de Calidad

### Código
- **TypeScript estricto** — sin `any` implícitos, tipado explícito en componentes y funciones
- **ESLint** — configuración `eslint-config-next` aplicada en cada commit
- **Componentes** — un archivo por componente, responsabilidad única, nombres descriptivos
- **Naming conventions** — PascalCase para componentes, camelCase para funciones y variables

### Performance (objetivos Lighthouse)

| Métrica | Objetivo |
|---------|----------|
| Performance | ≥ 95 |
| SEO | ≥ 98 |
| Accessibility | ≥ 90 |
| Best Practices | ≥ 95 |
| LCP (Largest Contentful Paint) | < 2.5s |
| CLS (Cumulative Layout Shift) | < 0.1 |

### Control de versiones

```
feat:    nueva funcionalidad
fix:     corrección de bugs
chore:   tareas de mantenimiento (deps, config)
docs:    cambios en documentación
style:   cambios de formato/estilos sin lógica
refactor: refactorización sin cambio de comportamiento
```

- Rama `main` = producción — todo push genera un deploy
- Revisión obligatoria antes de merge en cambios de arquitectura

---

## 📬 Contacto

<div align="center">

| Canal | Detalle |
|-------|---------|
| 🌐 Sitio web | [lanxa-technology.vercel.app](https://lanxa-technology.vercel.app) |
| 📧 Email | [leonardecojt@gmail.com](mailto:leonardecojt@gmail.com) |
| 💬 WhatsApp | [+57 322 699 3891](https://wa.me/573226993891) |
| 📍 Ubicación | Armenia, Quindío, Colombia |
| 🌎 Cobertura | LATAM + Global (100% remoto) |

</div>

---

<div align="center">

<br/>

**© 2026 Lanxa Technology · Todos los derechos reservados**

*Construido con ingeniería de verdad, no con plantillas.*

<br/>

[![GitHub](https://img.shields.io/badge/GitHub-leonardeco-181717?style=flat-square&logo=github)](https://github.com/leonardeco)

</div>
