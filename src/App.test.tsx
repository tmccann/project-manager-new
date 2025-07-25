import { screen, render } from "@testing-library/react";
import {
  NoProjectHelpers,
  ProjectFormHelpers,
  TaskHelpers,
  SideBarHelpers,
} from "./__testUtils__/helpers";

import App from "./App";
import userEvent from "@testing-library/user-event";
import {
  setupModalMocks,
  cleanupModalMocks,
} from "./__testUtils__/mocks/ModalMocks";
import { validInput } from "./__testUtils__/helpers/ProjectForm.helpers";
beforeEach(() => {
  vi.restoreAllMocks();
  setupModalMocks();
});

afterEach(() => {
  cleanupModalMocks();
});

const user = userEvent.setup();

describe("App Component", () => {
  test("noProject Page renders by default with no links", async () => {
    // sidebar and NoProjectPage render intially
    // *** SideBar ***

    render(<App />);
    let { heading, addProjectButton, links } = SideBarHelpers.getElements();
    expect(heading).toBeInTheDocument();
    expect(addProjectButton).toBeInTheDocument();
    expect(links).toHaveLength(0);
    // *** NoProject ***
    let { sharedMessage, addNewProjectButton } = NoProjectHelpers.getElements();
    expect(sharedMessage).toBeInTheDocument();
    expect(addNewProjectButton).toBeInTheDocument();
    // form Page renders when Create new project clicked
    await NoProjectHelpers.actions.clickCreateNewProject(user);
    // ** PrjectForm renders **
    let {
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
    // errors modal renders when form contains error
    await ProjectFormHelpers.actions.buttons.clickSave(user);
    const errorHeading = await screen.findByText(/Form Error/i);
    expect(errorHeading).toBeInTheDocument();
    // inputs clear when cancel clicked
    await ProjectFormHelpers.actions.validInputs.enterValidTitle(user);
    await ProjectFormHelpers.actions.validInputs.enterValidDescription(user);
    await ProjectFormHelpers.actions.validInputs.enterValidDate(user);
    await ProjectFormHelpers.actions.buttons.clickCancel(user);
    ({ titleInput, descriptionInput, dueDateInput } =
      ProjectFormHelpers.getElements());
    // expect(titleInput).toHaveValue("");
    // expect(descriptionInput).toHaveValue("");
    // expect(dueDateInput).toHaveValue("");
    // // NoProject page with linke to project in sidebard renders when valid form saved
    // expect(handleSubmit).toHaveBeenCalled();
    // await ProjectFormHelpers.actions.validInputs.enterValidTitle(user);
    // await ProjectFormHelpers.actions.validInputs.enterValidDescription(user);
    // await ProjectFormHelpers.actions.validInputs.enterValidDate(user);
    // await ProjectFormHelpers.actions.buttons.clickSave(user);
    // let { hasProjectsMessage } = NoProjectHelpers.getElements();
    // ({ links } = SideBarHelpers.getElements());
    // expect(hasProjectsMessage).toBeInTheDocument();
    // expect(links).toHaveLength(1);
    // // projectDisplayPage renders when added project slected from sidebar

    // // project Selected project has correct data displayed
    // expect(
    //   screen.getByRole("heading", { name: validInput.title })
    // ).toBeInTheDocument();
    // expect(screen.getByText(validInput.description)).toBeInTheDocument();
    // expect(screen.getByText(validInput.dueDate)).toBeInTheDocument();
    // // task has rendered
    // let { header, noTasksMessage, taskElements } = TaskHelpers.getElements();
    // expect(header).toBeInTheDocument();
    // expect(noTasksMessage).toBeInTheDocument();
    // expect(taskElements).toHaveLength(0);
    // // task can be added to project
    // await TaskHelpers.actions.taskInput(user, "new task 1");
    // await TaskHelpers.actions.addTaskButton(user);
    // ({ taskElements } = TaskHelpers.getElements());
    // expect(taskElements).toHaveLength(1);
    // // added Tasked is displayed
    // expect(screen.getByText("new task 1")).toBeInTheDocument();
  });
});
