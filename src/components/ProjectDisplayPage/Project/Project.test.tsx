import { render, screen } from "@testing-library/react";
import ProjectDisplayPage from "../ProjectDisplayPage";
import { mockData as projectData } from "../../../__testUtils__/mocks/SelectedProject.mock";

describe("ProjectDisplay component", () => {
  beforeEach(() => {
    render(<ProjectDisplayPage projectData={projectData} />);
  });
  test("SelectedProject and Task compeonents render", () => {
    // basic test checking one clear indicator that each component has rendered
    expect(screen.getByRole("heading", { name: projectData.title }));
    expect(screen.getByRole("button", { name: "Delete" }));
  });
});
