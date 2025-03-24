import { Component, OnDestroy, OnInit } from "@angular/core";
import { Subscription } from "rxjs";
import { STATUSES } from "src/app/constants/statuses.constant";
import { Status } from "src/app/models/status.model";
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
  selectedTask!: Task;
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

  openDialog(): void {
    this.showCreateDialog = true;
  }

  closeCreateDialog(): void {
    this.showCreateDialog = false;
  }

  handleCreate(task: Task): void {
    this.showCreateDialog = false;
    this.taskService.addTask(task);
  }

  handleSave(task: Task): void {
    this.showDetailsDialog = false;
    this.taskService.updateTasks(task);
  }

  handleDelete(task: Task): void {
    this.showDetailsDialog = false;
    this.taskService.deleteTask(task.id);
  }

  closeDetailsDialog(): void {
    this.showDetailsDialog = false;
  }

  openDetailsDialog(task: Task): void {
    this.selectedTask = task;
    this.showDetailsDialog = true;
  }
}
