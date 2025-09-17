import { Given, When, Then } from "@cucumber/cucumber";
import { IngresarDatos } from "../tasks/IngresarDatos";
import { CustomWorld } from "../support/world";
import { ApplyFilter } from '../interactions/ApplyFilter';
import { expect } from "@playwright/test";

Given<CustomWorld>('que el usuario abre la página de reservas', async function () {await this.page!.goto('https://demo.testim.io/');
  console.log("✅ Página de reservas abierta");
});

When<CustomWorld>('ingresa las fechas de partida {string} y regreso {string} para {int} adultos y {int} niños',
  async function (partida: string, regreso: string, adultos: number, ninos: number) {
    await IngresarDatos.con(partida, regreso, adultos, ninos).llenarFormulario(this.page!);
});

When<CustomWorld>('el usuario hace click en SELECT DESTINATION', async function () {
  await IngresarDatos.con("", "", 0, 0).clickSelectDestination(this.page!);
});

When<CustomWorld>('el usuario hace click en LOAD MORE', async function () {
  await IngresarDatos.con("", "", 0, 0).clickLoadMore(this.page!);
});

When<CustomWorld>('el usuario filtra los destinos por precio "{int}"',async function (precio: number) {
    await ApplyFilter.byPrice(this.page!, precio);
});

When<CustomWorld>('el usuario selecciona el destino {string}', async function (destino: string) {
  await IngresarDatos.con("", "", 0, 0).seleccionarDestino(this.page!, destino);
});

When<CustomWorld>('llena los datos del checkout con nombre {string}, email {string}, ssn {string}, y teléfono {string}',
  async function (name: string, email: string, ssn: string, phone: string) {
    await IngresarDatos.con("", "", 0, 0).llenarFormularioCheckout(this.page!,name,email,ssn,phone);
});

When<CustomWorld>('el usuario aplica el código promocional {string}',async function (promo: string) {
    await IngresarDatos.con("", "", 0, 0).aplicarCodigoPromo(this.page!, promo);
});

When<CustomWorld>('el usuario acepta los términos y condiciones', async function () {
  await IngresarDatos.con("", "", 0, 0).aceptarTerminos(this.page!);
});

When<CustomWorld>('el usuario presiona el botón PAY NOW', async function () {
  await IngresarDatos.con("", "", 0, 0).pagarReserva(this.page!);
});

Then<CustomWorld>('se debe mostrar la lista de destinos disponibles', async function () {
  console.log("✅ Click en SELECT DESTINATION ejecutado. Validación pendiente...");
});