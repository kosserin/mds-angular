import { Component, Input, Output, EventEmitter } from "@angular/core";
import { Status } from "../../models/status.model";
import { STATUSES } from "../../constants/statuses.constant";
import { STATUS_FIELD_STYLES } from "src/app/constants/status-field-styles.constant";

@Component({
  selector: "mds-status-selector",
  templateUrl: "./status-selector.component.html",
  styleUrls: ["./status-selector.component.scss"],
})
export class StatusSelectorComponent {
  @Input() currentStatus!: Status;
  @Output() statusChange = new EventEmitter<Status>();

  isOpen = false;
  statuses = STATUSES;
  STATUS_FIELD_STYLES = STATUS_FIELD_STYLES;

  get availableStatuses(): Status[] {
    return this.statuses.filter(
      (status) => status.name !== this.currentStatus?.name
    );
  }

  toggleDropdown(): void {
    this.isOpen = !this.isOpen;
  }

  selectStatus(status: Status): void {
    this.statusChange.emit(status);
    this.isOpen = false;
  }

  closeDropdown(): void {
    this.isOpen = false;
  }
}
