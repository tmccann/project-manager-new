import {
  addTaskToProject,
  createNewProject,
  deleteProject,
  deleteTaskFromProject,
  generateNextId,
} from "./Generate";
import { mockProjects as projects } from "../__testUtils__/mocks/SideBar.mock";

const addProjectData = {
  title: "add project test",
  description: "this is a test",
  dueDate: "12/12/2025",
};

describe("utilty functions behave as expected", () => {
  test("generateNextId return 1 if array is empty", () => {
    const nextId = generateNextId([]);
    expect(nextId).toBe("1");
  });
  test("generated is increments id by 1", () => {
    const testArray = [{ id: "1" }, { id: "2" }, { id: "3" }];
    const idTest = generateNextId(testArray);
    expect(idTest).toBe("4");
  });
  test("createProject returns projects with new Project", () => {
    const updatedProjects = createNewProject({ projects, addProjectData });
    expect(updatedProjects.title).toBe("add project test");
    expect(updatedProjects.description).toBe("this is a test");
    expect(updatedProjects.dueDate).toBe("12/12/2025");
    expect(updatedProjects.id).toBe("3");
  });
  test("deleteProject returns projects with id 2 removed", () => {
    const idToDelete = "2";
    const updatedProjects = deleteProject({ projects, id: idToDelete });
    expect(updatedProjects).toHaveLength(1);
    expect(updatedProjects.some((p) => p.id === idToDelete)).toBe(false);
  });
  test("addTaskToProject adds task to selected Project", () => {
    const idToUpdate = "1";
    const description = "this is a test task";
    const updatedProjects = addTaskToProject({
      projects,
      projectId: idToUpdate,
      description,
    });
    const updatedProject = updatedProjects.find(
      (project) => project.id === idToUpdate
    );
    const tasks = updatedProject?.tasks;
    expect(
      tasks?.some((task) => task.description === "this is a test task")
    ).toBe(true);
  });
  test("deleteTaskFromProject removes task from selected project", () => {
    const projectId = "1";
    const id = "1";
    const deleteTaskData = { projectId, id };
    const updatedProjects = deleteTaskFromProject({ projects, deleteTaskData });
    const updatedProject = updatedProjects.find(
      (project) => project.id === projectId
    );
    const tasks = updatedProject?.tasks;
    expect(tasks?.some((task) => task.id === id)).toBe(false);
  });
});
