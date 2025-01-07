"use client";
import React from "react";
import { Product } from "@/lib/store";

interface ProductTableProps {
  products: Product[];
  onEdit: (product: Product) => void;
  onDelete: (id: string) => void;
}

const formatETA = (eta: number) => {
  const date = new Date(eta);
  return date.toLocaleString();
};

const ProductTable: React.FC<ProductTableProps> = ({
  onEdit,
  onDelete,
  products,
}) => {
  return (
    <div className="mt-[6rem]">
      <table className="table-auto w-full border border-collapse hidden md:table">
        <thead>
          <tr>
            <th className="border px-4 py-2">Product ID</th>
            <th className="border px-4 py-2">Title</th>
            <th className="border px-4 py-2">Description</th>
            <th className="border px-4 py-2">Status</th>
            <th className="border px-4 py-2">ETA</th>
            <th className="border px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.id}>
              <td className="border px-4 py-2">{product.id}</td>
              <td className="border px-4 py-2">{product.title}</td>
              <td className="border px-4 py-2">{product.description}</td>
              <td className="border px-4 py-2">{product.status}</td>
              <td className="border px-4 py-2">{formatETA(product.eta)}</td>
              <td className="border py-2 space-x-7">
                <button
                  onClick={() => onEdit(product)}
                  className="text-blue-500"
                >
                  Edit
                </button>
                <button
                  onClick={() => onDelete(product.id)}
                  className="text-red-500"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Mobile View */}
      <div className="block md:hidden">
        {products.map((product) => (
          <div
            key={product.id}
            className="border p-4 mb-4 rounded shadow-md bg-white"
          >
            <p>
              <strong>Product ID:</strong> {product.id}
            </p>
            <p>
              <strong>Title:</strong> {product.title}
            </p>
            <p>
              <strong>Status:</strong> {product.status}
            </p>
            <p>
              <strong>ETA:</strong> {formatETA(product.eta)}
            </p>
            <div className="flex space-x-4 mt-2">
              <button onClick={() => onEdit(product)} className="text-blue-500">
                Edit
              </button>
              <button
                onClick={() => onDelete(product.id)}
                className="text-red-500"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductTable;
