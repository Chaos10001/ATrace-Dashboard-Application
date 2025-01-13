import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import ProductForm from "@/components/ProductForm";
import { Product } from "@/lib/store";
import "@testing-library/jest-dom";

describe("ProductForm", () => {
  const mockOnSubmit = jest.fn();

  const mockProduct: Product = {
    id: "1",
    title: "Test Product",
    status: "Pending",
    description: "Test Description",
    recipient: "John Doe",
    recipientPhone: "1234567890",
    origin: "Origin Address",
    destination: "Destination Address",
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
  };

  beforeEach(() => {
    mockOnSubmit.mockClear();
  });

  it("renders the form with initial data", () => {
    render(<ProductForm onSubmit={mockOnSubmit} initialData={mockProduct} />);

    expect(screen.getByLabelText(/Title:/i)).toHaveValue(mockProduct.title);
    expect(screen.getByLabelText(/Recipient:/i)).toHaveValue(
      mockProduct.recipient
    );
    expect(screen.getByLabelText(/Recipient Phone:/i)).toHaveValue(
      mockProduct.recipientPhone
    );
    expect(screen.getByLabelText(/Description:/i)).toHaveValue(
      mockProduct.description
    );
    expect(screen.getByLabelText(/Origin:/i)).toHaveValue(mockProduct.origin);
    expect(screen.getByLabelText(/Destination:/i)).toHaveValue(
      mockProduct.destination
    );
  });

  it("submits the form with updated data", () => {
    render(<ProductForm onSubmit={mockOnSubmit} initialData={mockProduct} />);

    fireEvent.change(screen.getByLabelText(/Title:/i), {
      target: { value: "Updated Product" },
    });
    fireEvent.submit(screen.getByRole("button", { name: /Update Product/i }));

    expect(mockOnSubmit).toHaveBeenCalledWith({
      ...mockProduct,
      title: "Updated Product",
    });
  });

  it("adds a new package", () => {
    render(<ProductForm onSubmit={mockOnSubmit} initialData={mockProduct} />);

    fireEvent.click(screen.getByRole("button", { name: /Add Package/i }));

    expect(screen.getAllByPlaceholderText(/Name/i)).toHaveLength(2);
  });

  it("submits the form with new data", () => {
    render(<ProductForm onSubmit={mockOnSubmit} />);

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

    expect(mockOnSubmit).toHaveBeenCalledWith(
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
});
