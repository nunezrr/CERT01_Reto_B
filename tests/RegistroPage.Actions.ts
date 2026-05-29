import { expect, Locator, Page } from '@playwright/test';
import { BASE_URL, ButtonName, RegistroAsincronoLocators } from './RegistroPage.Locators';
import { capture } from './Evidence';

// ============ Acciones ============

export class RegistroAsincronoActions {
  private readonly locators: RegistroAsincronoLocators;

  constructor(private readonly page: Page) {
    this.locators = new RegistroAsincronoLocators(page);
  }

  // ============ Principal ============
  async open(): Promise<RegistroAsincronoActions> {
    await this.page.goto(BASE_URL);
    return this;
  }

  // ============ Datos de los elementos ============
  async DatosRegistro(name: string, email: string, password: string): Promise<void> {
    await this.locators.nombreInput.fill(name);
    await this.locators.emailInput.fill(email);
    await this.locators.contraseAInput.fill(password);
    await capture(this.page, 'datos-registro-de-usuario');   
  };

  // ============ Registro de datos ============
  async clickButtonRegistrar(): Promise<void> {
    const buttonMap: Record<ButtonName, Locator> = {
      'registrarButton': this.locators.registrarButton,
    };
    const button = this.locators.registrarButton;
    if(!button) throw new Error(`Button '${this.locators.registrarButton}' not found`);
    await button.click();
    await capture(this.page, 'registro-de-usuario-click-registrar');
  }

  // ============ Validaciones de los elementos ============
  
    /** Verifica que la página cargo correctamente */
    async expectPageLoaded(): Promise<void> {
      await expect(this.page).toHaveURL(/\//);
      await expect(this.locators.nombreInput).toBeVisible({ timeout: 10000 });
    }
  
    /**
     * Verifica que un elemento específico esté visible
     * @param locator - Localizador del elemento a verificar
     */
    async expectElementVisible(locator: Locator): Promise<void> {
      await expect(locator).toBeVisible();
    }
  
    /**
     * Verifica el estado inicial del registro - TÉCNICA DE POLLING
     * @param locator - Localizador del elemento a verificar
     */
    async expectEstadoInicial(): Promise<void> {
        await expect(this.locators.estadoBox).toContainText('Estado: Esperando registro...', { timeout: 15000 });
        /** 
        await expect(async () => {
        await expect(this.locators.estadoBox).toContainText('Estado: Esperando registro...');
            }).toPass({
                // Opciones de polling:
                intervals: [1000, 2000, 5000], // Intervalos entre intentos (en milisegundos)
                timeout: 15000                 // Tiempo total máximo que durará el polling (15 segundos)
            });**/
    }

      /**
     * Verifica el estado final del registro - TÉCNICA DE POLLING
     * @param locator - Localizador del elemento a verificar
     */
    async expectEstadoCreado(): Promise<void> {
      await expect(this.locators.estadoBox).toContainText('Estado: Usuario Creado Exitosamente', { timeout: 15000 });
      await capture(this.page, 'registro-de-usuario-creado-exitosamente'); 
      /** 
      await expect(async () => {
      await expect(this.locators.estadoBox).toContainText('Estado: Usuario Creado Exitosamente');
        }).toPass({
            // Opciones de polling:
            intervals: [1000, 2000, 5000], // Intervalos entre intentos (en milisegundos)
            timeout: 15000                 // Tiempo total máximo que durará el polling (15 segundos)
        });**/
    }
  
    // ============ Estados ============
  
    /**
     * Valida si el campo Nombre está visible
     */
    async isNombreInputVisible(): Promise<boolean> {
      return await this.locators.nombreInput.isVisible();
    }
  
    /**
     * Valida si el campo Email está visible
     */
    async isEmailInputVisible(): Promise<boolean> {
      return await this.locators.emailInput.isVisible();
    }
  
    /**
     * Valida si el campo Contraseña está visible
     */
    async isContraseAInputVisible(): Promise<boolean> {
      return await this.locators.contraseAInput.isVisible();                    
    }
  
    /**
     * Valida si el botón Registrar está visible
     */
    async isRegistrarButtonVisible(): Promise<boolean> {
      return await this.locators.registrarButton.isVisible();
    }
  
    /**
     * Valida si el Estado está visible
     */
    async isEstadoBoxVisible(): Promise<boolean> {
      return await this.locators.estadoBox.isVisible();
    }
}







