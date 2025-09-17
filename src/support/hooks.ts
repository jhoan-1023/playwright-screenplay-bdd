import { Before, After, setDefaultTimeout } from "@cucumber/cucumber";
import { chromium, Browser } from "@playwright/test";
import { CustomWorld } from "./world";

let browser: Browser;

setDefaultTimeout(60 * 1000);

Before<CustomWorld>(async function () {
  browser = await chromium.launch({
    headless: false,
    slowMo: 500
  });

  const context = await browser.newContext({
    viewport: null
  });

  this.page = await context.newPage();

  console.log("Navegador iniciado (usando tamaño de ventana del sistema)");
});

After<CustomWorld>(async function () {
  if (this.page) {
    await this.page.close();
  }
  if (browser) {
    await browser.close();
    console.log("Navegador cerrado");
  }
});
