import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { BrowserModule } from "@angular/platform-browser";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { TodoFormComponent } from "./components/todo-form/todo-form.component";
import { TodoItemComponent } from "./components/todo-item/todo-item.component";
import { TodoListComponent } from "./components/todo-list/todo-list.component";
import { TodoPageComponent } from "./pages/todo-page/todo-page.component";
import { BoardPageComponent } from "./pages/board-page/board-page.component";
import { CreateTaskDialogComponent } from "./components/create-task-dialog/create-task-dialog.component";
import { ClickOutsideDirective } from "./directives/click-outside.directive";
import { StatusSelectorComponent } from "./components/status-selector/status-selector.component";

const PAGES = [TodoPageComponent, BoardPageComponent];
const COMPONENTS = [CreateTaskDialogComponent, StatusSelectorComponent, TodoFormComponent, TodoItemComponent, TodoListComponent];
const DIRECTIVES = [ClickOutsideDirective];

@NgModule({
  declarations: [AppComponent, PAGES, COMPONENTS, DIRECTIVES],
  imports: [BrowserModule, FormsModule, AppRoutingModule, ReactiveFormsModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
