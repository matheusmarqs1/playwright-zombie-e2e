// @ts-check
import { test } from '../support';

test('deve logar como administrador', async ({ loginPage, moviesPage })=> {
    await loginPage.visit();
    await loginPage.submitForm('admin@zombieplus.com', 'pwd123');
    await moviesPage.isLoggedIn();
})

test('não deve logar com senha incorreta', async ({ loginPage, toast })=> {
    await loginPage.visit();
    await loginPage.submitForm('admin@zombieplus.com', 'abc123');

    const message = 'Oops!Ocorreu um erro ao tentar efetuar o login. Por favor, verifique suas credenciais e tente novamente.';

    await toast.containText(message);
})

test('não deve logar quando o email é inválido', async ({ loginPage })=> {
    await loginPage.visit();
    await loginPage.submitForm('www.matheus.com.br', 'pwd123');
    await loginPage.alertHaveText('Email incorreto');
})

test('não deve logar quando o email não é preenchido', async ({ loginPage })=> {
    await loginPage.visit();
    await loginPage.submitForm('', 'abc123');
    await loginPage.alertHaveText('Campo obrigatório');
})

test('não deve logar quando a senha não é preenchida', async ({ loginPage })=> {
    await loginPage.visit();
    await loginPage.submitForm('admin@zombieplus.com', '');
    await loginPage.alertHaveText('Campo obrigatório');
})

test('não deve logar quando nenhum campo é preenchido', async ({ loginPage })=> {
    await loginPage.visit();
    await loginPage.submitForm('', '');
    await loginPage.alertHaveText(['Campo obrigatório', 'Campo obrigatório']);
})