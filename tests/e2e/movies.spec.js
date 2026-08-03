import { test, expect } from '@playwright/test';

import movies from '../support/fixtures/movies.json';

import {LoginPage} from '../pages/LoginPage';
import {MoviesPage} from '../pages/MoviesPage';

import { Toast } from '../components/Toast';

/** @type {LoginPage} */
let loginPage;

/** @type {MoviesPage} */
let moviesPage;

/** @type {Toast} */
let toast;

test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    moviesPage = new MoviesPage(page);
    toast = new Toast(page);
})


test('deve poder cadastrar um novo filme', async ({ page }) => {

    const movie = movies.create;

    await loginPage.visit();
    await loginPage.submitForm('admin@zombieplus.com', 'pwd123');
    await moviesPage.isLoggedIn();

    await moviesPage.create(movie.title, movie.overview, movie.company, movie.release_year);

    await toast.containText('Cadastro realizado com sucesso!');
})