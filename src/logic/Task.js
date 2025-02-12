import { format } from 'date-fns';

class TaskManager {
  edit(key, newValue) {
    this[key] = newValue;
  }
}

export class Task extends TaskManager {
  constructor(title, description, priority, dueDate, forProject = null) {
    super();
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
}
