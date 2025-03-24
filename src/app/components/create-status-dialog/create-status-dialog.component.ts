import {
  Component,
  ElementRef,
  EventEmitter,
  Output,
  ViewChild,
} from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Status } from "src/app/models/status.model";
import { StatusService } from "src/app/services/status.service";

@Component({
  selector: "mds-create-status-dialog",
  templateUrl: "./create-status-dialog.component.html",
  styleUrls: ["./create-status-dialog.component.scss"],
})
export class CreateStatusDialogComponent {
  @Output() close = new EventEmitter();
  @ViewChild("nameInput") nameInput!: ElementRef;
  statusForm!: FormGroup;
  statusColors = ["grey", "blue", "green"];

  constructor(private fb: FormBuilder, private statusService: StatusService) {}

  ngOnInit() {
    this.statusForm = this.fb.group({
      name: ["", [Validators.required, Validators.minLength(3)]],
      color: [this.statusColors[1], [Validators.required]],
    });
  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.nameInput.nativeElement.focus();
    });
  }

  onClose() {
    this.close.emit();
  }

  onCreate() {
    if (this.statusForm.valid) {
      const formValue = this.statusForm.value;
      const status: Status = {
        name: formValue.name.toLowerCase().replace(/\s+/g, "-"),
        text: formValue.name,
        color: formValue.color,
      };
      const currentStatuses = this.statusService.getStatuses();
      const updatedStatuses = [status, ...currentStatuses];
      this.statusService.updateStatuses(updatedStatuses);
      this.close.emit();
    }
  }

  isError(controlName: string) {
    const isControlTouched = this.statusForm.get(controlName)!.touched;
    const isControlInvalid = this.statusForm.get(controlName)?.invalid;

    return isControlTouched && isControlInvalid!;
  }

  onColorSelect(color: string) {
    this.statusForm.patchValue({ color });
  }
}
