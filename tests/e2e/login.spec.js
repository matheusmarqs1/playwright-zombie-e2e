// @ts-check
import { test } from '../support';

test('deve logar como administrador', async ({ loginActions })=> {
    await loginActions.visit();
    await loginActions.submitForm('admin@zombieplus.com', 'pwd123');
    await loginActions.assertLoggedIn();
})

test('não deve logar com senha incorreta', async ({ loginActions, toast })=> {
    await loginActions.visit();
    await loginActions.submitForm('admin@zombieplus.com', 'abc123');

    const message = 'Oops!Ocorreu um erro ao tentar efetuar o login. Por favor, verifique suas credenciais e tente novamente.';

    await toast.containText(message);
})

test('não deve logar quando o email é inválido', async ({ loginActions })=> {
    await loginActions.visit();
    await loginActions.submitForm('www.matheus.com.br', 'pwd123');
    await loginActions.assertAlertText('Email incorreto');
})

test('não deve logar quando o email não é preenchido', async ({ loginActions })=> {
    await loginActions.visit();
    await loginActions.submitForm('', 'abc123');
    await loginActions.assertAlertText('Campo obrigatório');
})

test('não deve logar quando a senha não é preenchida', async ({ loginActions })=> {
    await loginActions.visit();
    await loginActions.submitForm('admin@zombieplus.com', '');
    await loginActions.assertAlertText('Campo obrigatório');
})

test('não deve logar quando nenhum campo é preenchido', async ({ loginActions })=> {
    await loginActions.visit();
    await loginActions.submitForm('', '');
    await loginActions.assertAlertText(['Campo obrigatório', 'Campo obrigatório']);
})