import { render, screen } from "@testing-library/react";
import { SelectedProjectHelpers } from "../../../__testUtils__/helpers/SelectedProject.helpers";
import { mockData as project } from "../../../__testUtils__/mocks/SelectedProject.mock";
import SelectedProject from "./SelectedProject";
import userEvent from "@testing-library/user-event";

import { formattedDate } from "../../../__testUtils__/helpers/ProjectForm.helpers";
const user = userEvent.setup();
const mockHandleDelete = vi.fn();
describe("SelectedProject component", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    render(
      <SelectedProject
        project={project}
        handleProjectDelete={mockHandleDelete}
      />
    );
  });
  test("title, description, dueDate and clear button are rendered ", () => {
    const { title, description, deleteButton } =
      SelectedProjectHelpers.getDynamicElements();
    expect(title).toBeInTheDocument();
    expect(description).toBeInTheDocument();
    expect(screen.getByText(formattedDate)).toBeInTheDocument();
    expect(deleteButton).toBeInTheDocument();
  });
  test("clear button handleDelete executed with correct id", async () => {
    await SelectedProjectHelpers.actions.deleteButton(user);
    expect(mockHandleDelete).toHaveBeenCalledTimes(1);
    expect(mockHandleDelete).toBeCalledWith(project.id);
  });
});
