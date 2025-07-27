import { screen, render } from "@testing-library/react";
import {
  NoProjectHelpers,
  ProjectFormHelpers,
  TaskHelpers,
  SideBarHelpers,
  SelectedProjectHelpers,
} from "./__testUtils__/helpers";

import App from "./App";
import userEvent from "@testing-library/user-event";
import {
  setupModalMocks,
  cleanupModalMocks,
} from "./__testUtils__/mocks/ModalMocks";

import { validInput } from "./__testUtils__/helpers/ProjectForm.helpers";
import { formattedDate } from "./__testUtils__/helpers/ProjectForm.helpers";
beforeEach(() => {
  vi.restoreAllMocks();
  setupModalMocks();
});

afterEach(() => {
  cleanupModalMocks();
});

const user = userEvent.setup();

describe("App Component", () => {
  test("user can create and delete a project and tasks end-to-end", async () => {
    // Sidebar and NoProjectPage render intially
    // *** SideBar ***

    render(<App />);
    const { heading, addProjectButton, links } = SideBarHelpers.getElements();
    expect(heading).toBeInTheDocument();
    expect(addProjectButton).toBeInTheDocument();
    expect(links).toHaveLength(0);
    // *** NoProject ***
    let { sharedMessage, addNewProjectButton } = NoProjectHelpers.getElements();
    expect(sharedMessage).toBeInTheDocument();
    expect(addNewProjectButton).toBeInTheDocument();
    // Form Page renders when Create new project clicked
    await NoProjectHelpers.actions.clickCreateNewProject(user);
    // ** PrjectForm renders **
    await screen.findByLabelText("Title");
    const {
      titleInput,
      descriptionInput,
      dueDateInput,
      saveButton,
      cancelButton,
    } = ProjectFormHelpers.getElements();
    expect(titleInput).toBeInTheDocument();
    expect(descriptionInput).toBeInTheDocument();
    expect(dueDateInput).toBeInTheDocument();
    expect(saveButton).toBeInTheDocument();
    expect(cancelButton).toBeInTheDocument();
    // Errors modal renders when form contains error
    await ProjectFormHelpers.actions.buttons.clickSave(user);
    const errorHeading = await screen.findByText(/Form Error/i);
    expect(errorHeading).toBeInTheDocument();
    // Inputs clear when cancel clicked
    await ProjectFormHelpers.actions.validInputs.enterValidTitle(user);
    await ProjectFormHelpers.actions.validInputs.enterValidDescription(user);
    await ProjectFormHelpers.actions.validInputs.enterValidDate(user);
    //  Form cancelled renders noProject Page
    await ProjectFormHelpers.actions.buttons.clickCancel(user);
    ({ sharedMessage, addNewProjectButton } = NoProjectHelpers.getElements());
    expect(sharedMessage).toBeInTheDocument();
    expect(addNewProjectButton).toBeInTheDocument();
    await NoProjectHelpers.actions.clickCreateNewProject(user);

    // NoProject page with link to project in sidebard renders when valid form saved
    await ProjectFormHelpers.actions.validInputs.enterValidTitle(user);
    await ProjectFormHelpers.actions.validInputs.enterValidDescription(user);
    await ProjectFormHelpers.actions.validInputs.enterValidDate(user);
    await ProjectFormHelpers.actions.buttons.clickSave(user);
    // ProjectDisplayPage renders
    const projectMessage = await screen.findByText(
      "Select a project or Create a new project to get started"
    );
    expect(projectMessage).toBeInTheDocument();
    ({ addNewProjectButton } = NoProjectHelpers.getElements());
    // Link renders when project has been added
    expect(addNewProjectButton).toBeInTheDocument();
    let refreshedLinks = await screen.findAllByRole("listitem");
    expect(refreshedLinks).toHaveLength(1);
    // Selected project has correct data displayed
    await SideBarHelpers.actions.linkButton(user, "My Valid Title");
    const selectedProjectHeader = await screen.findByRole("heading", {
      name: "My Valid Title",
    });
    expect(selectedProjectHeader).toBeInTheDocument();
    expect(screen.getByText(validInput.description)).toBeInTheDocument();
    expect(screen.getByText(formattedDate)).toBeInTheDocument();
    // Task has rendered
    const taskHeading = await screen.findByRole("heading", { name: "Tasks" });
    expect(taskHeading).toBeInTheDocument();
    const { noTasksMessage } = TaskHelpers.getElements();
    expect(noTasksMessage).toBeInTheDocument();
    let tasks = screen.queryAllByTestId("taskList");
    expect(tasks).toHaveLength(0);
    // Task can be added to project
    await TaskHelpers.actions.taskInput(user, "new task 1");
    await TaskHelpers.actions.addTaskButton(user);
    // Added Tasked is displayed
    const newTask = await screen.findByText("new task 1");
    expect(newTask).toBeInTheDocument();
    // Delete task
    await TaskHelpers.actions.clearButton(user, "task1");
    tasks = screen.queryAllByTestId("taskList");
    expect(tasks).toHaveLength(0);
    // Delete project
    await SelectedProjectHelpers.actions.deleteButton(user);
    const noProjectMessage = await screen.findByText("No project selected");
    expect(noProjectMessage).toBeInTheDocument();
    // Link is removed when project delete
    refreshedLinks = screen.queryAllByRole("listitem");
    expect(refreshedLinks).toHaveLength(0);
  });
  // NotFound state is guarded by form validation and internal logic.
  // No user path currently leads to this state.
});
