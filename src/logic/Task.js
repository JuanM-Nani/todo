import { format } from 'date-fns';

export class Task {
  constructor(title, description, priority, dueDate, forProject = null) {
    this.title = title;
    this.description = description;
    this.priority = priority;
    this.dueDate = dueDate;
    this.forProject = forProject;
    this.isCompleted = false;
    this.subtasks = [];
    this.creationMoment = format(new Date(), "yyyy-MM-dd'T'HH:mm:ss.SSS");
    this.taskID = crypto.randomUUID();
  }

  edit = function (key, newValue) {
    this[key] = newValue;
  };
}
