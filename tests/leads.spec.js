// @ts-check
import { test, expect } from '@playwright/test';

import {LandingPage} from './pages/LandingPage';

/** @type {LandingPage} */
let landingPage;

test.beforeEach(async ({ page })=> {
  landingPage = new LandingPage(page);
})

test('deve cadastrar um lead na fila de espera', async ({ page }) => {
  
  await landingPage.visit();
  await landingPage.openLeadModal();
  await landingPage.submitLeadForm('Matheus T', 'matheus@yahoo.com');

   const message = 'Agradecemos por compartilhar seus dados conosco. Em breve, nossa equipe entrará em contato!';
  await landingPage.toastHaveText(message);
  

});

test('não deve cadastrar um lead com email incorreto', async ({ page }) => {
  
  await landingPage.visit();
  await landingPage.openLeadModal();
  await landingPage.submitLeadForm('Matheus T', 'matheus.com.br');
  await landingPage.alertHaveText('Email incorreto');
});

test('não deve cadastrar um lead quando o nome não é preenchido', async ({ page }) => {
  
  await landingPage.visit();
  await landingPage.openLeadModal();
  await landingPage.submitLeadForm('', 'matheus@yahoo.com');
  await landingPage.alertHaveText('Campo obrigatório');
});

test('não deve cadastrar um lead quando o email não é preenchido', async ({ page }) => {
  
  await landingPage.visit();
  await landingPage.openLeadModal();
  await landingPage.submitLeadForm('Matheus T', '');
  await landingPage.alertHaveText('Campo obrigatório');
});

test('não deve cadastrar um lead quando nenhum campo é preenchido', async ({ page }) => {
  
  await landingPage.visit();
  await landingPage.openLeadModal();
  await landingPage.submitLeadForm('', '');
  await landingPage.alertHaveText(['Campo obrigatório', 'Campo obrigatório']);
});

