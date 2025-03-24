import {
  Component,
  EventEmitter,
  OnInit,
  Output,
  ViewChild,
  ElementRef,
  AfterViewInit,
  OnDestroy,
} from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Subscription } from "rxjs";
import { Status } from "src/app/models/status.model";
import { Task } from "src/app/models/task.model";
import { StatusService } from "src/app/services/status.service";
import { TaskService } from "src/app/services/task.service";

@Component({
  selector: "mds-create-task-dialog",
  templateUrl: "./create-task-dialog.component.html",
  styleUrls: ["./create-task-dialog.component.scss"],
})
export class CreateTaskDialogComponent
  implements OnInit, AfterViewInit, OnDestroy
{
  @Output() close = new EventEmitter<void>();
  @ViewChild("titleInput") titleInput!: ElementRef;

  statuses!: Status[];
  selectedStatus!: Status;
  taskForm!: FormGroup;
  private sub!: Subscription;

  constructor(
    private fb: FormBuilder,
    private taskService: TaskService,
    private statusService: StatusService
  ) {}

  ngOnInit() {
    this.selectedStatus = this.statusService.getStatuses()[0];

    this.sub = this.statusService
      .getStatusesObservable()
      .subscribe((statuses) => (this.statuses = statuses));

    this.initForm();
  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.titleInput.nativeElement.focus();
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  onClose() {
    this.close.emit();
  }

  onCreate() {
    console.log(this.taskForm.value);

    if (this.taskForm.valid) {
      const formValue = this.taskForm.value;
      const task: Task = {
        id: Date.now(),
        title: formValue.title,
        status: formValue.status,
        ...(formValue.dueDate && { dueDate: formValue.dueDate }),
        ...(formValue.description && { description: formValue.description }),
      };
      this.taskService.addTask(task);
      this.close.emit();
    }
  }

  onStatusChange(status: Status) {
    this.selectedStatus = status;
    this.taskForm.patchValue({ status });
  }

  isError(controlName: string) {
    const isControlTouched = this.taskForm.get(controlName)!.touched;
    const isControlInvalid = this.taskForm.get(controlName)?.invalid;

    return isControlTouched && isControlInvalid!;
  }

  private initForm() {
    this.taskForm = this.fb.group({
      title: ["", [Validators.required, Validators.minLength(3)]],
      status: [this.selectedStatus, Validators.required],
      description: ["", []],
      dueDate: [null, []],
    });
  }
}
