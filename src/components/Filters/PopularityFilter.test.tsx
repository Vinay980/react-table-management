import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import PopularityFilter from "./PopularityFilter";

describe("PopularityFilter", () => {
  it("renders min and max inputs", () => {
    render(
      <PopularityFilter
        min={0}
        max={100}
        onMinChange={() => {}}
        onMaxChange={() => {}}
      />,
    );

    expect(screen.getByPlaceholderText("Min")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Max")).toBeInTheDocument();
  });

  it("displays current values", () => {
    render(
      <PopularityFilter
        min={20}
        max={80}
        onMinChange={() => {}}
        onMaxChange={() => {}}
      />,
    );

    expect(screen.getByDisplayValue("20")).toBeInTheDocument();
    expect(screen.getByDisplayValue("80")).toBeInTheDocument();
  });

  it("calls onMinChange when minimum value changes", async () => {
    const user = userEvent.setup();
    const onMinChange = vi.fn();

    render(
      <PopularityFilter
        min={0}
        max={100}
        onMinChange={onMinChange}
        onMaxChange={() => {}}
      />,
    );

    const input = screen.getByPlaceholderText("Min");

    await user.clear(input);
    await user.type(input, "25");

    expect(onMinChange).toHaveBeenCalled();
  });

  it("calls onMaxChange when maximum value changes", async () => {
    const user = userEvent.setup();
    const onMaxChange = vi.fn();

    render(
      <PopularityFilter
        min={0}
        max={100}
        onMinChange={() => {}}
        onMaxChange={onMaxChange}
      />,
    );

    const input = screen.getByPlaceholderText("Max");

    await user.clear(input);
    await user.type(input, "90");

    expect(onMaxChange).toHaveBeenCalled();
  });

  it("limits values greater than 100", async () => {
    const user = userEvent.setup();
    const onMaxChange = vi.fn();

    render(
      <PopularityFilter
        min={0}
        max={100}
        onMinChange={() => {}}
        onMaxChange={onMaxChange}
      />,
    );

    const input = screen.getByPlaceholderText("Max");

    await user.clear(input);
    await user.type(input, "120");

    expect(onMaxChange).toHaveBeenCalled();
  });
});
