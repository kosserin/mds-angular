import { Status } from "./status.model";

export interface Task {
    id: string;
    title: string;
    description?: string;
    dueDate?: string;
    status: Status;
    createdAt: Date;
  }  