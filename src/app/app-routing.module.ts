import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { TodoPageComponent } from "./pages/todo-page/todo-page.component";


const routes: Routes = [
  { path: "", component: NonExistingComponent },
  { path: "todos", component: TodoPageComponent },
  { path: "**", redirectTo: "" },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
