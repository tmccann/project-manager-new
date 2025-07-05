import { render, screen } from "@testing-library/react";
import ProjectForm from "./ProjectForm";
import { ProjectForm as ProjectFormHelpers } from "./ProjectForm.helpers";
import userEvent from "@testing-library/user-event";

const mockSubmit = vi.fn();

const mockProjectFormData = {
  title: "",
  description: "",
  dueDate: "",
};
const user = userEvent.setup();

describe("ProjectForm component", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    render(
      <ProjectForm
        handleSubmit={mockSubmit}
        ProjectFormData={mockProjectFormData}
      />
    );
  });
  test("input and buttons render", () => {
    const {
      cancelButton,
      saveButton,
      titleInput,
      descriptionInput,
      dueDateInput,
    } = ProjectFormHelpers.getElements();
    expect(cancelButton).toBeInTheDocument();
    expect(saveButton).toBeInTheDocument();
    expect(titleInput).toBeInTheDocument();
    expect(descriptionInput).toBeInTheDocument();
    expect(dueDateInput).toBeInTheDocument();
  });
  test("mocksubmit is run when save button clicked", async () => {
    await ProjectFormHelpers.actions.clickButton(user, "Save");
    expect(mockSubmit).toHaveBeenCalled();
  });
  test("inputs eccepts values", async () => {
    const {
      titleInput,
      descriptionInput,
      dueDateInput,
      saveButton,
      cancelButton,
    } = ProjectFormHelpers.getElements();
    const today = new Date().toLocaleDateString();
    const inputStrings = {
      titleString: "New Project",
      descriptionString: "Description goes here",
      dueDateString: today,
    };
    await ProjectFormHelpers.actions.userInput(
      user,
      "Title",
      inputStrings.titleString
    );
    expect(titleInput).toHaveValue(inputStrings.titleString);
    await ProjectFormHelpers.actions.userInput(
      user,
      "Description",
      inputStrings.descriptionString
    );
    expect(titleInput).toHaveValue(inputStrings.descriptionString);
    await ProjectFormHelpers.actions.userInput(
      user,
      "Due Date",
      inputStrings.dueDateString
    );
    expect(titleInput).toHaveValue(inputStrings.dueDateString);
  });
});
