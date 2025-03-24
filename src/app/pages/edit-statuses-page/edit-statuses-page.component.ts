import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { CdkDragDrop, moveItemInArray } from "@angular/cdk/drag-drop";
import { Status } from "src/app/models/status.model";
import { StatusService } from "src/app/services/status.service";

@Component({
  selector: "mds-edit-statuses-page",
  templateUrl: "./edit-statuses-page.component.html",
  styleUrls: ["./edit-statuses-page.component.scss"],
})
export class EditStatusesPageComponent implements OnInit {
  statuses!: Status[];
  showCreateStatusDialog = false;

  constructor(private router: Router, private statusService: StatusService) {}

  ngOnInit() {
    this.statusService
      .getStatusesObservable()
      .subscribe((statuses) => (this.statuses = statuses));
  }

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.statuses, event.previousIndex, event.currentIndex);
    this.statusService.updateStatuses(this.statuses);
  }

  deleteStatus(status: Status) {
    const updatedStatuses = this.statuses.filter((s) => s.name !== status.name);
    this.statusService.updateStatuses(updatedStatuses);
  }

  navigateBack() {
    this.router.navigateByUrl("/");
  }

  getTaskClass(status: Status) {
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

  closeCreateStatusDialog() {
    this.showCreateStatusDialog = false;
  }

  openCreateStatusDialog() {
    this.showCreateStatusDialog = true;
  }
}
