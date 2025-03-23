import { Component, EventEmitter, Input, Output } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Status } from "src/app/models/status.model";
import { Task } from "src/app/models/task.model";

@Component({
  selector: "mds-task-details-dialog",
  templateUrl: "./task-details-dialog.component.html",
  styleUrls: ["./task-details-dialog.component.scss"],
})
export class TaskDetailsDialogComponent {
  @Input() task!: Task;
  @Output() close = new EventEmitter<void>();
  @Output() save = new EventEmitter<Task>();
  @Output() delete = new EventEmitter<Task>();
  taskForm!: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.taskForm = this.fb.group({
      summary: [
        this.task.title,
        [Validators.required, Validators.minLength(3)],
      ],
      status: [this.task.status, Validators.required],
      description: [this.task.description, []],
      dueDate: [this.task.dueDate, []],
    });
  }

  onClose(): void {
    this.close.emit();
  }

  onStatusChange(status: Status): void {
    this.taskForm.patchValue({ status });
  }

  onSave(): void {
    if (this.taskForm.valid) {
      const formValue = this.taskForm.value;
      const task = {
        id: this.task.id,
        title: formValue.summary,
        status: formValue.status,
        ...(formValue.dueDate && { dueDate: formValue.dueDate }),
        ...(formValue.description && { description: formValue.description }),
      };
      this.save.emit(task);
    }
  }

  isError(controlName: string): boolean {
    const isControlTouched = this.taskForm.get(controlName)!.touched;
    const isControlInvalid = this.taskForm.get(controlName)?.invalid;

    return isControlTouched && isControlInvalid!;
  }
}
