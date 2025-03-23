import { Component, EventEmitter, Input, Output } from "@angular/core";
import { Status } from "src/app/models/status.model";
import { Task } from "src/app/models/task.model";

@Component({
  selector: "mds-task-list",
  templateUrl: "./task-list.component.html",
  styleUrls: ["./task-list.component.scss"],
})
export class TaskListComponent {
  @Input() tasks: Task[] = [];
  @Input() status!: Status;
  @Output() open = new EventEmitter<Task>();
}
