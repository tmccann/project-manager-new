import { render } from "@testing-library/react";
import { SelectedProjectHelpers } from "../../../__testUtils__/helpers/SelectedProject.helpers";
import { mockData as project } from "../../../__testUtils__/mocks/SelectedProject.mock";
import SelectedProject from "./SelectedProject";
import userEvent from "@testing-library/user-event";

const user = userEvent.setup();
const mockHandleDelete = vi.fn();
describe("SelectedProject component", () => {
  beforeEach(() => {
    render(
      <SelectedProject
        project={project}
        handleProjectDelete={mockHandleDelete}
      />
    );
  });
  test("title, description, dueDate and clear button are rendered ", () => {
    const { title, description, dueDate, deleteButton } =
      SelectedProjectHelpers.getDynamicElements();
    expect(title).toBeInTheDocument();
    expect(description).toBeInTheDocument();
    expect(dueDate).toBeInTheDocument();
    expect(deleteButton).toBeInTheDocument();
  });
  test("clear button handleDelete executed with correct id", async () => {
    await SelectedProjectHelpers.actions.deleteButton(user);
    expect(mockHandleDelete).toHaveBeenCalledTimes(1);
    expect(mockHandleDelete).toBeCalledWith(project.id);
  });
});
