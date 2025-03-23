import { Pipe, PipeTransform } from "@angular/core";
import { Task } from "../models/task.model";
import { Status } from "../models/status.model";

@Pipe({
  name: "filterByStatus",
})
export class FilterByStatusPipe implements PipeTransform {
  transform(tasks: Task[], status: Status): Task[] {
    if (!tasks) return [];
    return tasks.filter((task) => task.status.name === status.name);
  }
}
