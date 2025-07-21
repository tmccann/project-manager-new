import { screen } from "@testing-library/react";
import type { UserEvent } from "@testing-library/user-event";

const sharedMessage = "Create a new project to get started";
export const NoProjectHelpers = {
  // Using queryByText instead of getByText to safely handle conditional rendering
  getElements: () => ({
    hasProjectsMessage: screen.queryByText(
      `Select a project or ${sharedMessage} `
    ),
    sharedMessage: screen.queryByText(sharedMessage),
    addNewProjectButton: screen.getByRole("button", {
      name: "Create New Project",
    }),
  }),

  actions: {
    async clickAddButton(user: UserEvent, label: string) {
      await user.click(screen.getByRole("button", { name: label }));
    },
  },
};
