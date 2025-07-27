import { render, screen } from "@testing-library/react";
import ProjectForm from "./ProjectForm";
import { ProjectFormHelpers } from "../../__testUtils__/helpers/ProjectForm.helpers";
import { validInput } from "../../__testUtils__/helpers/ProjectForm.helpers";
import userEvent from "@testing-library/user-event";
import {
  setupModalMocks,
  cleanupModalMocks,
} from "../../__testUtils__/mocks/ModalMocks";

const mockSubmit = vi.fn();
const mockOnCancel = vi.fn();
const user = userEvent.setup();

beforeEach(() => {
  vi.restoreAllMocks();
  setupModalMocks();
});

afterEach(() => {
  cleanupModalMocks();
});

describe("ProjectForm component", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    render(<ProjectForm handleSubmit={mockSubmit} onCancel={mockOnCancel} />);
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
    vi.clearAllMocks();
    render(<ProjectForm handleSubmit={mockSubmit} onCancel={mockOnCancel} />);
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
describe("form cancels and form submits when all values are valid ", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    render(<ProjectForm handleSubmit={mockSubmit} onCancel={mockOnCancel} />);
  });
  test("onCancel called when cancel button clicked", async () => {
    await ProjectFormHelpers.actions.buttons.clickCancel(user);
    expect(mockOnCancel).toHaveBeenCalled();
  });
  test("form submits with valid inputs", async () => {
    await ProjectFormHelpers.actions.validInputs.enterValidTitle(user);
    await ProjectFormHelpers.actions.validInputs.enterValidDescription(user);
    await ProjectFormHelpers.actions.validInputs.enterValidDate(user);
    await ProjectFormHelpers.actions.buttons.clickSave(user);
    expect(mockSubmit).toHaveBeenCalledWith(validInput);
  });
});
