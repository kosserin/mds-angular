import { Component, EventEmitter, Input, Output } from "@angular/core";
import { Status } from "src/app/models/status.model";
import { Task } from "src/app/models/task.model";

@Component({
  selector: "mds-task-item",
  templateUrl: "./task-item.component.html",
  styleUrls: ["./task-item.component.scss"],
})
export class TaskItemComponent {
  @Input() task!: Task;
  @Input() status!: Status;
  @Output() open = new EventEmitter<Task>();

  getTaskClass(status: Status): string {
    switch (status.color) {
      default:
      case "grey":
        return "grey";
      case "blue":
        return "blue";
      case "green":
        return "green";
    }
  }
}
