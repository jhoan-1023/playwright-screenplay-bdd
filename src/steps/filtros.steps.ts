import { When, Then } from "@cucumber/cucumber";
import { CustomWorld } from "../support/world";
import { Filtros } from "../tasks/Filtros";
import { expect } from "@playwright/test";

When<CustomWorld>('el usuario filtra los destinos por Launch {string}', async function (launch: string) {
  await Filtros.filtrarPorLaunch(this.page!, launch);
});

When<CustomWorld>('el usuario filtra los destinos por Planet Color {string}', async function (planetColor: string) {
  await Filtros.filtrarPorPlanetColor(this.page!, planetColor);
});

When<CustomWorld>('el usuario carga el archivo {string}', async function (archivo: string) {
  await Filtros.cargarArchivo(this.page!, archivo);
});

When<CustomWorld>('NO acepta los términos y condiciones', async function () {
  console.log("Términos NO aceptados");
});

Then<CustomWorld>('se debe mostrar el modal con título {string} y mensaje {string}',async function (titulo: string, mensaje: string) {
    await Filtros.validarModalError(this.page!, titulo, mensaje);
});
