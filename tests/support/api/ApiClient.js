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



}