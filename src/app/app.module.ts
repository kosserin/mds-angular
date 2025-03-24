import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { BrowserModule } from "@angular/platform-browser";
import { DragDropModule } from "@angular/cdk/drag-drop";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { BoardPageComponent } from "./pages/board-page/board-page.component";
import { CreateTaskDialogComponent } from "./components/create-task-dialog/create-task-dialog.component";
import { ClickOutsideDirective } from "./directives/click-outside.directive";
import { StatusSelectorComponent } from "./components/status-selector/status-selector.component";
import { FilterByStatusPipe } from "./pipes/filter-by-status.pipe";
import { TaskItemComponent } from "./components/task-item/task-item.component";
import { TaskListComponent } from "./components/task-list/task-list.component";
import { TaskDetailsDialogComponent } from "./components/task-details-dialog/task-details-dialog.component";
import { EditStatusesPageComponent } from "./pages/edit-statuses-page/edit-statuses-page.component";
import { CreateStatusDialogComponent } from "./components/create-status-dialog/create-status-dialog.component";

const PAGES = [BoardPageComponent, EditStatusesPageComponent];
const COMPONENTS = [
  CreateTaskDialogComponent,
  StatusSelectorComponent,
  TaskItemComponent,
  TaskListComponent,
  TaskDetailsDialogComponent,
  CreateStatusDialogComponent,
];
const DIRECTIVES = [ClickOutsideDirective];
const PIPES = [FilterByStatusPipe];

@NgModule({
  declarations: [AppComponent, PAGES, COMPONENTS, DIRECTIVES, PIPES],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    DragDropModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
