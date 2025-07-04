import { render } from "@testing-library/react";
import ProjectForm from "./ProjectForm";
import { ProjectForm as ProjectFormHelpers } from "./ProjectForm.helpers";
import userEvent from "@testing-library/user-event";

const mocksubmit = vi.fn();
const mockProjectFormData = {
  title: "",
  description: "",
  dueDate: "",
};
const user = userEvent.setup();

describe("ProjectForm component", () => {
  beforeEach(() => {
    render(
      <ProjectForm
        handleSubmit={mocksubmit}
        ProjectFormData={mockProjectFormData}
      />
    );
    vi.clearAllMocks();
  });
  test("input and buttons render", () => {
    const {
      cancelButton,
      saveButton,
      titleInput,
      descriptionInput,
      dueDateInput,
    } = ProjectFormHelpers.getElement();
    expect(cancelButton).toBeInTheDocument();
    expect(saveButton).toBeInTheDocument();
    expect(titleInput).toBeInTheDocument();
    expect(descriptionInput).toBeInTheDocument();
    expect(dueDateInput).toBeInTheDocument();
  });
  test("mocksubmit is run when save button clicked", async () => {
    await ProjectFormHelpers.actions.clickButton(user, "Save");
  });
});
