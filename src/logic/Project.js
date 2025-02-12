class ProjectManager {
  addTask(taskID) {
    this.taskStorage.push(taskID);
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
