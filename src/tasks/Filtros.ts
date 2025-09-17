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

    static async validarModalError(page: Page, tituloEsperado: string, mensajeEsperado: string) {
        await page.waitForSelector(FiltrosUI.errorModalContainer, { state: 'visible', timeout: 10000 });
        const tituloLocator = page.locator(FiltrosUI.errorModalTitle);
        const mensajeLocator = page.locator(FiltrosUI.errorModalMessage);
        const titulo = await tituloLocator.innerText();
        const mensaje = await mensajeLocator.innerText();
        await expect(tituloLocator).toContainText(tituloEsperado);
        await expect(mensajeLocator).toContainText(mensajeEsperado);
        console.log(`Título: "${titulo}", Mensaje: "${mensaje}"`);
    }

}