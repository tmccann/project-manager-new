import { render, screen, waitFor } from "@testing-library/react";
import ProjectForm from "./ProjectForm";
import { ProjectForm as ProjectFormHelpers } from "../../__testUtils__/helpers/ProjectForm.helpers";
import { validInput } from "../../__testUtils__/helpers/ProjectForm.helpers";
import userEvent from "@testing-library/user-event";

const mockSubmit = vi.fn();
const user = userEvent.setup();

beforeEach(() => {
  vi.restoreAllMocks();

  const portalRoot = document.createElement("div");
  portalRoot.setAttribute("id", "modal-root");
  document.body.appendChild(portalRoot);

  window.HTMLDialogElement.prototype.showModal = vi.fn();
  window.HTMLDialogElement.prototype.close = vi.fn();
});

afterEach(() => {
  const portalRoot = document.getElementById("modal-root");
  if (portalRoot) portalRoot.remove();
});

describe("ProjectForm component", () => {
  beforeEach(() => {
    render(<ProjectForm handleSubmit={mockSubmit} />);
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

  test("inputs accept values", async () => {
    await ProjectFormHelpers.actions.validInputs.enterValidTitle(user);
    expect(screen.getByLabelText("Title")).toHaveValue(validInput.title);
    await ProjectFormHelpers.actions.validInputs.enterValidDescription(user);
    expect(screen.getByLabelText("Description")).toHaveValue(
      validInput.description
    );
    await ProjectFormHelpers.actions.validInputs.enterValidDate(user);
    expect(screen.getByLabelText("Due Date")).toHaveValue(validInput.dueDate);
  });
  test("clears inputs on cancel", async () => {
    await ProjectFormHelpers.actions.validInputs.enterValidTitle(user);
    expect(screen.getByLabelText("Title")).toHaveValue(validInput.title);
    await ProjectFormHelpers.actions.validInputs.enterValidDescription(user);
    expect(screen.getByLabelText("Description")).toHaveValue(
      validInput.description
    );
    await ProjectFormHelpers.actions.validInputs.enterValidDate(user);
    expect(screen.getByLabelText("Due Date")).toHaveValue(validInput.dueDate);
    await ProjectFormHelpers.actions.buttons.clickCancel(user);
    const { titleInput, descriptionInput, dueDateInput } =
      ProjectFormHelpers.getElements();
    expect(titleInput).toHaveValue("");
    expect(descriptionInput).toHaveValue("");
    expect(dueDateInput).toHaveValue("");
  });
});

describe("formsubmition and error modal", () => {
  beforeEach(() => {
    render(<ProjectForm handleSubmit={mockSubmit} />);
  });
  test("modal opens and closes with empty inputs error and onsubmit isn't called", async () => {
    await ProjectFormHelpers.actions.buttons.clickSave(user);
    expect(mockSubmit).not.toHaveBeenCalled();
    const { titleError, descriptionError, dueDateError } =
      ProjectFormHelpers.getElements();
    const heading = await screen.findByText(/Form Error/i);
    expect(heading).toBeInTheDocument();
    expect(titleError).toBeInTheDocument();
    expect(descriptionError).toBeInTheDocument();
    expect(dueDateError).toBeInTheDocument();
    const cancelButton = screen.getByRole("button", { name: "Cancel" });
    expect(cancelButton).toBeInTheDocument();
    await user.click(cancelButton);
    await waitFor(() => {
      expect(screen.queryByText(/Form Error/i)).not.toBeInTheDocument();
    });
  });
  test("title input invalid - modal displays title error only and onsubmit isn't called", async () => {
    await ProjectFormHelpers.actions.invalidInputs.enterInvalidTitle(user);
    await ProjectFormHelpers.actions.validInputs.enterValidDescription(user);
    await ProjectFormHelpers.actions.validInputs.enterValidDate(user);

    await ProjectFormHelpers.actions.buttons.clickSave(user);
    expect(mockSubmit).not.toHaveBeenCalled();
    const { titleError, descriptionError, dueDateError } =
      ProjectFormHelpers.getElements();
    expect(titleError).toBeInTheDocument();
    expect(descriptionError).not.toBeInTheDocument();
    expect(dueDateError).not.toBeInTheDocument();
  });
  test("description input invalid - modal displays description error only and onsubmit isn't called", async () => {
    await ProjectFormHelpers.actions.validInputs.enterValidTitle(user);
    await ProjectFormHelpers.actions.invalidInputs.enterInvalidDescription(
      user
    );
    await ProjectFormHelpers.actions.validInputs.enterValidDate(user);

    await ProjectFormHelpers.actions.buttons.clickSave(user);
    expect(mockSubmit).not.toHaveBeenCalled();
    const { titleError, descriptionError, dueDateError } =
      ProjectFormHelpers.getElements();
    expect(titleError).not.toBeInTheDocument();
    expect(descriptionError).toBeInTheDocument();
    expect(dueDateError).not.toBeInTheDocument();
  });
  test("date input invalid - modal displays due date error only and onsubmit isn't called", async () => {
    await ProjectFormHelpers.actions.validInputs.enterValidTitle(user);
    await ProjectFormHelpers.actions.validInputs.enterValidDescription(user);
    await ProjectFormHelpers.actions.invalidInputs.enterInvalidDate(user);

    await ProjectFormHelpers.actions.buttons.clickSave(user);
    expect(mockSubmit).not.toHaveBeenCalled();
    const { titleError, descriptionError, dueDateError } =
      ProjectFormHelpers.getElements();
    expect(titleError).not.toBeInTheDocument();
    expect(descriptionError).not.toBeInTheDocument();
    expect(dueDateError).toBeInTheDocument();
  });
});
describe("form submits when all values are valid", async () => {
  test("form submits with valid inputs", async () => {
    render(<ProjectForm handleSubmit={mockSubmit} />);
    await ProjectFormHelpers.actions.validInputs.enterValidTitle(user);
    await ProjectFormHelpers.actions.validInputs.enterValidDescription(user);
    await ProjectFormHelpers.actions.validInputs.enterValidDate(user);
    await ProjectFormHelpers.actions.buttons.clickSave(user);
    expect(mockSubmit).toHaveBeenCalledWith(validInput);
  });
});
