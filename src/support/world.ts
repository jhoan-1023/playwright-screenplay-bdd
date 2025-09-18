import { IWorldOptions, setWorldConstructor, World } from "@cucumber/cucumber";
import { BrowserContext, Page } from "@playwright/test";

export interface CustomWorld extends World {
  context?: BrowserContext;
  page?: Page;
}

class WorldWithPage extends World implements CustomWorld {
  context?: BrowserContext;
  page?: Page;

  constructor(options: IWorldOptions) {
    super(options);
  }
}

setWorldConstructor(WorldWithPage);
