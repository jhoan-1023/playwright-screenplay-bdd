import { Page, expect } from "@playwright/test";
import { FiltrosUI } from '../ui/filtros';

export class ModalError {

    /**
     * Esta es una Question que devuelve los textos del modal de error.
     * @param page La página actual de Playwright.
     * @returns Un objeto con el título y el mensaje del modal.
     */
    static async getTexts(page: Page): Promise<{ title: string; message: string }> {
        await page.waitForSelector(FiltrosUI.errorModalContainer, { state: 'visible', timeout: 10000 });
        const title = await page.locator(FiltrosUI.errorModalTitle).innerText();
        const message = await page.locator(FiltrosUI.errorModalMessage).innerText();
        console.log(`Question: Obteniendo textos del modal de error. Título: "${title}", Mensaje: "${message}"`);
        return { title, message };
    }
}
