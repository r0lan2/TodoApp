import {Component, OnInit} from '@angular/core';
import {Todo} from './todo';

import {TodoService} from './todo.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [TodoService]
})
export class AppComponent implements OnInit {

  todos:  Array<Todo> = [];
  newTodo: Todo = new Todo();
  
  constructor(private todoDataService: TodoService) {
  }

  ngOnInit() {
     this.loadTodos();
  }

  loadTodos(){
     let listOfTodosObservable =  this.todoDataService.getAllTodos();
     listOfTodosObservable.subscribe((data) => {
            this.todos = data;           
        }, error => {
           console.error(error);
        });
  }

  addTodo(todo:Todo) {
       
    this.todoDataService.saveTodo(this.newTodo).subscribe(data => {      
        this.loadTodos();
        this.newTodo = new Todo();      
    }, error => {
       console.error(error);
        });
  }

  toggleTodoComplete(todo: Todo) {    
    todo.complete = !todo.complete;
      this.todoDataService.updateTodo(todo).subscribe(data => {      
        this.loadTodos();
        this.newTodo = new Todo();      
    }, error => {
       console.error(error);
        });  
  }

  removeTodo(todo) {   
      this.todoDataService.deleteTodoById(todo).subscribe(data => {      
        this.loadTodos();
    }, error => {
       console.error(error);
        });
  }

}