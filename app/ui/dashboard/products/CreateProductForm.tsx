"use client";
import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { FaPlus } from "react-icons/fa6";
import AddFeature from "./AddFeature";
import Input from "../../input/Input";
import Label from "../../label/Label";
import axios from "axios";
import Image from "next/image";
import { toast } from "sonner";
import { FormType } from "@/lib/definations";
import { ImageSkeleton } from "@/app/ui/skeletons";

const CreateProductForm = () => {
  const [addFeature, setAddFeature] = useState<string>("");
  const [createProduct, setCreateProduct] = useState(false);
  const [dragActive, setDragActive] = useState(false);

  const router = useRouter();
  const colorInputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const [formData, setFormData] = useState<FormType>({
    title: "",
    description: "",
    collection: "",
    brand: "",
    feature: [],
    variants: [
      {
        sku: "",
        modelNumber: "",
        capacity: "",
        power: "",
        color: "",
        originalPrice: 0,
        sellingPrice: 0,
        stock: 0,
        images: [],
        length: 0,
        breadth: 0,
        height: 0,
        weight: 0,
      },
    ],
  });

  const isUploading = formData.variants.some((v) =>
    v.images.some((img) => img.loading),
  );

  const uploadVariantImage = async (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number,
  ) => {
    const files = e.target.files;
    if (!files) return;

    const filesArray = Array.from(files);

    const updated = [...formData.variants];

    // 👉 preview + loading add
    const newImages = filesArray.map((file) => ({
      preview: URL.createObjectURL(file),
      loading: true,
      url: "",
    }));

    updated[index].images.push(...newImages);
    setFormData({ ...formData, variants: updated });

    // 👉 upload start
    filesArray.forEach(async (file, i) => {
      try {
        const fd = new FormData();
        fd.append("file", file);

        const res = await fetch("/api/upload", {
          method: "POST",
          body: fd,
        });

        const data = await res.json();

        setFormData((prev) => {
          const updatedVariants = [...prev.variants];

          const img =
            updatedVariants[index].images[
              updatedVariants[index].images.length - filesArray.length + i
            ];

          img.url = data.url;
          img.loading = false;
          URL.revokeObjectURL(img.preview);

          return { ...prev, variants: updatedVariants };
        });
      } catch (err) {
        setFormData((prev) => {
          const updatedVariants = [...prev.variants];

          const img =
            updatedVariants[index].images[
              updatedVariants[index].images.length - filesArray.length + i
            ];

          img.loading = false;
          img.error = true; // optional

          return { ...prev, variants: updatedVariants };
        });

        toast.error("Upload failed");
      }
    });
  };

  const handleSubmit: React.MouseEventHandler<HTMLButtonElement> = async (
    e,
  ) => {
    e.preventDefault();

    try {
      setCreateProduct(true);
      const invalid = formData.variants.some(
        (v) => !v.sku || v.sellingPrice <= 0,
      );

      if (invalid) {
        toast.error("Fill all variant required fields");
        setCreateProduct(false);
        return;
      }
      const cleanVariants = formData.variants.map((v) => ({
        ...v,
        images: v.images
          .filter((img) => img.url && !img.loading) // ✅ FIX
          .map((img) => img.url),
      }));

      const finalData = {
        ...formData,
        variants: cleanVariants,
      };
      
      const response = await axios.post("/api/products/addProduct", finalData);

      if (response) {
        router.push("/dashboard/products");
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
    const { name, value, type } = e.target;

    setFormData({
      ...formData,
      [name]: type === "number" ? Number(value) : value,
    });
  };

  const handleColllection = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleBrand = (e: React.ChangeEvent<HTMLSelectElement>) => {
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

  const handleVariantChange = (index: number, field: string, value: any) => {
    const updated = [...formData.variants];
    updated[index][field] = value;

    setFormData({
      ...formData,
      variants: updated,
    });
  };

  const handleVariantDimensionChange = (
    index: number,
    field: string,
    value: number,
  ) => {
    const updated = [...formData.variants];
    updated[index][field] = value;

    setFormData({
      ...formData,
      variants: updated,
    });
  };

  const addVariant = () => {
    setFormData({
      ...formData,
      variants: [
        ...formData.variants,
        {
          sku: "",
          modelNumber: "",
          capacity: "",
          power: "",
          color: "",
          originalPrice: 0,
          sellingPrice: 0,
          stock: 0,
          images: [],
          length: 0,
          breadth: 0,
          height: 0,
          weight: 0,
        },
      ],
    });
  };

  const removeVariant = (index: number) => {
    const updated = formData.variants.filter((_, i) => i !== index);
    setFormData({
      ...formData,
      variants: updated,
    });
  };

  return (
    <div className="max-w-full mx-auto bg-white p-6 rounded-lg shadow-md mt-4 bg-bga">
      <h1 className="text-2xl font-bold mb-6 text-blue text-center">
        Make Your Product's
      </h1>

      <div className="grid grid-cols-2 max-sm:grid-cols-1 gap-4">
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

      <div className="grid grid-cols-4 max-sm:grid-cols-2 gap-4 mt-4">
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
            <option value="Washing-Machine">Washing Machine</option>
          </select>
        </div>
        <div className="col-span-1">
          <Label htmlFor="brand" title="Brand" />
          <select
            name="brand"
            id="brand"
            value={formData?.brand}
            onChange={handleBrand}
            className="w-full py-1 px-4 border border-green-200 bg-white rounded-sm outline-none  focus:border-green-400 text-sm text-green-900 cursor-pointer"
          >
            <option value="">Brand's</option>
            <option value="Refrigerator">ORA</option>
            <option value="Mill">DICH</option>
            <option value="Washing">KEO</option>
          </select>
        </div>
        <div className="relative col-span-2">
          <Label htmlFor="feature" title="Features" />
          <Input
            type="text"
            name="feature"
            placeholder="Write your product feature"
            id="feature"
            value={addFeature}
            onChange={(e) => setAddFeature(e.target.value)}
          />
          <button
            className="absolute right-0 top-6 bg-bgg text-white px-4 py-[2.5px] flex gap-2 justify-center items-center"
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

      {/* ✅ CAPACITY VARIANTS */}

      <div className="mt-8 relative">
        <p className="text-blue font-[20px] font-bold pb-4">Varients</p>
        {formData.variants.map((v, index) => (
          <>
          <div
            key={index}
            className="grid grid-rows-2 grid-cols-6 max-lg:grid-cols-4 max-md:grid-cols-3 max-sm:grid-cols-2 gap-2 mb-2"
          >
            <div className="col-span-1">
              <Label htmlFor="modelNumber" title="Model Number" />
              <Input
                name="modelNumber"
                placeholder="Model Number"
                value={v.modelNumber}
                onChange={(e) =>
                  handleVariantChange(index, "modelNumber", e.target.value)
                }
              />
            </div>
            <div className="col-span-1">
              <Label htmlFor="sku" title="SKU" />
              <Input
                name="sku"
                id="sku"
                placeholder="Stock Keeping Unit"
                value={v.sku}
                onChange={(e) =>
                  handleVariantChange(index, "sku", e.target.value)
                }
              />
            </div>

            <div className="col-span-1">
              <Label htmlFor="stock" title={"Stock Quantity"} />
              <Input
                type="number"
                name="stock"
                id="stock"
                placeholder="How many stock you have"
                value={v?.stock}
                onChange={(e) =>
                  handleVariantChange(index, "stock", Number(e.target.value))
                }
              />
            </div>
            <div className="col-span-1">
              <Label htmlFor="sprice" title={"Selling Price ( ₹ )"} />
              <Input
                type="number"
                id="sprice"
                name="sellingPrice"
                placeholder="Selling Price"
                value={v.sellingPrice}
                onChange={(e) =>
                  handleVariantChange(
                    index,
                    "sellingPrice",
                    Number(e.target.value),
                  )
                }
              />
            </div>
            <div className="col-span-1">
              <Label htmlFor="oprice" title={"Origial Price ( ₹ )"} />
              <Input
                type="number"
                id="oprice"
                name="originalPrice"
                placeholder="Original Price"
                value={v.originalPrice}
                onChange={(e) =>
                  handleVariantChange(
                    index,
                    "originalPrice",
                    Number(e.target.value),
                  )
                }
              />
            </div>

            <div className="colorr">
              {/* Hidden Color Picker */}
              <Label htmlFor="color" title={"choose Color"} />
              <div className="relative">
                <input
                  id="color"
                  type="color"
                  value={v.color || "#000000"}
                  ref={(el) => {
                    colorInputRefs.current[index] = el;
                  }}
                  onChange={(e) =>
                    handleVariantChange(index, "color", e.target.value)
                  }
                  className="hborder rounded cursor-pointer p-0 absolute top-0 left-0"
                />

                {/* Clickable Input */}

                <input
                  type="text"
                  value={v.color || "#000000"}
                  readOnly
                  onClick={() => colorInputRefs.current[index]?.click()}
                  className="border-0 px-2 py-1 text-white rounded w-[120px] cursor-pointer"
                />

                {/* Preview */}
                <div
                  onClick={() => colorInputRefs.current[index]?.click()}
                  className="w-full h-full rounded z-8 border cursor-pointer absolute top-0 right-0"
                  style={{ backgroundColor: v.color || "#000000" }}
                ></div>
              </div>
            </div>

            <div>
              <Label htmlFor="capacity" title="Capacity" />
              <Input
                id="capacity"
                placeholder="Capacity"
                value={v.capacity}
                onChange={(e) =>
                  handleVariantChange(index, "capacity", e.target.value)
                }
              />
            </div>
            <div>
              <Label htmlFor="power" title="Power" />
              <Input
                id="power"
                placeholder="Power"
                value={v.power}
                onChange={(e) =>
                  handleVariantChange(index, "power", e.target.value)
                }
              />
            </div>

            <div className="col-span-1">
              <Label htmlFor="length" title="Length (Depth)" />
              <Input
                type="number"
                name="length"
                id="length"
                placeholder="length"
                value={v.length}
                onChange={(e) =>
                  handleVariantDimensionChange(
                    index,
                    "length",
                    Number(e.target.value),
                  )
                }
              />
            </div>
            <div className="col-span-1">
              <Label htmlFor="breadth" title="Breadth (Width)" />
              <Input
                type="number"
                name="breadth"
                id="breadth"
                placeholder="breadth"
                value={v.breadth}
                onChange={(e) =>
                  handleVariantDimensionChange(
                    index,
                    "breadth",
                    Number(e.target.value),
                  )
                }
              />
            </div>
            <div className="col-span-1">
              <Label htmlFor="height" title="Height" />
              <Input
                type="number"
                name="height"
                id="height"
                placeholder="height"
                value={v.height}
                onChange={(e) =>
                  handleVariantDimensionChange(
                    index,
                    "height",
                    Number(e.target.value),
                  )
                }
              />
            </div>
            <div className="col-span-1">
              <Label htmlFor="weight" title="Weight (KG's)" />
              <Input
                type="number"
                name="weight"
                id="weight"
                placeholder="weight"
                value={v.weight}
                onChange={(e) =>
                  handleVariantDimensionChange(
                    index,
                    "weight",
                    Number(e.target.value),
                  )
                }
              />
            </div>
            <div className="absolute top-0 right-0">
              <button
                onClick={() => removeVariant(index)}
                className="bg-red-500 text-white px-2"
              >
                X
              </button>
            </div>
          </div>
          <div
              className={`mt-4 row-span-1 col-span-6 max-lg:col-span-4 max-sm:grid-cols-2 w-full min-h-[200px] border-2 border-dashed border-green rounded-lg flex flex-col items-center justify-center cursor-pointer relative overflow-hidden ${
                dragActive ? "border-blue-500 bg-blue-50" : "border-green-400"
              }`}
              onDragOver={(e) => e.preventDefault()}
              onDragEnter={() => setDragActive(true)}
              onDragLeave={() => setDragActive(false)}
              onDrop={(e) => {
                e.preventDefault();
                setDragActive(false);

                const files = e.dataTransfer.files;
                if (files) {
                  uploadVariantImage(
                    {
                      target: { files },
                    } as React.ChangeEvent<HTMLInputElement>,
                    index,
                  );
                }
              }}
              onClick={() => document.getElementById(`file-${index}`)?.click()}
            >
              {/* Hidden Input */}
              <input
                id={`file-${index}`}
                type="file"
                multiple
                className="hidden"
                onChange={(e) => uploadVariantImage(e, index)}
              />

              {/* 📦 Empty State */}
              {v.images.length === 0 && (
                <div className="text-center text-gray-500">
                  <p className="text-sm">Drag & Drop Images Here</p>
                  <p className="text-xs">or Click to Upload</p>
                </div>
              )}

              {/* 🖼️ Image Preview */}
              <div className="flex justify-start gap-3 p-3 w-full">
                {v.images.map((img, i) => (
                  <div
                    key={i}
                    className="relative w-[100px] bg-white h-[100px] rounded overflow-hidden"
                  >
                    <button
                      onClick={(e) => {
                        e.stopPropagation();

                        const updated = [...formData.variants];
                        updated[index].images.splice(i, 1);

                        setFormData({
                          ...formData,
                          variants: updated,
                        });
                      }}
                      className="absolute top-1 right-1 bg-red-500 text-white text-xs px-1 rounded z-10"
                    >
                      X
                    </button>
                    {img.loading ? (
                      <ImageSkeleton />
                    ) : (
                      <Image
                        src={img.url || img.preview}
                        alt="variant"
                        fill
                        className="object-cover"
                        unoptimized
                      />
                    )}
                  </div>
                ))}
              </div>
            </div>

          </>
        ))}

        <button
          onClick={addVariant}
          className="bg-bgg text-white rounded-[10px] px-3 py-1 mt-2"
        >
          + Add Variant
        </button>
      </div>

      <div className="mt-4">
        <button
          onClick={handleSubmit}
          className="w-full bg-bgg text-white px-4 py-2 rounded-md hover:bg-green-700 transition disabled:opacity-50"
          disabled={createProduct || isUploading}
        >
          {createProduct
            ? "Submitting..."
            : isUploading
              ? "Uploading Images..."
              : "Create Product"}
        </button>
      </div>
    </div>
  );
};

export default CreateProductForm;
