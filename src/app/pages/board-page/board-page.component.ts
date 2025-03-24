import { Component, OnDestroy, OnInit } from "@angular/core";
import { Subscription } from "rxjs";
import { STATUSES } from "src/app/constants/statuses.constant";
import { Task } from "src/app/models/task.model";
import { TaskService } from "src/app/services/task.service";

@Component({
  selector: "mds-board-page",
  templateUrl: "./board-page.component.html",
  styleUrls: ["./board-page.component.scss"],
})
export class BoardPageComponent implements OnInit, OnDestroy {
  statuses = STATUSES;
  showCreateDialog = false;
  showDetailsDialog = false;
  tasks: Task[] = [];
  private sub!: Subscription;

  constructor(private taskService: TaskService) {}

  ngOnInit(): void {
    this.taskService.loadTasksFromStorage();
    this.sub = this.taskService
      .getTasks()
      .subscribe((tasks) => (this.tasks = tasks));
  }

  ngOnDestroy(): void {
    this.sub!.unsubscribe();
  }

  openCreateDialog(): void {
    this.showCreateDialog = true;
  }

  closeCreateDialog(): void {
    this.showCreateDialog = false;
  }

  closeDetailsDialog(): void {
    this.showDetailsDialog = false;
  }

  openDetailsDialog(task: Task): void {
    this.taskService.selectedTask = task;
    this.showDetailsDialog = true;
  }
}
