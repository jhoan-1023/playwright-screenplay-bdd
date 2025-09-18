import { BeforeAll, AfterAll, Before, After, setDefaultTimeout } from "@cucumber/cucumber";
import { chromium, Browser, BrowserContext } from "@playwright/test";
import { CustomWorld } from "./world";

let browser: Browser;

setDefaultTimeout(60 * 1000);

BeforeAll(async function () {
  browser = await chromium.launch({
    headless: false
  });
});

AfterAll(async function () {
  await browser.close();
});

Before<CustomWorld>(async function () {
  this.context = await browser.newContext({
    viewport: null,
  });
  this.page = await this.context.newPage();
});

After<CustomWorld>(async function () {
  await this.context!.close();
});