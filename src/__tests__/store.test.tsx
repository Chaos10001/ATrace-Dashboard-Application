import { useStore } from "@/lib/store";
import { expect, describe, it, beforeEach } from "@jest/globals";
import { act } from "@testing-library/react";

describe("useStore", () => {
  beforeEach(() => {
    useStore.setState({ products: [] });
  });

  const mockProduct = {
    id: "1",
    title: "Test Product",
    status: "Pending" as "Pending",
    description: "Test Description",
    recipient: "John Doe",
    recipientPhone: "1234567890",
    origin: "Origin Address",
    destination: "Destination Address",
    eta: 1234567890,
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

  it("should add a product", () => {
    act(() => {
      useStore.getState().addProduct(mockProduct);
    });
    const products = useStore.getState().products;
    expect(products).toHaveLength(1);
    expect(products[0]).toEqual(mockProduct);
  });

  it("should update a product", () => {
    act(() => {
      useStore.getState().addProduct(mockProduct);
      useStore
        .getState()
        .updateProduct(mockProduct.id, { title: "Updated Product" });
    });
    const products = useStore.getState().products;
    expect(products[0].title).toBe("Updated Product");
  });

  it("should delete a product", () => {
    act(() => {
      useStore.getState().addProduct(mockProduct);
      useStore.getState().deleteProduct(mockProduct.id);
    });
    const products = useStore.getState().products;
    expect(products).toHaveLength(0);
  });
});
