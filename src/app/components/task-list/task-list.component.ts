import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from "@angular/core";
import { Status } from "src/app/models/status.model";
import { Task } from "src/app/models/task.model";
import { CdkDragDrop, transferArrayItem } from "@angular/cdk/drag-drop";
import { TaskService } from "src/app/services/task.service";
import { StatusService } from "src/app/services/status.service";
import { Subscription } from "rxjs";

@Component({
  selector: "mds-task-list",
  templateUrl: "./task-list.component.html",
  styleUrls: ["./task-list.component.scss"],
})
export class TaskListComponent implements OnInit, OnDestroy {
  @Input() tasks: Task[] = [];
  @Input() status!: Status;
  @Output() open = new EventEmitter<Task>();
  statuses!: Status[];
  private sub!: Subscription;

  constructor(
    private taskService: TaskService,
    private statusService: StatusService
  ) {}

  ngOnInit() {
    this.sub = this.statusService
      .getStatusesObservable()
      .subscribe((statuses) => (this.statuses = statuses));
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  getConnectedList() {
    return this.statuses.map((status) => status.name);
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
