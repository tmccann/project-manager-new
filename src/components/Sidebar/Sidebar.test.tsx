import { render } from "@testing-library/react";
import Sidebar from "./Sidebar";
import { mockProjects } from "../../__testUtils__/mocks/SideBar.mock";
import userEvent from "@testing-library/user-event";
import { SideBarHelpers } from "../../__testUtils__/helpers/SideBar.helpers";

const user = userEvent.setup();
const mockGetSelectedProject = vi.fn();
const mockOnAddProject = vi.fn();
describe("Sidebar component ", () => {
  test("sideBar heading and button render and no links if projects empty", () => {
    render(
      <Sidebar
        projects={[]}
        getSelectedProject={mockGetSelectedProject}
        onAddProject={mockOnAddProject}
      />
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
        onAddProject={mockOnAddProject}
      />
    );
    const { links } = SideBarHelpers.getElements();
    const projectsLenth = mockProjects.length;
    expect(links).toHaveLength(projectsLenth);
  });
});
describe("Sidebar actions", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    render(
      <Sidebar
        projects={mockProjects}
        getSelectedProject={mockGetSelectedProject}
        onAddProject={mockOnAddProject}
      />
    );
  });
  test("Selected project is call when link clicked", async () => {
    // First letter of project is caoitalised for display purposes
    await SideBarHelpers.actions.linkButton(user, "Demo 1");
    expect(mockGetSelectedProject).toHaveBeenCalled();
    expect(mockGetSelectedProject).toBeCalledWith("1");
  });
  test('onAddProject is called when "Create New Project" is clicked ', async () => {
    await SideBarHelpers.actions.addProjectButton(user);
    expect(mockOnAddProject).toHaveBeenCalled();
  });
});
