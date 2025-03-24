import { Component, EventEmitter, Input, Output } from "@angular/core";
import { Status } from "src/app/models/status.model";
import { Task } from "src/app/models/task.model";
import { CdkDragDrop, transferArrayItem } from "@angular/cdk/drag-drop";
import { STATUSES } from "src/app/constants/statuses.constant";
import { TaskService } from "src/app/services/task.service";

@Component({
  selector: "mds-task-list",
  templateUrl: "./task-list.component.html",
  styleUrls: ["./task-list.component.scss"],
})
export class TaskListComponent {
  @Input() tasks: Task[] = [];
  @Input() status!: Status;
  @Output() open = new EventEmitter<Task>();

  constructor(private taskService: TaskService) {}

  getConnectedList(): string[] {
    return STATUSES.map((status) => status.name);
  }

  onDrop(event: CdkDragDrop<Task[]>) {
    if (event.previousContainer === event.container) {
      return;
    }

    transferArrayItem(
      event.previousContainer.data,
      event.container.data,
      event.previousIndex,
      event.currentIndex
    );

    const task = event.container.data[event.currentIndex];
    this.taskService.changeTaskStatus(task.id, this.status);
  }
}
