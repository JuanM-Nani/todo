export class ProjectStorage {
  static #projectStorage = [];

  static addProject(project) {
    this.#projectStorage.push(project);
  }

  static removeProject(projectID) {
    const i = this.#projectStorage.findIndex(p => p.projectID === projectID);
    this.#projectStorage.splice(i, 1);
  }

  static getProject(projectID) {
    return this.#projectStorage.find(p => p.projectID === projectID);
  }

  static show() {
    return this.#projectStorage;
  }
}
