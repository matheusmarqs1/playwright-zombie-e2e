import { expect } from '@playwright/test';

export class ApiClient {

    constructor(request){
        this.request = request;
        this.token = undefined;
    }

    async getToken(){

        if(this.token){
            return this.token;
        }
        
        const response = await this.request.post('http://localhost:3333/sessions', {
            data: {
                email: 'admin@zombieplus.com',
                password: 'pwd123'
            }
        });
        
        expect(response.ok()).toBeTruthy();

        const body = await response.json();
        expect(body.token).toBeTruthy();

        this.token = body.token;
        return this.token;
    }

    async createMovie(movie){
        if(!this.token){
            await this.getToken();
        }
        const response = await this.request.post('http://localhost:3333/movies', {
            headers:{
                Authorization: `Bearer ${this.token}`,
                Accept: 'application/json, text/plain, */*'
            },
            multipart: {
                title: movie.title,
                overview: movie.overview,
                company_id: '8fffff53-7c96-413b-9e20-9f24cc0621c0',
                release_year: movie.release_year,
                featured: movie.featured
            }
        });

        expect(response.ok()).toBeTruthy();
    }



}