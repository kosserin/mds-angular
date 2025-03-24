import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { Task } from "../models/task.model";
import { Status } from "../models/status.model";

@Injectable({
  providedIn: "root",
})
export class TaskService {
  private tasks: Task[] = [];
  private tasksSubject = new BehaviorSubject<Task[]>([]);
  public selectedTask: Task | null = null;

  getTasks(): Observable<Task[]> {
    return this.tasksSubject.asObservable();
  }

  addTask(task: Task) {
    this.tasks = [...this.tasks, task];
    this.tasksSubject.next(this.tasks);
    this.saveTasksToStorage();
  }

  changeTaskStatus(id: string, status: Status) {
    this.tasks = this.tasks.map((task) =>
      task.id === id ? { ...task, status } : task
    );
    this.tasksSubject.next(this.tasks);
    this.saveTasksToStorage();
  }

  updateTasks(task: Task) {
    this.tasks = this.tasks.map((t) =>
      t.id === task.id ? { ...t, ...task } : t
    );
    this.tasksSubject.next(this.tasks);
    this.saveTasksToStorage();
  }

  deleteTask(id: string) {
    this.tasks = this.tasks.filter((task) => task.id !== id);
    this.tasksSubject.next(this.tasks);
    this.saveTasksToStorage();
  }

  loadTasksFromStorage() {
    const storedTasks = localStorage.getItem("tasks");
    if (storedTasks) {
      this.tasks = JSON.parse(storedTasks);
      this.tasksSubject.next(this.tasks);
    }
  }

  private saveTasksToStorage() {
    localStorage.setItem("tasks", JSON.stringify(this.tasks));
  }
}
