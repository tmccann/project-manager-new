import { render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import NoProject from "./NoProject";
import { NoProjectHelpers } from "../../__testUtils__/helpers/NoProject.helpers";

const mockOnAddProject = vi.fn();
const user = userEvent.setup();

describe("NoProject Component props has project true", () => {
  test("renders create project message when hasProjects is true", () => {
    render(<NoProject hasProjects={true} onAddProject={mockOnAddProject} />);
    const { hasProjectsMessage, addNewProjectButton } =
      NoProjectHelpers.getElements();
    expect(hasProjectsMessage);
    expect(addNewProjectButton).toBeInTheDocument();
  });

  test("mockOnAddProject is executed when addProjectButton Clicked", async () => {
    render(<NoProject hasProjects={false} onAddProject={mockOnAddProject} />);
    await NoProjectHelpers.actions.clickAddButton(user, "Create New Project");
  });
});

describe("NoProject ", () => {
  test("renders projects message when hasProjects is true", () => {
    render(<NoProject hasProjects={false} onAddProject={mockOnAddProject} />);
    const { sharedMessage, addNewProjectButton } =
      NoProjectHelpers.getElements();
    expect(sharedMessage).toBeInTheDocument();
    expect(addNewProjectButton).toBeInTheDocument();
  });
});
