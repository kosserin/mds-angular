import { Component, EventEmitter, Input, Output } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Status } from "src/app/models/status.model";
import { Task } from "src/app/models/task.model";
import { TaskService } from "src/app/services/task.service";

@Component({
  selector: "mds-task-details-dialog",
  templateUrl: "./task-details-dialog.component.html",
  styleUrls: ["./task-details-dialog.component.scss"],
})
export class TaskDetailsDialogComponent {
  @Output() close = new EventEmitter<void>();
  task!: Task;
  taskForm!: FormGroup;

  constructor(private fb: FormBuilder, private taskService: TaskService) {}

  ngOnInit() {
    this.task = this.taskService.selectedTask!;
    this.initForm();
  }

  onClose() {
    this.close.emit();
  }

  onStatusChange(status: Status) {
    this.taskForm.patchValue({ status });
  }

  onSave() {
    if (this.taskForm.valid) {
      const formValue = this.taskForm.value;
      const task = {
        id: this.task.id,
        title: formValue.title,
        status: formValue.status,
        ...(formValue.dueDate && { dueDate: formValue.dueDate }),
        ...(formValue.description && { description: formValue.description }),
      };
      this.taskService.updateTasks(task);
      this.close.emit();
    }
  }

  onDelete(id: string) {
    this.taskService.deleteTask(id);
    this.close.emit();
  }

  isError(controlName: string) {
    const isControlTouched = this.taskForm.get(controlName)!.touched;
    const isControlInvalid = this.taskForm.get(controlName)?.invalid;

    return isControlTouched && isControlInvalid!;
  }

  private initForm() {
    this.taskForm = this.fb.group({
      title: [
        this.task.title,
        [Validators.required, Validators.minLength(3)],
      ],
      status: [this.task.status, Validators.required],
      description: [this.task.description, []],
      dueDate: [this.task.dueDate, []],
    });
  }
}
