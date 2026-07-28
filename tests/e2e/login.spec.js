// @ts-check
import { test, expect } from '@playwright/test';

import {LoginPage} from '../pages/LoginPage';

import { Toast } from '../pages/Components';

/** @type {LoginPage} */
let loginPage;

/** @type {Toast} */
let toast;

test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    toast = new Toast(page);
})

test('deve logar como administrador', async ({ page })=> {
    await loginPage.visit();
    await loginPage.submitForm('admin@zombieplus.com', 'pwd123');
    await loginPage.isLoggedIn();
})

test('não deve logar com senha incorreta', async ({ page })=> {
    await loginPage.visit();
    await loginPage.submitForm('admin@zombieplus.com', 'abc123');

    const message = 'Oops!Ocorreu um erro ao tentar efetuar o login. Por favor, verifique suas credenciais e tente novamente.';

    await toast.haveText(message);
})