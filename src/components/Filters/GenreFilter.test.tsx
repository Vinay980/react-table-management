import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import GenreFilter from "./GenreFilter";

describe("GenreFilter", () => {
  it("renders the genre dropdown", () => {
    render(<GenreFilter value="" onChange={() => {}} />);

    expect(screen.getByRole("combobox")).toBeInTheDocument();
  });

  it("renders all genre options", () => {
    render(<GenreFilter value="" onChange={() => {}} />);

    expect(screen.getByText("All Genres")).toBeInTheDocument();
    expect(screen.getByText("pop")).toBeInTheDocument();
    expect(screen.getByText("rap")).toBeInTheDocument();
    expect(screen.getByText("rock")).toBeInTheDocument();
    expect(screen.getByText("latin")).toBeInTheDocument();
    expect(screen.getByText("r&b")).toBeInTheDocument();
    expect(screen.getByText("edm")).toBeInTheDocument();
  });

  it("calls onChange when selecting a genre", async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();

    render(<GenreFilter value="" onChange={onChange} />);

    const select = screen.getByRole("combobox");

    await user.selectOptions(select, "rock");

    expect(onChange).toHaveBeenCalledWith("rock");
  });

  it("shows the selected genre", () => {
    render(<GenreFilter value="pop" onChange={() => {}} />);

    const select = screen.getByRole("combobox") as HTMLSelectElement;

    expect(select.value).toBe("pop");
  });
});