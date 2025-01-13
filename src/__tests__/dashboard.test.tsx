import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Dashboard from "@/app/page";
import { useStore } from "@/lib/store";
import "@testing-library/jest-dom";

// Mock the zustand store
jest.mock("@/lib/store", () => ({
  useStore: jest.fn(),
}));

describe("Dashboard", () => {
  const mockAddProduct = jest.fn();
  const mockUpdateProduct = jest.fn();
  const mockDeleteProduct = jest.fn();

  const mockProducts = [
    {
      id: "1",
      title: "Test Product 1",
      status: "Pending",
      description: "Test Description 1",
      recipient: "John Doe",
      recipientPhone: "1234567890",
      origin: "Origin Address 1",
      destination: "Destination Address 1",
      eta: Date.now(),
      packages: [
        {
          name: "Package 1",
          weight: 1,
          weightUnit: "kg",
          quantity: 1,
          quantityUnit: "pcs",
        },
      ],
    },
    {
      id: "2",
      title: "Test Product 2",
      status: "Delivered",
      description: "Test Description 2",
      recipient: "Jane Doe",
      recipientPhone: "0987654321",
      origin: "Origin Address 2",
      destination: "Destination Address 2",
      eta: Date.now(),
      packages: [
        {
          name: "Package 2",
          weight: 2,
          weightUnit: "kg",
          quantity: 2,
          quantityUnit: "pcs",
        },
      ],
    },
    {
      id: "3",
      title: "Test Product 3",
      status: "Cancelled",
      description: "Test Description 3",
      recipient: "Jim Doe",
      recipientPhone: "1122334455",
      origin: "Origin Address 3",
      destination: "Destination Address 3",
      eta: Date.now(),
      packages: [
        {
          name: "Package 3",
          weight: 3,
          weightUnit: "kg",
          quantity: 3,
          quantityUnit: "pcs",
        },
      ],
    },
    {
      id: "4",
      title: "Test Product 4",
      status: "Pending",
      description: "Test Description 4",
      recipient: "Jake Doe",
      recipientPhone: "5566778899",
      origin: "Origin Address 4",
      destination: "Destination Address 4",
      eta: Date.now(),
      packages: [
        {
          name: "Package 4",
          weight: 4,
          weightUnit: "kg",
          quantity: 4,
          quantityUnit: "pcs",
        },
      ],
    },
    {
      id: "5",
      title: "Test Product 5",
      status: "Delivered",
      description: "Test Description 5",
      recipient: "Jill Doe",
      recipientPhone: "6677889900",
      origin: "Origin Address 5",
      destination: "Destination Address 5",
      eta: Date.now(),
      packages: [
        {
          name: "Package 5",
          weight: 5,
          weightUnit: "kg",
          quantity: 5,
          quantityUnit: "pcs",
        },
      ],
    },
    {
      id: "6",
      title: "Test Product 6",
      status: "Cancelled",
      description: "Test Description 6",
      recipient: "Jack Doe",
      recipientPhone: "7788990011",
      origin: "Origin Address 6",
      destination: "Destination Address 6",
      eta: Date.now(),
      packages: [
        {
          name: "Package 6",
          weight: 6,
          weightUnit: "kg",
          quantity: 6,
          quantityUnit: "pcs",
        },
      ],
    },
  ];

  beforeEach(() => {
    (useStore as unknown as jest.Mock).mockReturnValue({
      products: mockProducts,
      addProduct: mockAddProduct,
      updateProduct: mockUpdateProduct,
      deleteProduct: mockDeleteProduct,
    });
  });

  it("renders the dashboard with products", () => {
    render(<Dashboard />);

    expect(screen.getByText("Dashboard")).toBeInTheDocument();
    expect(screen.getByText("Total Products: 6")).toBeInTheDocument();
    expect(screen.getByText("Pending: 2")).toBeInTheDocument();
    expect(screen.getByText("Delivered: 2")).toBeInTheDocument();
    expect(screen.getByText("Cancelled: 2")).toBeInTheDocument();
  });

  it("submits the form to add a product", () => {
    render(<Dashboard />);

    fireEvent.change(screen.getByLabelText(/Title:/i), {
      target: { value: "New Product" },
    });
    fireEvent.change(screen.getByLabelText(/Recipient:/i), {
      target: { value: "Jane Doe" },
    });
    fireEvent.change(screen.getByLabelText(/Recipient Phone:/i), {
      target: { value: "0987654321" },
    });
    fireEvent.change(screen.getByLabelText(/Description:/i), {
      target: { value: "New Description" },
    });
    fireEvent.change(screen.getByLabelText(/Origin:/i), {
      target: { value: "New Origin" },
    });
    fireEvent.change(screen.getByLabelText(/Destination:/i), {
      target: { value: "New Destination" },
    });
    fireEvent.change(screen.getByLabelText(/ETA:/i), {
      target: { value: "2023-12-31T23:59" },
    });

    fireEvent.submit(screen.getByRole("button", { name: /Add Product/i }));

    expect(mockAddProduct).toHaveBeenCalledWith(
      expect.objectContaining({
        title: "New Product",
        recipient: "Jane Doe",
        recipientPhone: "0987654321",
        description: "New Description",
        origin: "New Origin",
        destination: "New Destination",
        eta: new Date("2023-12-31T23:59").getTime(),
      })
    );
  });

  it("edits a product", () => {
    render(<Dashboard />);

    fireEvent.click(screen.getAllByText("Edit")[0]);

    fireEvent.change(screen.getByLabelText(/Title:/i), {
      target: { value: "Updated Product" },
    });
    fireEvent.submit(screen.getByRole("button", { name: /Update Product/i }));

    expect(mockUpdateProduct).toHaveBeenCalledWith(
      "1",
      expect.objectContaining({
        id: "1",
        title: "Updated Product",
      })
    );
  });

  it("deletes a product", () => {
    render(<Dashboard />);

    fireEvent.click(screen.getAllByText("Delete")[0]);

    expect(mockDeleteProduct).toHaveBeenCalledWith("1");
  });

  it("handles pagination", () => {
    render(<Dashboard />);

    fireEvent.click(screen.getByText("Next"));
    expect(screen.getByText("Previous")).not.toBeDisabled();

    fireEvent.click(screen.getByText("Previous"));
    expect(screen.getByText("Previous")).toBeDisabled();
  });
});
