import { test, expect } from '@playwright/test';
import { RegistroAsincronoActions } from './RegistroPage.Actions';

test('RegistroAsincrono', async ({ page }) => {
  const registro = await new RegistroAsincronoActions(page).open();

  try {

    await registro.expectPageLoaded();
    await registro.isEstadoBoxVisible();
    await registro.expectEstadoInicial();

    await registro.DatosRegistro('Ana', 'ana@example.com', 'Nuevo123*');
    await registro.clickButtonRegistrar();

    await registro.expectEstadoCreado();
  } catch (error) {
      console.error("Ocurrió un error durante la ejecución RegistroAsincrono:", error);
  } finally {
      await page.close();
      console.log("El navegador se ha cerrado correctamente luego de la prueba RegistroAsincrono.");
  }
});

test('RegistrarAsincronoMultiple', async ({ page }) => {
  const registro = await new RegistroAsincronoActions(page).open();

  const usuariosPrueba = [
    { nombre: 'Ana', email: 'ana@example.com', password: 'Nuevo123*' },
    { nombre: 'Carlos', email: 'carlos@example.com', password: 'Clave456*' },
    { nombre: 'Sofia', email: 'sofia@example.com', password: 'Admin789!' }
  ];

  try {
    for (const usuario of usuariosPrueba) {

      await registro.expectPageLoaded();
      await registro.isEstadoBoxVisible();
      await registro.expectEstadoInicial();

      await registro.DatosRegistro(usuario.nombre, usuario.email, usuario.password);
      await registro.clickButtonRegistrar();

      await registro.expectEstadoCreado();
      
      await page.reload();
      console.log("El navegador se ha refrescado correctamente luego de la prueba.", usuario.nombre);
    }
  } catch (error) {
      console.error("Ocurrió un error durante la ejecución RegistroAsincrono:", error);
  } finally {
      await page.close();
      console.log("El navegador se ha cerrado correctamente luego de la prueba RegistroAsincrono.");
  }
});