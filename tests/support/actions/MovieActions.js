import { expect } from '@playwright/test';

export class MovieActions {
    
    constructor(page){
        this.page = page;
    }

    async openCreateForm(){
        await this.page.locator('a[href$="register"]').click();
    }

    async submitMovieForm(){
        await this.page.getByRole('button', {name: 'Cadastrar'}).click();
    }

    async createMovie(movie){
        await this.openCreateForm();

        await this.page.getByLabel('Titulo do filme').fill(movie.title);
        await this.page.getByLabel('Sinopse').fill(movie.overview);

        await this.page.locator('#select_company_id .react-select__dropdown-indicator').click();
        await this.page.locator('.react-select__option').filter({hasText: movie.company}).click();

        await this.page.locator('#select_year .react-select__dropdown-indicator').click();
        await this.page.locator('.react-select__option').filter({hasText: movie.release_year}).click();

        await this.page.locator('input[name="cover"]').setInputFiles('tests/support/fixtures' + movie.cover);

        if (movie.featured)
            await this.page.locator('.featured .react-switch').click();

        await this.submitMovieForm();
    }

    async assertAlertText(target){
        await expect(this.page.locator('.alert')).toHaveText(target);
    }
}