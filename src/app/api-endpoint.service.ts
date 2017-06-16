import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';

@Injectable()
export class ApiEndpointService {
    private standaloneBaseEndpoint: string = environment.apiUrl;    
    private apiPrefix: string = '';

    constructor() {
    }

    public getBaseEndpoint(): string {       
        return this.standaloneBaseEndpoint;
    }

    public getEndpoint(serviceName: string): string {
        let base = this.getBaseEndpoint();
        return base + this.apiPrefix + serviceName;
    }
}
