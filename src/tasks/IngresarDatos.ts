import { Page } from '@playwright/test';
import { BookingPage } from '../ui/bookingPage';

export class IngresarDatos {
    constructor(
        private partida: string,
        private regreso: string,
        private adultos: number,
        private ninos: number
    ) {}

    static con(partida: string, regreso: string, adultos: number, ninos: number) {
        return new IngresarDatos(partida, regreso, adultos, ninos);
    }

    async llenarFormulario(page: Page) {
        await page.click(BookingPage.departingInput);
        await page.waitForTimeout(500);
        const diaPartida = page.locator(BookingPage.calendarDay(this.partida)).first();
        await diaPartida.click({ force: true });
        await page.waitForTimeout(500);
        await page.locator(BookingPage.okButton).first().click();
        await page.click(BookingPage.returningInput);
        await page.waitForTimeout(500);
        const diaRegreso = page.locator(BookingPage.calendarDay(this.regreso)).first();
        await diaRegreso.click({ force: true });
        await page.waitForTimeout(500);
        await page.locator(BookingPage.okButton).first().click();
        await page.click(BookingPage.adultsInput);
        await page.waitForSelector(BookingPage.adultsOption(this.adultos), { timeout: 5000 });
        await page.click(BookingPage.adultsOption(this.adultos));
        console.log(`Adultos seleccionados: ${this.adultos}`);
        await page.click(BookingPage.childrenInput);
        await page.waitForSelector(BookingPage.childrenOption(this.ninos), { timeout: 5000 });
        await page.click(BookingPage.childrenOption(this.ninos));
        console.log(`Niños seleccionados: ${this.ninos}`);
    }

    async clickSelectDestination(page: Page) {
        await page.waitForTimeout(500);
        await page.click(BookingPage.selectDestinationBtn);
        await page.waitForTimeout(2000);
        console.log("Click en SELECT DESTINATION");
    }

    async clickLoadMore(page: Page) {
        await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
        await page.waitForTimeout(1000);
        await page.click(BookingPage.loadMoreBtn);
        console.log("Click en LOAD MORE");
    }

    async filtrarPorPrecio(page: Page, precio: number) {
        await page.evaluate(() => window.scrollTo(0, 0));
        await page.waitForTimeout(500);
        const input = page.locator(BookingPage.priceFilterInputs).last();
        await input.waitFor({ state: 'visible', timeout: 5000 });
        await input.click();
        await input.fill(precio.toString());
        await input.press('Enter');
        console.log(`Filtro aplicado con precio: ${precio}`);
    }

    async seleccionarDestino(page: Page, destino: string) {
        await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
        const bookBtn = page.locator(BookingPage.bookDestinationBtn(destino));
        await bookBtn.waitFor({ state: 'visible', timeout: 5000 });
        await bookBtn.click();
        console.log(`Destino seleccionado: ${destino}`);
    }

    async llenarFormularioCheckout(page: Page, name: string, email: string, ssn: string, phone: string) {
        await page.fill(BookingPage.checkoutNameInput, name);
        await page.fill(BookingPage.checkoutEmailInput, email);
        await page.fill(BookingPage.checkoutSsnInput, ssn);
        await page.fill(BookingPage.checkoutPhoneInput, phone);
        await page.setInputFiles(BookingPage.checkoutFileUpload, 'tests/resources/seguro.pdf');
        console.log(`Checkout completado con: ${name}, ${email}, ${ssn}, ${phone}, Archivo: seguro.pdf cargado correctamente`);
    }

    async aplicarCodigoPromo(page: Page, promo: string) {
        await page.fill(BookingPage.checkoutPromoInput, promo);
        await page.click(BookingPage.checkoutApplyBtn);
        console.log(`Código promocional aplicado: ${promo}`);
    }

    async aceptarTerminos(page: Page) {
        await page.check(BookingPage.checkoutTermsCheckbox);
        console.log("Términos y condiciones aceptados");
    }

    async pagarReserva(page: Page) {
        const payNowBtn = page.locator(BookingPage.checkoutPayNowBtn);
        await payNowBtn.waitFor({ state: 'visible', timeout: 5000 });
        await payNowBtn.click();
        console.log("Botón PAY NOW presionado, pago enviado");
    }
}
