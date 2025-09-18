import { Page, expect } from "@playwright/test";
import { FiltrosUI } from '../ui/filtros';

export class Filtros {

    static async filtrarPorLaunch(page: Page, launch: string) {
        await page.click(FiltrosUI.launchFilter);
        await page.locator(`ul li`, { hasText: launch }).click();
    }

    static async filtrarPorPlanetColor(page: Page, planetColor: string) {
        await page.click(FiltrosUI.planetColorFilter);
        await page.locator(`ul li`, { hasText: planetColor }).click();
    }

    static async cargarArchivo(page: Page, archivo: string) {
        await page.setInputFiles(FiltrosUI.uploadFileInput, archivo);
    }

    static async validarErrorTerminos(page: Page) {
        await page.locator(FiltrosUI.errorTerminos).isVisible();
    }

    

}