import { screen } from "@testing-library/react";
import { UserEvent } from "@testing-library/user-event";
import { capitaliseFirstLetter } from "../../utils/capitaliseFirstLetter";

export const SideBarHelpers = {
  getElements: () => ({
    heading: screen.getByRole("heading", { name: "Your Projects" }),
    addProjectButton: screen.getByTestId("SideBarAddProject"),
    links: screen.queryAllByRole("listitem"),
  }),
  actions: {
    async linkButton(user: UserEvent, name: string) {
      await user.click(
        screen.getByRole("button", { name: capitaliseFirstLetter(name) })
      );
    },
    async addProjectButton(user: UserEvent) {
      await user.click(
        screen.getByRole("button", { name: "Create New Project" })
      );
    },
  },
};
