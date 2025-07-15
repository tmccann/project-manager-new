import { screen } from "@testing-library/react";
import { UserEvent } from "@testing-library/user-event";
import { mockData } from "../mocks/SelectedProject.mock";

export const SelectedProject = {
  getDynamicElements: () => ({
    title: screen.getByRole("heading", { name: mockData.title }),
    dueDate: screen.getByText(mockData.dueDate),
    description: screen.getByText(mockData.description),
    deleteButton: screen.getByRole("button", { name: "Clear" }),
  }),
  actions: {
    async deleteButton(user: UserEvent) {
      await user.click(screen.getByRole("button", { name: "Clear" }));
    },
  },
};
