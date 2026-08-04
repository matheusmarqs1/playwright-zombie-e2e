// @ts-check
import { test, expect } from '../support';

import { faker } from '@faker-js/faker';

test('deve cadastrar um lead na fila de espera', async ({ landingPage, toast }) => {

  const leadName = faker.person.fullName();
  const leadEmail = faker.internet.email();
  
  await landingPage.visit();
  await landingPage.openLeadModal();
  await landingPage.submitLeadForm(leadName, leadEmail);

  const message = 'Agradecemos por compartilhar seus dados conosco. Em breve, nossa equipe entrará em contato!';
  await toast.containText(message);
  

});

test('não deve cadastrar um lead quando o email já existe', async ({ landingPage, toast, request }) => {

  const leadName = faker.person.fullName();
  const leadEmail = faker.internet.email();

  const newLead = await request.post('http://localhost:3333/leads', {
    data: {
      name: leadName,
      email: leadEmail
    }
  })

  expect(newLead.ok()).toBeTruthy();

  await landingPage.visit();
  await landingPage.openLeadModal();
  await landingPage.submitLeadForm(leadName, leadEmail);

  const message = 'O endereço de e-mail fornecido já está registrado em nossa fila de espera.';
  await toast.containText(message);
  

});


test('não deve cadastrar um lead com email incorreto', async ({ landingPage }) => {
  
  await landingPage.visit();
  await landingPage.openLeadModal();
  await landingPage.submitLeadForm('Matheus T', 'matheus.com.br');
  await landingPage.alertHaveText('Email incorreto');
});

test('não deve cadastrar um lead quando o nome não é preenchido', async ({ landingPage }) => {
  
  await landingPage.visit();
  await landingPage.openLeadModal();
  await landingPage.submitLeadForm('', 'matheus@yahoo.com');
  await landingPage.alertHaveText('Campo obrigatório');
});

test('não deve cadastrar um lead quando o email não é preenchido', async ({ landingPage }) => {
  
  await landingPage.visit();
  await landingPage.openLeadModal();
  await landingPage.submitLeadForm('Matheus T', '');
  await landingPage.alertHaveText('Campo obrigatório');
});

test('não deve cadastrar um lead quando nenhum campo é preenchido', async ({ landingPage }) => {
  
  await landingPage.visit();
  await landingPage.openLeadModal();
  await landingPage.submitLeadForm('', '');
  await landingPage.alertHaveText(['Campo obrigatório', 'Campo obrigatório']);
});

