export class TaskStorage {
  static #taskStorage = new Map();

  static addTask(task) {
    this.#taskStorage.set(task.taskID, task);
  }

  static removeTask(taskID) {
    this.#taskStorage.delete(taskID);
  }

  static getProjectTask(projectID) {
    const projectTasks = [];
    this.#taskStorage.forEach(t => {
      if (t.projectID === projectID) projectTasks.push(t);
    });

    return projectTasks;
  }

  static getTaskByID(taskID) {
    return this.#taskStorage.get(taskID);
  }

  static show() {
    return this.#taskStorage;
  }
}
