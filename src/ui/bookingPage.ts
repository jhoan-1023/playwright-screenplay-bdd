export const BookingPage = {
  departingInput: 'input[role="input"][type="text"] >> nth=0',
  returningInput: 'input[role="input"][type="text"] >> nth=1',
  calendarDay: (day: string) =>
    `xpath=//div[contains(@class,"theme__day")]/span[normalize-space()="${day}"]`,
  okButton: 'div[class*="theme__dialog"] button:has-text("OK")',
  adultsInput: 'input[role="input"][value*="Adults"]',
  adultsOption: (value: number) =>
    `xpath=//input[contains(@value,"Adults")]/ancestor::div[contains(@class,"dropdown")]//li[normalize-space(text())="${value}"]`,
  childrenInput: 'input[role="input"][value*="Children"]',
  childrenOption: (value: number) =>
    `xpath=//input[contains(@value,"Children")]/ancestor::div[contains(@class,"dropdown")]//li[normalize-space(text())="${value}"]`,
  selectDestinationBtn: 'button:has-text("SELECT DESTINATION")',
  loadMoreBtn: 'button:has-text("LOAD MORE")',
  priceFilterInputs: 'section input[type="text"]',
  bookDestinationBtn: (destino: string) =>
    `//div[contains(@class, "GalleryItem__gallery-item")][.//h5[normalize-space()="${destino}"]]//button[normalize-space()="Book"]`,
  checkoutNameInput: `//span[text()='Name']/../input`,
  checkoutEmailInput: `//span[text()='Email Address']/../input`,
  checkoutSsnInput: `//span[text()='Social Security Number']/../input`,
  checkoutPhoneInput: `//span[text()='Phone Number']/../input`,
  checkoutFileUpload: `input[type="file"]`,
  checkoutPromoInput: 'input[name="promo"]',
  checkoutApplyBtn: '//span[text()="I have a promo code"]/ancestor::div[contains(@class,"OrderSummary")]//button',
  checkoutTermsCheckbox: '//label[contains(.,"I agree to the terms and conditions")]',
  checkoutPayNowBtn: 'button:has-text("PAY NOW")',
};