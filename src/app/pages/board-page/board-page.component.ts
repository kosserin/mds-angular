import { CdkDragDrop, moveItemInArray } from "@angular/cdk/drag-drop";
import { Component, OnDestroy, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { Subscription } from "rxjs";
import { Status } from "src/app/models/status.model";
import { Task } from "src/app/models/task.model";
import { StatusService } from "src/app/services/status.service";
import { TaskService } from "src/app/services/task.service";

@Component({
  selector: "mds-board-page",
  templateUrl: "./board-page.component.html",
  styleUrls: ["./board-page.component.scss"],
})
export class BoardPageComponent implements OnInit, OnDestroy {
  statuses!: Status[];
  showCreateDialog = false;
  showDetailsDialog = false;
  tasks: Task[] = [];
  private sub = new Subscription();

  constructor(
    private router: Router,
    private taskService: TaskService,
    private statusService: StatusService
  ) {}

  ngOnInit() {
    this.sub.add(
      this.statusService
        .getStatusesObservable()
        .subscribe((statuses) => (this.statuses = statuses))
    );

    this.sub.add(
      this.taskService.getTasks().subscribe((tasks) => (this.tasks = tasks))
    );

    this.taskService.loadTasksFromStorage();
    this.statusService.loadStatusesFromStorage();
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  openCreateDialog() {
    this.showCreateDialog = true;
  }

  closeCreateDialog() {
    this.showCreateDialog = false;
  }

  closeDetailsDialog() {
    this.showDetailsDialog = false;
  }

  openDetailsDialog(task: Task) {
    this.taskService.selectedTask = task;
    this.showDetailsDialog = true;
  }

  navigateToEditStatusesPage() {
    this.router.navigateByUrl("/edit-statuses");
  }

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.statuses, event.previousIndex, event.currentIndex);
    this.statusService.updateStatuses(this.statuses);
  }
}
