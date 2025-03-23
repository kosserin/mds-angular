import { Component } from "@angular/core";
import { STATUSES } from "src/app/constants/statuses.constant";
import { Task } from "src/app/models/task.model";

@Component({
  selector: "app-board-page",
  templateUrl: "./board-page.component.html",
  styleUrls: ["./board-page.component.scss"],
})
export class BoardPageComponent {
  statuses = STATUSES;
  showDialog = false;


  openDialog(): void {
    this.showDialog = true;
  }

  closeDialog(): void {
    this.showDialog = false;
  }

  handleCreate(task: Task): void {
    this.showDialog = false;
  }
}
