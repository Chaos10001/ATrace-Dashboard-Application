import React, { useEffect, useState } from "react";
import { Product } from "@/lib/store";

interface ProductFormProps {
  onSubmit: (product: Product) => void;
  initialData?: Product | null;
}

const ProductForm: React.FC<ProductFormProps> = ({ onSubmit, initialData }) => {
  const [formData, setFormData] = useState<Product>({
    id: "",
    title: "",
    status: "Pending",
    description: "",
    recipient: "",
    recipientPhone: "",
    origin: "",
    destination: "",
    eta: Date.now(),
    packages: [],
  });

  const resetForm = () => {
    setFormData({
      id: "",
      title: "",
      status: "Pending",
      description: "",
      recipient: "",
      recipientPhone: "",
      origin: "",
      destination: "",
      eta: Date.now(),
      packages: [],
    });
  };

  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    } else {
      resetForm();
    }
  }, [initialData]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handlePackageChange = (
    index: number,
    key: string,
    value: string | number
  ) => {
    const updatedPackages = formData.packages.map((pkg, i) =>
      i === index ? { ...pkg, [key]: value } : pkg
    );
    setFormData({ ...formData, packages: updatedPackages });
  };

  const addPackage = () => {
    setFormData({
      ...formData,
      packages: [
        ...formData.packages,
        {
          name: "",
          weight: 0,
          weightUnit: "kg",
          quantity: 0,
          quantityUnit: "pcs",
        },
      ],
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (initialData) {
      onSubmit(formData);
    } else {
      onSubmit({ ...formData, id: String(Date.now()) });
    }
    resetForm();
  };

  return (
    <div className="mb-4">
      <form
        onSubmit={handleSubmit}
        className="mb-2 grid grid-cols-1 lg:grid-cols-2 gap-4"
      >
        <div className="mb-2">
          <label htmlFor="title" className="block text-gray-700">
            Title:
          </label>
          <input
            required
            type="text"
            name="title"
            id="title"
            value={formData.title}
            onChange={handleInputChange}
            className="border p-2 w-full"
          />
        </div>
        <div className="mb-2">
          <label htmlFor="recipient" className="block text-gray-700">
            Recipient:
          </label>
          <input
            required
            type="text"
            name="recipient"
            id="recipient"
            value={formData.recipient}
            onChange={handleInputChange}
            className="border p-2 w-full"
          />
        </div>
        <div className="mb-2">
          <label htmlFor="recipientPhone" className="block text-gray-700">
            Recipient Phone:
          </label>
          <input
            required
            type="text"
            name="recipientPhone"
            id="recipientPhone"
            value={formData.recipientPhone}
            onChange={handleInputChange}
            className="border p-2 w-full"
          />
        </div>
        <div className="mb-2">
          <label htmlFor="description" className="block text-gray-700">
            Description:
          </label>
          <input
            required
            type="text"
            name="description"
            id="description"
            value={formData.description}
            onChange={handleInputChange}
            className="border p-2 w-full"
          />
        </div>
        <div className="mb-2">
          <label htmlFor="origin" className="block text-gray-700">
            Origin:
          </label>
          <input
            required
            type="text"
            name="origin"
            id="origin"
            value={formData.origin}
            onChange={handleInputChange}
            className="border p-2 w-full"
          />
        </div>
        <div className="mb-2">
          <label htmlFor="destination" className="block text-gray-700">
            Destination:
          </label>
          <input
            required
            type="text"
            name="destination"
            id="destination"
            value={formData.destination}
            onChange={handleInputChange}
            className="border p-2 w-full"
          />
        </div>
        <div className="mb-2">
          <label htmlFor="eta" className="block text-gray-700">
            ETA:
          </label>
          <input
            required
            type="datetime-local"
            name="eta"
            id="eta"
            onChange={(e) =>
              setFormData({
                ...formData,
                eta: new Date(e.target.value).getTime(),
              })
            }
            className="border p-2 w-full"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Packages:</label>
          {formData.packages.map((pkg, index) => (
            <div key={index} className="mb-2 border p-2">
              <input
                required
                type="text"
                placeholder="Name"
                value={pkg.name}
                onChange={(e) =>
                  handlePackageChange(index, "name", e.target.value)
                }
                className="border p-2 mr-2"
              />
              <input
                required
                type="number"
                placeholder="Weight"
                value={pkg.weight}
                onChange={(e) =>
                  handlePackageChange(
                    index,
                    "weight",
                    parseFloat(e.target.value)
                  )
                }
                className="border p-2 mr-2"
              />
              <select
                value={pkg.weightUnit}
                onChange={(e) =>
                  handlePackageChange(index, "weightUnit", e.target.value)
                }
                className="border p-2 mr-2"
              >
                <option value="kg">kg</option>
                <option value="lbs">lbs</option>
              </select>
              <input
                required
                type="number"
                placeholder="Quantity"
                value={pkg.quantity}
                onChange={(e) =>
                  handlePackageChange(
                    index,
                    "quantity",
                    parseFloat(e.target.value)
                  )
                }
                className="border p-2 mr-2"
              />
              <select
                value={pkg.quantityUnit}
                onChange={(e) =>
                  handlePackageChange(index, "quantityUnit", e.target.value)
                }
                className="border p-2"
              >
                <option value="pcs">pcs</option>
                <option value="boxes">boxes</option>
              </select>
            </div>
          ))}
          <button
            type="button"
            onClick={addPackage}
            className="bg-green-500 text-white px-4 py-2 mt-2"
          >
            Add Package
          </button>
        </div>
        <div className="col-span-2 text-center items-center justify-center mx-auto">
          <button type="submit" className="bg-blue-500 text-white px-4 py-2">
            {initialData ? "Update Product" : "Add Product"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProductForm;
