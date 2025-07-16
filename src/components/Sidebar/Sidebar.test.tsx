import { render, screen } from "@testing-library/react";
import Sidebar from "./Sidebar";
import { mockProjects } from "../../__testUtils__/mocks/SideBar.mock";
import userEvent from "@testing-library/user-event";

const user = userEvent.setup();
const mockGetSelectedProject = vi.fn();
describe("Sidebar component ", () => {
  test("sideBar heading and button render and no links if projects empty", () => {
    render(
      <Sidebar projects={[]} getSelectedProject={mockGetSelectedProject} />
    );
    expect(
      screen.getByRole("heading", { name: "Your Projects" })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Create New Project" })
    ).toBeInTheDocument();
    expect(screen.queryAllByRole("listitem")).toHaveLength(0);
  });
  test("Links are visable when projects not empty", () => {
    render(
      <Sidebar
        projects={mockProjects}
        getSelectedProject={mockGetSelectedProject}
      />
    );
    const projectsLenth = mockProjects.length;
    expect(screen.queryAllByRole("listitem")).toHaveLength(projectsLenth);
  });
});
describe("Sidebar actions", () => {
  test("test", async () => {
    render(
      <Sidebar
        projects={mockProjects}
        getSelectedProject={mockGetSelectedProject}
      />
    );
    await user.click(screen.getByRole("button", { name: "demo 1" }));
    expect(mockGetSelectedProject).toBeCalledWith("1");
  });
});
