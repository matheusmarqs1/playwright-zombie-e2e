// @ts-check
import { test } from '../support';

import movies from '../support/fixtures/movies.json';
import { executeQuery } from '../support/database';

test('deve poder cadastrar um novo filme', async ({ loginActions, movieActions, toast }) => {

    const movie = movies.create;

    await executeQuery('DELETE FROM movies WHERE title = $1', [movie.title]);

    await loginActions.login('admin@zombieplus.com', 'pwd123', 'Admin');

    await movieActions.createMovie(movie.title, movie.overview, movie.company, movie.release_year);

    await toast.containText('Cadastro realizado com sucesso!');
})

test('não deve cadastrar quando os campos obrigatórios não forem preenchidos', async ({ loginActions, movieActions }) => {
    
    await loginActions.login('admin@zombieplus.com', 'pwd123', 'Admin');

    await movieActions.openCreateForm();
    await movieActions.submitMovieForm();

    await movieActions.assertAlertText([
        'Por favor, informe o título.',
        'Por favor, informe a sinopse.',
        'Por favor, informe a empresa distribuidora.',
        'Por favor, informe o ano de lançamento.'
    ])
})