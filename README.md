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

## 3) Diseño (Screenplay en una frase)
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

---

## 5) Qué cubre cada feature

### a) `agendar_viaje.feature`
- Búsqueda de destinos, **LOAD MORE**, selección de destino.  
- Checkout: nombre, email, **SSN**, teléfono.  
- Aplicación de **código PROMO**.  
- **Scenario Outline** con **Ejemplos**: varios juegos de datos.  

### b) `agendar_viaje_filtros.feature`
- Filtros por **Launch** y **Planet Color** (valores reales del dropdown).  
- **Carga de archivo** (`tests/resources/seguro.pdf`) en el checkout.  
- Intento de pago **sin aceptar términos**, y validación del **modal**:  
  - Título esperado: `Terms and Conditions`  
  - Mensaje esperado: `You must agree to the terms and conditions to complete your purchase.`  
- Paso Then parametrizado: `"<tituloError>"` y `"<mensajeError>"` en `Ejemplos`.  
- Log de verificación en consola:  
  - `Título: "...", Mensaje: "..."`  

---

## 6) Cómo está implementado (alto nivel)
- **Steps** llaman a **Tasks**; los Steps no conocen selectores.  
- **Tasks** reutilizan **UI** y, cuando aplica, **Interactions**.  
- **Upload de archivo**: `setInputFiles(bookingPage.checkoutFileUpload, 'tests/resources/seguro.pdf')`.  
- **Modal de términos**: espera contenedor y valida por texto (selectores robustos con `:has-text()`).  
- **Logs en consola** para evidenciar el título y mensaje capturados.  

---

## 7) Extender o mantener
- **Agregar un nuevo filtro**: crear localizador en `ui/filtros.ts`, añadir método en `tasks/Filtros.ts`, referenciarlo desde el Step.  
- **Nuevos datos**: añadir filas en `Ejemplos` del `.feature` (no se duplican Steps).  
- **Cambió un selector**: actualizar en `ui/*` correspondiente (no tocar Steps).  

---

## 8) Solución de problemas comunes
- **No encuentra el archivo a subir** (`ENOENT`): confirmar ruta **relativa al proyecto**. Recomendado: `tests/resources/seguro.pdf` o usar `path.resolve`.  
- **Timeout esperando modal**: usamos `waitForSelector` del contenedor y validación por `:has-text()`; si la app está lenta, subir timeout a 15s.  
- **No reconoce Steps**: asegúrate de que el script usa `--require src/steps/**/*.ts` y los Steps estén bajo `src/steps/`.  
- **Reportes no abren**: ejecutar `npm run report` y luego `npm run open-report` (Windows).  

---

## 9) Guion de sustentación (corto)
1. **Contexto**: Stack (Playwright + Cucumber + TS) y objetivo del reto.  
2. **Arquitectura**: Screenplay (Steps → Tasks → UI / Interaction). Por qué es mantenible.  
3. **Cobertura**: Dos features; parametrización con Scenario Outline y ejemplos reales.  
4. **Ejecución**: `npm run test:filtros`, luego muestro `index.html` del reporte.  
5. **Valor añadido**: Carga de archivo robusta, validación de modal por texto, logs para trazabilidad.  
6. **Escalabilidad**: Cómo agregaría un nuevo caso sin romper lo existente.  

---

## 10) Autor
**Jhoan Márquez** – QA Automation
