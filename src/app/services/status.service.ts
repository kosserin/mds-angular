import { Injectable } from "@angular/core";
import { Status } from "../models/status.model";
import { BehaviorSubject, Observable } from "rxjs";
import { STATUSES } from "../constants/statuses.constant";

@Injectable({
  providedIn: "root",
})
export class StatusService {
  private statuses: Status[] = [];
  private statusesSubject = new BehaviorSubject<Status[]>([]);

  constructor() {
    this.loadStatusesFromStorage();
  }

  getStatuses(): Status[] {
    return [...this.statuses];
  }

  getStatusesObservable(): Observable<Status[]> {
    return this.statusesSubject.asObservable();
  }

  updateStatuses(statuses: Status[]) {
    this.statuses = [...statuses];
    this.saveStatusesToStorage();
    this.statusesSubject.next(this.statuses);
  }

  deleteStatus(status: Status) {
    const currentStatuses = this.statuses;
    const updatedStatuses = currentStatuses.filter(
      (s) => s.name !== status.name
    );
    this.statuses = [...updatedStatuses];
    this.saveStatusesToStorage();
    this.statusesSubject.next(this.statuses);
  }

  loadStatusesFromStorage() {
    const stored = localStorage.getItem("statuses");

    // if there are no statuses in local storage, use the default statuses
    this.statuses = stored ? JSON.parse(stored) : STATUSES;
    this.statusesSubject.next(this.statuses);
  }

  private saveStatusesToStorage() {
    localStorage.setItem("statuses", JSON.stringify(this.statuses));
  }
}
