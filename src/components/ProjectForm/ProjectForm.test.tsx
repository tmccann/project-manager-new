import { render, screen } from "@testing-library/react";
import ProjectForm from "./ProjectForm";
import { ProjectForm as ProjectFormHelpers } from "../../__testUtils__/helpers/ProjectForm.helpers";
import userEvent from "@testing-library/user-event";

const mockSubmit = vi.fn();
const modalRefMock = { current: { open: vi.fn() } };

const user = userEvent.setup();

describe("ProjectForm component", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    // @ts-expect-error – modalRef not yet supported, added in next TDD step
    render(<ProjectForm handleSubmit={mockSubmit} modalRef={modalRefMock} />);
  });
  // good
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
    expect(screen.getByLabelText("Title")).toHaveValue(
      ProjectFormHelpers.validInput.title
    );
    await ProjectFormHelpers.actions.validInputs.enterValidDescription(user);
    expect(screen.getByLabelText("Description")).toHaveValue(
      ProjectFormHelpers.validInput.description
    );
    await ProjectFormHelpers.actions.validInputs.enterValidDate(user);
    expect(screen.getByLabelText("Due Date")).toHaveValue(
      ProjectFormHelpers.validInput.dueDate
    );
  });
  test("clears inputs on cancel", async () => {
    await ProjectFormHelpers.actions.validInputs.enterValidTitle(user);
    expect(screen.getByLabelText("Title")).toHaveValue(
      ProjectFormHelpers.validInput.title
    );
    await ProjectFormHelpers.actions.validInputs.enterValidDescription(user);
    expect(screen.getByLabelText("Description")).toHaveValue(
      ProjectFormHelpers.validInput.description
    );
    await ProjectFormHelpers.actions.validInputs.enterValidDate(user);
    expect(screen.getByLabelText("Due Date")).toHaveValue(
      ProjectFormHelpers.validInput.dueDate
    );
    await ProjectFormHelpers.actions.buttons.clickCancel(user);
    const { titleInput, descriptionInput, dueDateInput } =
      ProjectFormHelpers.getElements();
    expect(titleInput).toHaveValue("");
    expect(descriptionInput).toHaveValue("");
    expect(dueDateInput).toHaveValue("");
  });
});

describe("input validation and form submission", () => {
  beforeEach(() => {
    vi.restoreAllMocks();
    // @ts-expect-error – modalRef not yet supported, added in next TDD step
    render(<ProjectForm handleSubmit={mockSubmit} modalRef={modalRefMock} />);
  });
  test("fails if title is invalid → modal called, no submit", async () => {
    await ProjectFormHelpers.actions.invalidInputs.enterInvalidTitle(user);
    await ProjectFormHelpers.actions.validInputs.enterValidDescription(user);
    await ProjectFormHelpers.actions.validInputs.enterValidDate(user);
    await ProjectFormHelpers.actions.buttons.clickSave(user);
    expect(mockSubmit).not.toHaveBeenCalled();
    expect(modalRefMock.current.open).toHaveBeenCalled();
  });
  test("fails if description is invalid → modal called, no submit", async () => {
    await ProjectFormHelpers.actions.validInputs.enterValidTitle(user);
    await ProjectFormHelpers.actions.invalidInputs.enterInvalidDescription(
      user
    );
    await ProjectFormHelpers.actions.validInputs.enterValidDate(user);
    await ProjectFormHelpers.actions.buttons.clickSave(user);
    expect(mockSubmit).not.toHaveBeenCalled();
    expect(modalRefMock.current.open).toHaveBeenCalled();
  });
  test("fails if due date is invalid → modal called, no submit", async () => {
    await ProjectFormHelpers.actions.validInputs.enterValidTitle(user);
    await ProjectFormHelpers.actions.validInputs.enterValidDescription(user);
    await ProjectFormHelpers.actions.invalidInputs.enterInvalidDate(user);
    await ProjectFormHelpers.actions.buttons.clickSave(user);
    expect(mockSubmit).not.toHaveBeenCalled();
    expect(modalRefMock.current.open).toHaveBeenCalled();
  });
  test("succeeds if all inputs valid → no modal, submit is called", async () => {
    await ProjectFormHelpers.actions.validInputs.enterValidTitle(user);
    await ProjectFormHelpers.actions.validInputs.enterValidDescription(user);
    await ProjectFormHelpers.actions.validInputs.enterValidDate(user);
    await ProjectFormHelpers.actions.buttons.clickSave(user);
    expect(mockSubmit).toBeCalledTimes(1);
    expect(mockSubmit).toBeCalledWith({
      title: "My Valid Title",
      description: "My Valid Description",
      dueDate: "7/18/2025",
    });
    expect(modalRefMock.current.open).not.toHaveBeenCalled();
  });
});
