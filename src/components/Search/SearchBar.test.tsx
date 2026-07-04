import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import SearchBar from "./SearchBar";

describe("SearchBar", () => {
  it("renders the search input", () => {
    render(<SearchBar value="" onChange={() => {}} />);

    expect(
      screen.getByPlaceholderText(/search songs/i)
    ).toBeInTheDocument();
  });

  it("calls onChange when typing", async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();

    render(<SearchBar value="" onChange={onChange} />);

    const input = screen.getByPlaceholderText(/search songs/i);

    await user.type(input, "Taylor");

    expect(onChange).toHaveBeenCalled();
  });

  it("displays the current value", () => {
    render(<SearchBar value="Taylor" onChange={() => {}} />);

    const input = screen.getByDisplayValue("Taylor");

    expect(input).toBeInTheDocument();
  });

  it("clears the input when clear button is clicked", async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();

    render(<SearchBar value="Taylor" onChange={onChange} />);

    const clearButton = screen.getByRole("button");

    await user.click(clearButton);

    expect(onChange).toHaveBeenCalledWith("");
  });
});