export class ProjectStorage {
  static #projectStorage = [];

  static addProject(project) {
    this.#projectStorage.push(project);
  }

  static removeProject(name) {
    const i = this.#projectStorage.findIndex(p => p.name === name);
    this.#projectStorage.splice(i, 1);
  }

  static getProjectByID(projectID) {
    return this.#projectStorage.find(p => p.projectID === projectID) ?? null;
  }

  static show() {
    return this.#projectStorage;
  }
}
