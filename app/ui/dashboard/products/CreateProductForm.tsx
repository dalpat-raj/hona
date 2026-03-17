"use client";
import { useState } from "react";
import { FaPlus } from "react-icons/fa6";
import AddFeature from "./AddFeature";
import Input from "../../input/Input";
import Label from "../../label/Label";
import axios from "axios";
import Image from "next/image";
import { toast } from "sonner";
import { ImageItem } from "@/lib/definations";

const CreateProductForm = () => {
  const [addFeature, setAddFeature] = useState<string>("");
  const [imagesShow, setImagesShow] = useState<ImageItem[]>([]);
  const [createProduct, setCreateProduct] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    modelNumber: "",
    stock: 0,
    originalPrice: 0,
    sellingPrice: 0,
    collection: "",
    dimension: {
      width: 0,
      height: 0,
      dept: 0,
    },
    feature: [],
    images: [],
  });

  const uploadImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    for (const file of Array.from(files)) {
      if (!file.type.startsWith("image/")) {
        toast.error("Only image files allowed");
        continue;
      }

      const preview = URL.createObjectURL(file);

      const tempIndex = imagesShow.length;

      // preview add karo with loading
      setImagesShow((prev) => [...prev, { preview, loading: true }]);

      try {
        const formDataData = new FormData();
        formDataData.append("file", file);

        const res = await fetch("/api/upload", {
          method: "POST",
          body: formDataData,
        });

        const data = await res.json();

        if (!res.ok) {
          throw new Error(data.message);
        }

        const imageUrl = data?.url;

        // loading false karo
        setImagesShow((prev) => {
          const updated = [...prev];
          updated[tempIndex] = {
            preview,
            url: imageUrl,
            loading: false,
          };
          return updated;
        });

        setFormData((prev) => ({
          ...prev,
          images: [...prev.images, imageUrl],
        }));
      } catch (error: any) {
        toast.error(error.message);
      }
    }
  };

  const handleSubmit: React.MouseEventHandler<HTMLButtonElement> = async (
    e,
  ) => {
    e.preventDefault();

    try {
      setCreateProduct(true);

      const response = await axios.post("/api/products/addProduct", formData);
      if (response) {
        // router.push('/dashboard/products')
        console.log(response);
      } else {
        toast.error("Failed to create product");
      }
    } catch (error: any) {
      toast.error(error?.response?.data?.message);
    } finally {
      setCreateProduct(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleColllection = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFeature: React.MouseEventHandler<HTMLButtonElement> = () => {
    if (addFeature.trim() === "") {
      toast.error("Feature cannot be empty");
      return; // Prevent adding an empty feature
    }

    setFormData((prevFormData) => ({
      ...prevFormData,
      feature: [...prevFormData.feature, addFeature],
    }));

    setAddFeature("");
  };

  return (
    <div className="max-w-full mx-auto bg-white p-6 rounded-lg shadow-md mt-4">
      <h1 className="text-2xl font-bold mb-6 text-green-900 text-center">
        Make Your Product's
      </h1>

      <div className="grid grid-cols-2 gap-4">
        <div className="col-span-1">
          <Label htmlFor="title" title="Name" />
          <Input
            type="text"
            name="title"
            id="name"
            placeholder="Enter case name"
            value={formData?.title}
            onChange={handleChange}
          />
        </div>

        <div className="col-span-1">
          <Label htmlFor="description" title="Description" />
          <Input
            name="description"
            id="description"
            placeholder="Enter case description"
            value={formData?.description}
            onChange={handleChange}
          />
        </div>
      </div>

      <div className="grid grid-cols-5 gap-4 mt-4">
        <div className="col-span-1">
          <Label htmlFor="modelNumber" title="Model Number" />
          <Input
            type="text"
            name="modelNumber"
            id="modelNumber"
            placeholder="Model Number"
            value={formData?.modelNumber}
            onChange={handleChange}
          />
        </div>
        <div className="col-span-1">
          <Label htmlFor="sku" title="SKU" />
          <Input
            type="number"
            name="sku"
            id="sku"
            placeholder="Stock Keeping Unit"
            value={formData?.modelNumber}
            onChange={handleChange}
          />
        </div>

        <div className="col-span-1">
          <Label htmlFor="stock" title={"Stock Quantity"} />
          <Input
            type="number"
            name="stock"
            id="stock"
            placeholder="How many stock you have"
            value={formData?.stock}
            onChange={handleChange}
          />
        </div>
        <div className="col-span-1">
          <Label htmlFor="originalPrice" title="Original Price" />
          <Input
            type="number"
            name="originalPrice"
            id="originalPrice"
            placeholder="original price"
            value={formData?.originalPrice}
            onChange={handleChange}
          />
        </div>
        <div className="col-span-1">
          <Label htmlFor="sellingPrice" title="Selling Price" />
          <Input
            type="number"
            name="sellingPrice"
            id="sellingPrice"
            placeholder="selling price"
            value={formData?.sellingPrice}
            onChange={handleChange}
          />
        </div>
      </div>

      <div className="grid grid-cols-4 gap-4 mt-4">
        <div className="col-span-1">
          <Label htmlFor="collection" title="Collections" />
          <select
            name="collection"
            id="collection"
            value={formData?.collection}
            onChange={handleColllection}
            className="w-full py-1 px-4 border border-green-200 bg-white rounded-sm outline-none  focus:border-green-400 text-sm text-green-900 cursor-pointer"
          >
            <option value="">Collections</option>
            <option value="Refrigerator">Refrigerator</option>
            <option value="Mill">Mill</option>
            <option value="Washing">Washing Machine</option>
          </select>
        </div>
        <div className="col-span-1">
          <Label htmlFor="width" title="Width" />
          <Input
            type="text"
            name="width"
            id="width"
            placeholder="width"
            value={formData?.dimension?.width}
            onChange={handleChange}
          />
        </div>
        <div className="col-span-1">
          <Label htmlFor="height" title="Height" />
          <Input
            type="text"
            name="height"
            id="width"
            placeholder="height"
            value={formData?.dimension?.height}
            onChange={handleChange}
          />
        </div>
        <div className="col-span-1">
          <Label htmlFor="dept" title="Dept" />
          <Input
            type="text"
            name="dept"
            id="dept"
            placeholder="dept"
            value={formData?.dimension?.dept}
            onChange={handleChange}
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 mt-4">
        {/* <div>
          <Label htmlFor="color" title="Color" />
          <Input
            type="text"
            name="color"
            value={formData?.color}
            onChange={handleChange}
          />
        </div> */}
        <div className="relative">
          <Label htmlFor="feature" title="Features" />
          <Input
            type="text"
            name="feature"
            id="feature"
            value={addFeature}
            onChange={(e) => setAddFeature(e.target.value)}
          />
          <button
            className="absolute right-0 top-6 bg-green-400 text-white px-4 py-[2.5px] rounded-lg flex gap-2 justify-center items-center"
            onClick={handleFeature}
          >
            <FaPlus size={15} />
            Add
          </button>
          <div>
            <AddFeature formData={formData} />
          </div>
        </div>
      </div>

      {imagesShow?.length >= 1 ? (
        <div className="flex gap-4 flex-wrap mt-4">
          {imagesShow?.map((img, i) => (
            <div key={i} className="relative w-[100px] h-[100px]">
              {img?.loading && (
                <div className="absolute inset-0 flex items-center justify-center bg-white/70">
                  <p>Spinner</p>
                </div>
              )}

              <Image
                src={img?.preview}
                alt="product"
                fill
                className="object-cover rounded"
                unoptimized
              />
            </div>
          ))}
        </div>
      ) : uploading ? (
        <div className="w-full flex items-center justify-center my-2">
          <button className="m-auto px-4 py-1 rounded-lg bg-green-400 text-white text-sm">
            ...Uploading
          </button>
        </div>
      ) : (
        <div className="mt-4">
          <input type="file" multiple onChange={uploadImage} />
        </div>
      )}

      <div className="mt-4">
        <button
          onClick={handleSubmit}
          className="w-full bg-green-400 text-white px-4 py-2 rounded-md hover:bg-green-700 transition"
          disabled={createProduct}
        >
          {createProduct ? "Submitting..." : "Create Product"}
        </button>
      </div>
    </div>
  );
};

export default CreateProductForm;
