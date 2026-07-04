import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import Pagination from "./Pagination";

describe("Pagination", () => {
  it("renders current page information", () => {
    render(
      <Pagination
        page={2}
        total={100}
        pageSize={25}
        onPageChange={() => {}}
        onPageSizeChange={() => {}}
      />
    );

    expect(screen.getByText("Page 2 of 4")).toBeInTheDocument();
  });

  it("calls onPageChange when Next is clicked", async () => {
    const user = userEvent.setup();
    const onPageChange = vi.fn();

    render(
      <Pagination
        page={1}
        total={100}
        pageSize={25}
        onPageChange={onPageChange}
        onPageSizeChange={() => {}}
      />
    );

    await user.click(screen.getByRole("button", { name: /next/i }));

    expect(onPageChange).toHaveBeenCalledWith(2);
  });

  it("calls onPageChange when Previous is clicked", async () => {
    const user = userEvent.setup();
    const onPageChange = vi.fn();

    render(
      <Pagination
        page={2}
        total={100}
        pageSize={25}
        onPageChange={onPageChange}
        onPageSizeChange={() => {}}
      />
    );

    await user.click(screen.getByRole("button", { name: /previous/i }));

    expect(onPageChange).toHaveBeenCalledWith(1);
  });

  it("calls onPageSizeChange when page size changes", async () => {
    const user = userEvent.setup();
    const onPageSizeChange = vi.fn();

    render(
      <Pagination
        page={1}
        total={100}
        pageSize={25}
        onPageChange={() => {}}
        onPageSizeChange={onPageSizeChange}
      />
    );

    const select = screen.getByRole("combobox");

    await user.selectOptions(select, "50");

    expect(onPageSizeChange).toHaveBeenCalledWith(50);
  });

  it("disables Previous button on first page", () => {
    render(
      <Pagination
        page={1}
        total={100}
        pageSize={25}
        onPageChange={() => {}}
        onPageSizeChange={() => {}}
      />
    );

    expect(
      screen.getByRole("button", { name: /previous/i })
    ).toBeDisabled();
  });

  it("disables Next button on last page", () => {
    render(
      <Pagination
        page={4}
        total={100}
        pageSize={25}
        onPageChange={() => {}}
        onPageSizeChange={() => {}}
      />
    );

    expect(
      screen.getByRole("button", { name: /next/i })
    ).toBeDisabled();
  });
});