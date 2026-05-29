import { Page, Locator, expect } from '@playwright/test';

/** Campos del formulario */
export type InputName = 'nombreInput' | 'emailInput' | 'contraseAInput';
export type ButtonName = 'registrarButton';
export type StatusText = 'estadoBox';

export const BASE_URL = 'http://localhost:3000/';

/**
 * Clase Page Object Model para Registro Asíncrono
 */
export class RegistroAsincronoLocators {
  readonly page: Page;

  // ============ Configuracion ============

  private readonly CONFIG = {
    PAGE_PATH: '/',
    TIMEOUTS: {
      PAGE_LOAD: 10000,
      ELEMENT_VISIBLE: 2000,
      NAVIGATION: 30000
    }
  } as const;

  constructor(page: Page) {
    this.page = page;
  }

  // ============ Private Helpers ============

  /**
   * Valida si un elemento está visible en la página
   * @private
   */
  private async isVisible(locator: Locator, timeout = this.CONFIG.TIMEOUTS.ELEMENT_VISIBLE): Promise<boolean> {
    try {
      await locator.waitFor({ state: 'visible', timeout });
      return true;
    } catch {
      return false;
    }
  }

  // ============ Elementos del Formulario ============

  /**
   * Campo: Nombre
   * @locator getByLabel('Nombre')
   * @example await page.nombreInput.fill('value');
   */
  get nombreInput(): Locator {
    //return this.page.getByLabel('Nombre');
    return this.page.getByRole('textbox', { name: 'Nombre' })
  }

  /**
   * Campo: Email
   * @locator getByLabel('Email')
   * @example await page.emailInput.fill('value');
   */
  get emailInput(): Locator {
    //return this.page.getByLabel('Email');
    return this.page.getByRole('textbox', { name: 'Email' });
  }

  /**
   * Campo: Contraseña
   * @locator getByLabel('Contraseña')
   * @example await page.contraseAInput.fill('value');
   */
  get contraseAInput(): Locator {
    //return this.page.getByLabel('Contraseña');
    return this.page.getByRole('textbox', { name: 'Contraseña' });
  }

  /**
   * Botón: Registrar
   * @locator getByRole('button', { name: /Registrar/i })
   * @example await page.registrarButton.click();
   */
  get registrarButton(): Locator {
    //return this.page.getByRole('button', { name: /Registrar/i });
    return this.page.getByRole('button', { name: 'Registrar' });
  }

  /**
   * Etiqueta: Estado
   * @locator getByTestId('status-box')
   * @example await page.estadoBox.textContent();
   */
  get estadoBox(): Locator {
    return this.page.locator('#status-box');
  }  

  // ============ Navigacion ============

  /**
   * Navigar a la página de registro
   * @param baseUrl - Optional base URL override (defaults to env variable)
   * @example await page.goto(); // Uses BASE_URL to http://localhost:3000/
   */
  async goto(baseUrl?: string): Promise<void> {
    const url = BASE_URL;
    await this.page.goto(url);
    await this.page.waitForLoadState('domcontentloaded');
  }
}
