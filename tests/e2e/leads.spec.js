// @ts-check
import { test, expect } from '@playwright/test';

import { faker } from '@faker-js/faker';

import {LandingPage} from '../pages/LandingPage';

import { Toast } from '../components/Toast';

/** @type {LandingPage} */
let landingPage;

/** @type {Toast} */
let toast;

test.beforeEach(async ({ page })=> {
  landingPage = new LandingPage(page);
  toast = new Toast(page);
})

test('deve cadastrar um lead na fila de espera', async ({ page }) => {

  const leadName = faker.person.fullName();
  const leadEmail = faker.internet.email();
  
  await landingPage.visit();
  await landingPage.openLeadModal();
  await landingPage.submitLeadForm(leadName, leadEmail);

  const message = 'Agradecemos por compartilhar seus dados conosco. Em breve, nossa equipe entrará em contato!';
  await toast.haveText(message);
  

});

test('não deve cadastrar um lead quando o email já existe', async ({ page }) => {

  const leadName = faker.person.fullName();
  const leadEmail = faker.internet.email();
  
  await landingPage.visit();
  await landingPage.openLeadModal();
  await landingPage.submitLeadForm(leadName, leadEmail);

  await landingPage.visit();
  await landingPage.openLeadModal();
  await landingPage.submitLeadForm(leadName, leadEmail);

  const message = 'O endereço de e-mail fornecido já está registrado em nossa fila de espera.';
  await toast.haveText(message);
  

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

