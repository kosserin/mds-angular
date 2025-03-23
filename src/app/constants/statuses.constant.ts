import { Status } from "../models/status.model";

export const STATUSES: Status[] = [
  {
    name: "backlog",
    text: "Backlog",
    color: "grey",
  },
  {
    name: "grooming",
    text: "Grooming",
    color: "grey",
  },
  {
    name: "selected-for-dev",
    text: "Selected For Dev",
    color: "blue",
  },
  {
    name: "in-progress",
    text: "In Progress",
    color: "blue",
  },
  {
    name: "more-work-required",
    text: "More Work Required",
    color: "blue",
  },
  {
    name: "ready-for-review",
    text: "Ready For Review",
    color: "blue",
  },
  {
    name: "ready-for-qa",
    text: "Ready For QA",
    color: "blue",
  },
  {
    name: "in-qa",
    text: "In QA",
    color: "blue",
  },
  {
    name: "ready-to-merge",
    text: "Ready To Merge",
    color: "blue",
  },
  {
    name: "done",
    text: "Done",
    color: "green",
  },
];
