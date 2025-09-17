import { IWorldOptions, setWorldConstructor, World } from "@cucumber/cucumber";
import { Page } from "@playwright/test";

export interface CustomWorld extends World {
  page?: Page;
}

class WorldWithPage extends World implements CustomWorld {
  page?: Page;

  constructor(options: IWorldOptions) {
    super(options);
  }
}

setWorldConstructor(WorldWithPage);
