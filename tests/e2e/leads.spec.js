// @ts-check
import { test, expect } from '../support';

import { faker } from '@faker-js/faker';

test('deve cadastrar um lead na fila de espera', async ({ leadActions, toast }) => {

  const leadName = faker.person.fullName();
  const leadEmail = faker.internet.email();
  
  await leadActions.visit();
  await leadActions.openLeadModal();
  await leadActions.submitLeadForm(leadName, leadEmail);

  const message = 'Agradecemos por compartilhar seus dados conosco. Em breve, nossa equipe entrará em contato!';
  await toast.containText(message);
  

});

test('não deve cadastrar um lead quando o email já existe', async ({ leadActions, toast, request }) => {

  const leadName = faker.person.fullName();
  const leadEmail = faker.internet.email();

  const newLead = await request.post('http://localhost:3333/leads', {
    data: {
      name: leadName,
      email: leadEmail
    }
  })

  expect(newLead.ok()).toBeTruthy();

  await leadActions.visit();
  await leadActions.openLeadModal();
  await leadActions.submitLeadForm(leadName, leadEmail);

  const message = 'O endereço de e-mail fornecido já está registrado em nossa fila de espera.';
  await toast.containText(message);
  

});



test('não deve cadastrar um lead com email incorreto', async ({ leadActions }) => {
  
  await leadActions.visit();
  await leadActions.openLeadModal();
  await leadActions.submitLeadForm('Matheus T', 'matheus.com.br');
  await leadActions.assertAlertText('Email incorreto');
});

test('não deve cadastrar um lead quando o nome não é preenchido', async ({ leadActions }) => {
  
  await leadActions.visit();
  await leadActions.openLeadModal();
  await leadActions.submitLeadForm('', 'matheus@yahoo.com');
  await leadActions.assertAlertText('Campo obrigatório');
});

test('não deve cadastrar um lead quando o email não é preenchido', async ({ leadActions }) => {
  
  await leadActions.visit();
  await leadActions.openLeadModal();
  await leadActions.submitLeadForm('Matheus T', '');
  await leadActions.assertAlertText('Campo obrigatório');
});

test('não deve cadastrar um lead quando nenhum campo é preenchido', async ({ leadActions }) => {
  
  await leadActions.visit();
  await leadActions.openLeadModal();
  await leadActions.submitLeadForm('', '');
  await leadActions.assertAlertText(['Campo obrigatório', 'Campo obrigatório']);
});

