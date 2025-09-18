import { Page, expect } from "@playwright/test";
import { FiltrosUI } from '../ui/filtros';

export class ModalError {

    static async getTexts(page: Page): Promise<{ title: string; message: string }> {
        await page.waitForSelector(FiltrosUI.errorModalContainer, { state: 'visible', timeout: 10000 });
        const title = await page.locator(FiltrosUI.errorModalTitle).innerText();
        const message = await page.locator(FiltrosUI.errorModalMessage).innerText();
        console.log(`Obteniendo textos del modal de error. Título: "${title}", Mensaje: "${message}"`);
        return { title, message };
    }
}
