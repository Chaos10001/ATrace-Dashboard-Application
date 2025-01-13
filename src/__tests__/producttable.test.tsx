import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import ProductTable from "@/components/ProductTable";
import { Product } from "@/lib/store";
import "@testing-library/jest-dom";

describe("ProductTable", () => {
  const mockOnEdit = jest.fn();
  const mockOnDelete = jest.fn();

  const mockProducts: Product[] = [
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
  ];

  beforeEach(() => {
    mockOnEdit.mockClear();
    mockOnDelete.mockClear();
  });

  it("renders the table with products", () => {
    render(
      <ProductTable
        products={mockProducts}
        onEdit={mockOnEdit}
        onDelete={mockOnDelete}
      />
    );

    expect(screen.getAllByText("Test Product 1")).toHaveLength(2);
    expect(screen.getAllByText("Test Product 2")).toHaveLength(2);
  });

  it("calls onEdit when edit button is clicked", () => {
    render(
      <ProductTable
        products={mockProducts}
        onEdit={mockOnEdit}
        onDelete={mockOnDelete}
      />
    );

    fireEvent.click(screen.getAllByText("Edit")[0]);
    expect(mockOnEdit).toHaveBeenCalledWith(mockProducts[0]);
  });

  it("calls onDelete when delete button is clicked", () => {
    render(
      <ProductTable
        products={mockProducts}
        onEdit={mockOnEdit}
        onDelete={mockOnDelete}
      />
    );

    fireEvent.click(screen.getAllByText("Delete")[0]);
    expect(mockOnDelete).toHaveBeenCalledWith(mockProducts[0].id);
  });

  it("renders the mobile view with products", () => {
    render(
      <ProductTable
        products={mockProducts}
        onEdit={mockOnEdit}
        onDelete={mockOnDelete}
      />
    );

    global.innerWidth = 500;
    global.dispatchEvent(new Event("resize"));

    expect(screen.getAllByText("Test Product 1")).toHaveLength(2);
    expect(screen.getAllByText("Test Product 2")).toHaveLength(2);
  });
});
