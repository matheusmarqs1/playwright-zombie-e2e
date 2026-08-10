import { test as base, expect } from '@playwright/test';

import {LoginActions} from './actions/LoginActions';
import {MovieActions} from './actions/MovieActions';
import {LeadActions} from './actions/LeadActions';

import { Toast } from './components/Toast';

/**
 * @typedef {Object} MyActions
 * @property {LoginActions} loginActions
 * @property {MovieActions} movieActions
 * @property {LeadActions} leadActions
 * @property {Toast} toast
 */

/** @type {import('@playwright/test').TestType<import('@playwright/test').PlaywrightTestArgs & import('@playwright/test').PlaywrightTestOptions & MyActions, import('@playwright/test').PlaywrightWorkerArgs & import('@playwright/test').PlaywrightWorkerOptions>} */
export const test = base.extend({
    loginActions: async ({ page }, use) => {
        const loginActions = new LoginActions(page);
        await use(loginActions);
    },
    movieActions: async ({ page }, use) => {
        const movieActions = new MovieActions(page);
        await use(movieActions);
    },
    leadActions: async ({ page }, use) => {
        const leadActions = new LeadActions(page);
        await use(leadActions);
    },
    toast: async ({ page }, use) => {
        const toast = new Toast(page);
        await use(toast);
    }
});

export { expect };
