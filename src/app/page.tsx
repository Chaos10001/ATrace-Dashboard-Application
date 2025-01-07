"use client";
import React, { useEffect, useState } from "react";
import { useStore, Product } from "@/lib/store";
import ProductForm from "@/components/ProductForm";
import ProductTable from "@/components/ProductTable";

interface ProductsByStatus {
  pending: number;
  delivered: number;
  cancelled: number;
}

const Dashboard: React.FC = () => {
  const { products, addProduct, updateProduct, deleteProduct } = useStore();
  const [statusCounts, setStatusCounts] = useState<ProductsByStatus>({
    pending: 0,
    delivered: 0,
    cancelled: 0,
  });
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 5;

  const paginatedProducts = products.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  useEffect(() => {
    const counts = products.reduce(
      (acc, product) => {
        acc[product.status.toLowerCase() as keyof ProductsByStatus] += 1;
        return acc;
      },
      { pending: 0, delivered: 0, cancelled: 0 }
    );
    setStatusCounts(counts);
  }, [products]);

  const handleSubmit = (product: Product) => {
    if (editingProduct) {
      updateProduct(product.id, product);
      setEditingProduct(null);
    } else {
      addProduct(product);
    }
  };

  const handleEdit = (product: Product) => {
    setEditingProduct(product);
  };

  const handleNextPage = () => {
    if (currentPage * pageSize < products.length) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  return (
    <div className="p-4 max-w-7xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div className="p-4 bg-blue-100 rounded-lg">
          Total Products: {products.length}
        </div>
        <div className="p-4 bg-green-100 rounded-lg flex flex-row gap-x-5">
          <div>Pending: {statusCounts.pending}</div>
          <div>Delivered: {statusCounts.delivered}</div>
          <div>Cancelled: {statusCounts.cancelled}</div>
        </div>
      </div>
      <ProductForm onSubmit={handleSubmit} initialData={editingProduct} />
      {/* <ProductForm
        initialData={editingProduct} // Pass product to edit
        onSubmit={(product) => {
          if (editingProduct) {
            useStore.getState().updateProduct(editingProduct.id, product); // Update product
          } else {
            useStore.getState().addProduct(product); // Add new product
          }
        }}
      /> */}
      <ProductTable
        products={paginatedProducts}
        onEdit={handleEdit}
        onDelete={deleteProduct}
      />
      <div className="flex justify-between mt-4">
        <button
          onClick={handlePreviousPage}
          disabled={currentPage === 1}
          className="bg-gray-300 px-4 py-2 rounded disabled:opacity-50"
        >
          Previous
        </button>
        <button
          onClick={handleNextPage}
          disabled={currentPage * pageSize >= products.length}
          className="bg-gray-300 px-4 py-2 rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Dashboard;
