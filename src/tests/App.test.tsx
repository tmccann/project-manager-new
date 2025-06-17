import { render, screen } from "@testing-library/react";
import App from "../App";

describe("App Component", () => {
  it("renders welcome message", () => {
    render(<App />);
    expect(screen.getByText(/you're logged in!/i)).toBeInTheDocument();
  });

  it("has a button that can be clicked", () => {
    render(<App />);
    const button = screen.getByRole("button", { name: /click me/i });
    expect(button).toBeInTheDocument();
  });
});
