import { test as base, expect } from '@playwright/test';

import {LoginPage} from '../pages/LoginPage';
import {MoviesPage} from '../pages/MoviesPage';
import {LandingPage} from '../pages/LandingPage';

import { Toast } from '../components/Toast';

/**
 * @typedef {Object} MyPages
 * @property {LoginPage} loginPage
 * @property {MoviesPage} moviesPage
 * @property {LandingPage} landingPage
 * @property {Toast} toast
 */

/** @type {import('@playwright/test').TestType<import('@playwright/test').PlaywrightTestArgs & import('@playwright/test').PlaywrightTestOptions & MyPages, import('@playwright/test').PlaywrightWorkerArgs & import('@playwright/test').PlaywrightWorkerOptions>} */
export const test = base.extend({
    loginPage: async ({ page }, use) => {
        const loginPage = new LoginPage(page);
        await use(loginPage);
    },
    moviesPage: async ({ page }, use) => {
        const moviesPage = new MoviesPage(page);
        await use(moviesPage);
    },
    landingPage: async ({ page }, use) => {
        const landingPage = new LandingPage(page);
        await use(landingPage);
    },
    toast: async ({ page }, use) => {
        const toast = new Toast(page);
        await use(toast);
    }
});

export { expect };
