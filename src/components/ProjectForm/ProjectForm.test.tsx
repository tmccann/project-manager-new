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

const today = new Date().toLocaleDateString();
console.log(today);
const inputStrings = {
  titleString: "New Project",
  descriptionString: "Description goes here",
  dueDateString: today,
};

const errorMessages = {
  titleError: "Title must be atleast 4 character not including spaces",
  descriptionError:
    "Description must be atleast 4 character not including spaces",
  dateError: "Date must be today or later",
};
describe("ProjectForm component", () => {
  beforeEach(() => {
    vi.clearAllMocks();
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

  test("inputs eccept values", async () => {
    const { titleInput, descriptionInput, dueDateInput } =
      ProjectFormHelpers.getElements();

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
    expect(descriptionInput).toHaveValue(inputStrings.descriptionString);
    await ProjectFormHelpers.actions.userInput(user, "Due Date", "7/7/2025");
    expect(dueDateInput).toHaveValue(inputStrings.dueDateString);
  });
});

describe("input validation", () => {
  beforeEach(() => {
    render(<ProjectForm handleSubmit={mockSubmit} />);
  });
  test("inputs error if left empty", async () => {
    await ProjectFormHelpers.actions.clickButton(user, "Save");
    expect(screen.getByText(errorMessages.titleError)).toBeInTheDocument();
    expect(
      screen.getByText(errorMessages.descriptionError)
    ).toBeInTheDocument();
    expect(screen.getByText(errorMessages.dateError)).toBeInTheDocument();
  });
  test("inputs errors when user input invalid", async () => {
    await ProjectFormHelpers.actions.userInput(user, "Title", "123");
    await ProjectFormHelpers.actions.userInput(user, "Description", "123");
    await ProjectFormHelpers.actions.userInput(user, "Due Date", "1/15/2025");
    await ProjectFormHelpers.actions.clickButton(user, "Save");
    screen.debug();
    expect(screen.getByText(errorMessages.titleError)).toBeInTheDocument();
    expect(
      screen.getByText(errorMessages.descriptionError)
    ).toBeInTheDocument();
    expect(screen.getByText(errorMessages.dateError)).toBeInTheDocument();
  });
  test("no message shown when inputs are valid", async () => {
    await ProjectFormHelpers.actions.userInput(
      user,
      "Title",
      inputStrings.titleString
    );
    expect(
      screen.queryByText(errorMessages.titleError)
    ).not.toBeInTheDocument();
    await ProjectFormHelpers.actions.userInput(
      user,
      "Description",
      inputStrings.descriptionString
    );
    expect(
      screen.queryByText(errorMessages.descriptionError)
    ).not.toBeInTheDocument();
    await ProjectFormHelpers.actions.userInput(
      user,
      "Due Date",
      inputStrings.dueDateString
    );
    expect(screen.queryByText(errorMessages.dateError)).not.toBeInTheDocument();
  });
});
