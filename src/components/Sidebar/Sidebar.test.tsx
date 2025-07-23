import { render } from "@testing-library/react";
import Sidebar from "./Sidebar";
import { mockProjects } from "../../__testUtils__/mocks/SideBar.mock";
import userEvent from "@testing-library/user-event";
import { SideBarHelpers } from "../../__testUtils__/helpers/SideBar.helpers";

const user = userEvent.setup();
const mockGetSelectedProject = vi.fn();
describe("Sidebar component ", () => {
  test("sideBar heading and button render and no links if projects empty", () => {
    render(
      <Sidebar projects={[]} getSelectedProject={mockGetSelectedProject} />
    );
    const { heading, addProjectButton, links } = SideBarHelpers.getElements();
    expect(heading).toBeInTheDocument();
    expect(addProjectButton).toBeInTheDocument();
    expect(links).toHaveLength(0);
  });
  test("Links are visable when projects not empty", () => {
    render(
      <Sidebar
        projects={mockProjects}
        getSelectedProject={mockGetSelectedProject}
      />
    );
    const { links } = SideBarHelpers.getElements();
    const projectsLenth = mockProjects.length;
    expect(links).toHaveLength(projectsLenth);
  });
});
describe("Sidebar actions", () => {
  test("Selected project is call when link clicked", async () => {
    render(
      <Sidebar
        projects={mockProjects}
        getSelectedProject={mockGetSelectedProject}
      />
    );
    await SideBarHelpers.actions.linkButton(user, "demo 1");
    expect(mockGetSelectedProject).toHaveBeenCalled();
    expect(mockGetSelectedProject).toBeCalledWith("1");
  });
});
