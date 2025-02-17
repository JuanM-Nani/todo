import { Project } from './Project.js';
export class ProjectStorage {
  static #projectStorage = [];

  static addProject(project) {
    this.#projectStorage.push(project);
  }

  static removeProject(projectID) {
    const i = this.#projectStorage.findIndex(p => p.projectID === projectID);
    this.#projectStorage.splice(i, 1);
  }

  static getProjectByID(projectID) {
    return this.#projectStorage.find(p => p.projectID === projectID);
  }

  static show() {
    return this.#projectStorage;
  }

  static setLocalProjectStorage(localProjectStorage) {
    this.#projectStorage = localProjectStorage;
    this.#projectStorage.forEach(p => {
      const project = new Project();

      const removeTask = project.removeTask;
      const addTask = project.addTask;
      const edit = project.edit;

      p.removeTask = removeTask;
      p.addTask = addTask;
      p.edit = edit;
    });
  }
}
