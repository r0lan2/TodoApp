import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions, RequestMethod, Headers } from '@angular/http';
import { Observable } from 'rxjs/Rx';
 import { Todo } from './Todo';
import { ApiEndpointService } from './api-endpoint.service';
import 'rxjs/add/operator/map'

@Injectable()
export class TodoService {
    headers: Headers;
    baseUrl: string;

    constructor(public http: Http, apiEndpointService: ApiEndpointService) {
        this.headers = new Headers();
        this.headers.append('Accept', 'application/json');      
        this.baseUrl = apiEndpointService.getEndpoint('todo');
    }

    createGetOptions(searchParams: string[], urlMethod: string): RequestOptions {
        let options = new RequestOptions({
            method: RequestMethod.Get,
            headers: this.headers,
            url: urlMethod,
            search: searchParams === undefined?'': searchParams.join('&')
        });
        return options;
    }

    createPostOptions(urlMethod: string): RequestOptions {
        let options = new RequestOptions({
            method: RequestMethod.Post,
            headers: this.headers,
            url: urlMethod
        });
        return options;
    }


    getUrlMethod(method: string): string {
        return this.baseUrl + '/' + method;
    }


    getAllTodos(): Observable<Todo[]> {        
         let options = this.createGetOptions(undefined, this.getUrlMethod('GetAll'));
        return this.http.get(this.getUrlMethod('GetAll'), options).map((res: Response) => <Todo[]>res.json());
    }

    getTodoById(id: number): Observable<Todo> {
        let options = this.createGetOptions(['id=' + id.toString()], this.getUrlMethod('GetTodo'));
        return this.http.get('GetTodo', options).map((res: Response) => <Todo>res.json());
    }

    saveTodo(item: Todo) {       
        let options = this.createPostOptions(this.getUrlMethod('CreateTodo'));  
        return this.http.post(options.url, item );
    }

    updateTodo(item: Todo) {       
        let options = this.createPostOptions(this.getUrlMethod('UpdateTodo'));  
        return this.http.post(options.url, item );
    }

     deleteTodoById(item: Todo) {

        let options = this.createPostOptions(this.getUrlMethod('DeleteTodo'));        
        return this.http.post(options.url, item );
    }



}
