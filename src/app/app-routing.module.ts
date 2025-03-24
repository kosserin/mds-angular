import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { BoardPageComponent } from "./pages/board-page/board-page.component";
import { EditStatusesPageComponent } from "./pages/edit-statuses-page/edit-statuses-page.component";

const routes: Routes = [
  { path: "", component: BoardPageComponent },
  { path: "edit-statuses", component: EditStatusesPageComponent },
  { path: "**", redirectTo: "" },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
