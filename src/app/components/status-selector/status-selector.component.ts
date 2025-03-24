import {
  Component,
  Input,
  Output,
  EventEmitter,
  OnInit,
  OnDestroy,
} from "@angular/core";
import { Status } from "../../models/status.model";
import { STATUS_FIELD_STYLES } from "src/app/constants/status-field-styles.constant";
import { StatusService } from "src/app/services/status.service";
import { Subscription } from "rxjs";

@Component({
  selector: "mds-status-selector",
  templateUrl: "./status-selector.component.html",
  styleUrls: ["./status-selector.component.scss"],
})
export class StatusSelectorComponent implements OnInit, OnDestroy {
  @Input() currentStatus!: Status;
  @Output() statusChange = new EventEmitter<Status>();

  isOpen = false;
  statuses!: Status[];
  STATUS_FIELD_STYLES = STATUS_FIELD_STYLES;
  private sub!: Subscription;

  constructor(private statusService: StatusService) {}

  ngOnInit() {
    this.sub = this.statusService
      .getStatusesObservable()
      .subscribe((statuses) => (this.statuses = statuses));
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  get availableStatuses() {
    return this.statuses.filter(
      (status) => status.name !== this.currentStatus?.name
    );
  }

  toggleDropdown() {
    this.isOpen = !this.isOpen;
  }

  selectStatus(status: Status) {
    this.statusChange.emit(status);
    this.isOpen = false;
  }

  closeDropdown() {
    this.isOpen = false;
  }
}
