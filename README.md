# Prueba Técnica – Automatización con Playwright + Cucumber (BDD) + Screenplay

Este repositorio contiene **dos flujos E2E** automatizados sobre la demo de reservas (“Space Advisor”), escritos en **Gherkin (español)**, ejecutados con **Cucumber** y **Playwright**, y organizados con el **patrón Screenplay**.

> Objetivo de la sustentación: mostrar que el diseño es **claro, modular y escalable**, con datos **parametrizados** (Scenario Outline), **reportería HTML** y buenas prácticas de automatización.

---

## 1) Stack y versiones
- **Node.js** ≥ 18  
- **Playwright** ^1.55  
- **Cucumber** (`@cucumber/cucumber`) ^12  
- **TypeScript** ^5  
- **ts-node** ^10  
- **multiple-cucumber-html-reporter** ^3 (Living documentation)

> Si es primera vez: `npm install`  
> (Opcional) Instalar navegadores: `npx playwright install`

---

## 2) Estructura del proyecto

```
.
├─ features/
│  ├─ agendar_viaje.feature                 # Flujo base: búsqueda, selección y checkout
│  └─ agendar_viaje_filtros.feature         # Flujo con filtros Launch/Planet Color + validación de términos
├─ src/
│  ├─ steps/
│  │  ├─ open_browser.steps.ts              # Steps del flujo base
│  │  └─ filtros.steps.ts                   # Steps del flujo de filtros
│  ├─ tasks/
│  │  ├─ IngresarDatos.ts                   # Tasks reutilizables (llenado de formularios, clicks, etc.)
│  │  └─ Filtros.ts                         # Tasks específicas de filtros y validación de modal
│  ├─ interactions/
│  │  └─ ApplyFilter.ts                     # Única Interaction (requisito del reto)
│  ├─ ui/
│  │  ├─ bookingPage.ts                     # Localizadores del checkout (incluye input file)
│  │  └─ filtros.ts                         # Localizadores de Launch / Planet Color y modal
│  └─ support/
│     ├─ world.ts                           # CustomWorld (Page de Playwright, fixtures)
│     └─ hooks.ts                           # Before/After para abrir/cerrar navegador, etc.
├─ tests/resources/seguro.pdf               # Archivo de prueba para upload
├─ reports/                                 
│  ├─ json/cucumber_report.json             # Salida de Cucumber
│  └─ html/index.html                       # Reporte HTML (Living documentation)
├─ package.json                              # Scripts de ejecución
└─ README.md
```

---

## 3) Diseño Screenplay
- **Steps**: qué hace el usuario (legible por negocio).  
- **Tasks**: cómo lo hace (acciones de negocio de mayor nivel).  
- **Interactions**: acciones atómicas reutilizables (solo una era obligatoria en el reto y se implementó).  
- **UI (Page Objects)**: localizadores centralizados por área (checkout y filtros).  

Beneficio: **mantenible** (si cambia un selector, cambio 1 archivo), **reutilizable** (Tasks en varios escenarios) y **escalable** (agregar features nuevos es barato).

---

## 4) Cómo correr las pruebas

### 4.1 Instalar dependencias
```bash
npm install
```

### 4.2 Scripts útiles (package.json)
```json
{
  "scripts": {
    "test": "cucumber-js features/**/*.feature --require-module ts-node/register --require src/steps/**/*.ts --format json:reports/json/cucumber_report.json",
    "test:checkout": "cucumber-js features/agendar_viaje.feature --require-module ts-node/register --require src/steps/**/*.ts --format json:reports/json/cucumber_report.json",
    "test:filtros": "cucumber-js features/agendar_viaje_filtros.feature --require-module ts-node/register --require src/steps/**/*.ts --format json:reports/json/cucumber_report.json",
    "report": "node reportes.js",
    "open-report": "start reports/html/index.html"
  }
}
```

### 4.3 Ejecutar
- **Todo el proyecto**: `npm test`  
- **Solo flujo base**: `npm run test:checkout`  
- **Solo flujo con filtros**: `npm run test:filtros`  

> Al finalizar, genera `reports/json/cucumber_report.json`.  
> Luego: `npm run report` → crea `reports/html/index.html`.  
> Abrir en Windows: `npm run open-report` (o doble clic en `index.html`).  

## 5) Autor
**Jhoan Márquez** – QA Automation
