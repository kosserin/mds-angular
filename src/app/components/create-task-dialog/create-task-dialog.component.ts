import {
  Component,
  EventEmitter,
  OnInit,
  Output,
  ViewChild,
  ElementRef,
  AfterViewInit,
} from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { STATUSES } from "src/app/constants/statuses.constant";
import { Status } from "src/app/models/status.model";

@Component({
  selector: "app-create-task-dialog",
  templateUrl: "./create-task-dialog.component.html",
  styleUrls: ["./create-task-dialog.component.scss"],
})
export class CreateTaskDialogComponent implements OnInit, AfterViewInit {
  @Output() close = new EventEmitter<void>();
  @Output() create = new EventEmitter<any>();
  @ViewChild("summaryInput") summaryInput!: ElementRef;

  statuses = STATUSES;
  selectedStatus = STATUSES[0];
  taskForm!: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.taskForm = this.fb.group({
      summary: ["", [Validators.required, Validators.minLength(3)]],
      status: [this.selectedStatus, Validators.required],
      description: ["", []],
      dueDate: [null, []],
    });
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.summaryInput.nativeElement.focus();
    });
  }

  onClose(): void {
    this.close.emit();
  }

  onCreate(): void {
    if (this.taskForm.valid) {
      const formValue = this.taskForm.value;
      const task = {
        id: Date.now(), // Generate a temporary ID using timestamp
        title: formValue.summary,
        status: formValue.status,
        ...(formValue.dueDate && { dueDate: formValue.dueDate }),
        ...(formValue.description && { description: formValue.description }),
      };
      this.create.emit(task);
    }
  }

  onStatusChange(status: Status): void {
    this.selectedStatus = status;
    this.taskForm.patchValue({ status });
  }

  isError(controlName: string): boolean {
    const isControlTouched = this.taskForm.get(controlName)!.touched;
    const isControlInvalid = this.taskForm.get(controlName)?.invalid;

    return isControlTouched && isControlInvalid!;
  }
}
