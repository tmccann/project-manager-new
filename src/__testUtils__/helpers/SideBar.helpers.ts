import { screen } from "@testing-library/react";
import { UserEvent } from "@testing-library/user-event";

export const SideBarHelpers = {
  getElements: () => ({
    Heading: screen.getByRole("heading", { name: "Your Projects" }),
    AddProjectButton: screen.getByTestId("SideBarAddProject"),
    Links: screen.queryAllByRole("listitem"),
  }),
  actions: {
    async linkButton(user: UserEvent, name: string) {
      await user.click(screen.getByRole("button", { name: name }));
    },
  },
};
