class ProjectManager {
  addTask(taskID) {
    this.taskStorage.push(taskID);
  }

  removeTask(taskID) {
    const index = this.taskStorage.findIndex(t => t.taskID === taskID);
    this.taskStorage.splice(index, 1);
  }

  edit(key, newValue) {
    this[key] = newValue;
  }
}

export class Project extends ProjectManager {
  constructor(emoji, name, description) {
    super();
    this.emoji = emoji;
    this.name = name;
    this.description = description;
    this.taskStorage = [];
    this.projectID = crypto.randomUUID();
  }
}
