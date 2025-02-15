export class Project {
  constructor(emoji, name, description) {
    this.emoji = emoji;
    this.name = name;
    this.description = description;
    this.taskStorage = [];
    this.projectID = crypto.randomUUID();
  }

  addTask(taskID) {
    this.taskStorage.push(taskID);
  }

  removeTask(taskID) {
    const index = this.taskStorage.findIndex(t => t === taskID);
    this.taskStorage.splice(index, 1);
  }

  edit(key, newValue) {
    this[key] = newValue;
  }
}
