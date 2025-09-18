import { Page } from '@playwright/test';
import { BookingPage } from '../ui/bookingPage';

export class ApplyFilter {
  static async byPrice(page: Page, price: number) {
    const input = page.locator(BookingPage.priceFilterInputs).last();
    await input.click();
    await input.fill(price.toString());
    await input.press('Enter');
    console.log(`Filtro aplicado con precio: ${price}`);
  }
}
