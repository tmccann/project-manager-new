import { render, screen } from "@testing-library/react";
import { mockData as projectData } from "../../__testUtils__/mocks/SelectedProject.mock";
import ProjectDisplayPage from "./ProjectDisplayPage";

const mockhandleProjectDelete = vi.fn();
const mockhandleAddTask = vi.fn();
const mockhandleTaskDelete = vi.fn();
describe("ProjectDisplay component", () => {
  beforeEach(() => {
    render(
      <ProjectDisplayPage
        project={projectData}
        handleProjectDelete={mockhandleProjectDelete}
        handleAddTask={mockhandleAddTask}
        handleTaskDelete={mockhandleTaskDelete}
      />
    );
  });
  test("SelectedProject and Task compeonents render", () => {
    // basic test checking one clear indicator that each component has rendered
    expect(screen.getByRole("heading", { name: projectData.title }));
    expect(screen.getByRole("button", { name: "Delete" }));
  });
});
