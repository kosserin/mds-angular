import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { BoardPageComponent } from "./pages/board-page/board-page.component";

const routes: Routes = [
  { path: "", component: BoardPageComponent },
  { path: "**", redirectTo: "" },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
