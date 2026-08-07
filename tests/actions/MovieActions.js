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

    async createMovie(title, overview, company, release_year){
        await this.openCreateForm();

        await this.page.getByLabel('Titulo do filme').fill(title);
        await this.page.getByLabel('Sinopse').fill(overview);

        await this.page.locator('#select_company_id .react-select__indicator').click();
        await this.page.locator('.react-select__option').filter({hasText: company}).click();

        await this.page.locator('#select_year .react-select__indicator').click();
        await this.page.locator('.react-select__option').filter({hasText: release_year}).click();

        await this.submitMovieForm();
    }

    async assertAlertText(target){
        await expect(this.page.locator('.alert')).toHaveText(target);
    }
}