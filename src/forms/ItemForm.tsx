import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import toast from "react-hot-toast";
import { Equipment } from "../lib/globals";
import {
  createEquipment,
  deleteEquipment,
  updateEquipment,
} from "../lib/equipment";
import {
  deleteObject,
  getDownloadURL,
  ref,
  uploadBytes,
} from "firebase/storage";
import { storage } from "../lib/firebase";

// Define the schema for item validation
const schema = z.object({
  name: z.string().min(3, "Name must be at least 3 characters long"),
  brand: z.string().min(3, "Brand must be at least 3 characters long"),
  price: z.string(), // Accept string input
  quantity: z.string(), // Accept string input
  dateBought: z.string(),
  isAvailable: z.boolean(),
});

export type ItemFormData = z.infer<typeof schema>;

export function ItemForm({
  revalidate,
  equipment,
  toggleModdal,
}: {
  revalidate: () => void;
  equipment?: Equipment | null;
  toggleModdal: () => void;
}) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ItemFormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: equipment?.name || "",
      brand: equipment?.brand || "",
      price: equipment?.price ? `${equipment.price}` : undefined,
      quantity: equipment?.quantity ? `${equipment.quantity}` : undefined,
      dateBought: equipment?.dateBought || undefined,
      isAvailable: equipment?.isAvailable || undefined,
    },
  });
  const [loading, setLoading] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [image, setImage] = useState<File | null>(null);
  const [imageUrl, setImageUrl] = useState<string | null>(
    equipment?.imageUrl ? equipment.imageUrl : null
  );

  const onSubmit = async (data: ItemFormData) => {
    setLoading(true);

    let uploadedImageUrl = imageUrl; // Use the existing imageUrl if no new image is uploaded

    // Validate and upload image file if provided
    if (image) {
      const validImageTypes = ["image/jpeg", "image/png"];
      if (!validImageTypes.includes(image.type)) {
        toast.error("Invalid image type. Only JPEG and PNG are allowed.");
        setLoading(false);
        return;
      }
      if (image.size > 5 * 1024 * 1024) {
        // 5 MB limit
        toast.error("Image size exceeds 5 MB.");
        setLoading(false);
        return;
      }

      // Upload the new image to Firebase Storage
      try {
        // Delete the old image if it exists
        if (equipment?.imageUrl) {
          const oldImageRef = ref(storage, `equipments/${data.name}`);
          // Attempt to delete the old image
          try {
            await deleteObject(oldImageRef);
          } catch (deleteError) {
            console.error("Error deleting old image:", deleteError);
            toast.error("Failed to delete the old image. Please try again.");
          }
        }
        // Upload the new image to Firebase Storage
        const imageRef = ref(storage, `equipments/${data.name}`);
        const uploadResult = await uploadBytes(imageRef, image);
        uploadedImageUrl = await getDownloadURL(uploadResult.ref);
        setImageUrl(uploadedImageUrl); // Set the uploaded image URL
      } catch (error) {
        console.error("Error handling image:", error);
        toast.error("Failed to upload the image. Please try again.");
      } finally {
        setLoading(false);
      }
    }

    // Handle form submission based on whether it's an update or create
    try {
      if (equipment) {
        await updateEquipment(equipment.id, data, uploadedImageUrl);
        toast.success("Item successfully updated.");
      } else {
        await createEquipment(data, uploadedImageUrl);
        toast.success("Item successfully added.");
      }
      revalidate(); // Revalidate data after successful submission
      toggleModdal(); // Close the modal
    } catch (error) {
      console.error("Error handling submission:", error);
      toast.error("Error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = (e: any) => {
    e.preventDefault();
    if (!equipment) return;
    setDeleting(true);
    toast
      .promise(deleteEquipment(equipment.id), {
        loading: "Deleting...",
        success: <b>Delete successful!</b>,
        error: <b>Login failed. Please try again.</b>,
      })
      .then(() => {
        revalidate();
        toggleModdal();
      })
      .catch((error) => {
        console.error("Toast error:", error);
      })
      .finally(() => {
        setDeleting(false);
      });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="w-full space-y-3">
      <div className="flex flex-col space-y-2">
        <label htmlFor="name" className="text-gray-500 text-sm">
          Name
        </label>
        <input
          {...register("name")}
          id="name"
          type="text"
          placeholder="Item Name"
          className="p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-300"
        />
        {errors.name && <p>{errors.name.message}</p>}
      </div>

      <div className="flex flex-col space-y-2">
        <label htmlFor="brand" className="text-gray-500 text-sm">
          Brand
        </label>
        <input
          {...register("brand")}
          id="brand"
          type="text"
          placeholder="Brand"
          className="p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-300"
        />
        {errors.brand && <p>{errors.brand.message}</p>}
      </div>

      <div className="flex flex-col space-y-2">
        <label htmlFor="price" className="text-gray-500 text-sm">
          Price
        </label>
        <input
          {...register("price")}
          id="price"
          type="number"
          placeholder="Price"
          className="p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-300"
        />
        {errors.price && <p>{errors.price.message}</p>}
      </div>

      <div className="flex flex-col space-y-2">
        <label htmlFor="quantity" className="text-gray-500 text-sm">
          Quantity
        </label>
        <input
          {...register("quantity")}
          id="quantity"
          type="number"
          placeholder="Quantity"
          className="p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-300"
        />
        {errors.quantity && <p>{errors.quantity.message}</p>}
      </div>

      <div className="flex flex-col space-y-2">
        <label htmlFor="dateBought" className="text-gray-500 text-sm">
          Date Bought
        </label>
        <input
          {...register("dateBought")}
          id="dateBought"
          type="date"
          className="p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-300"
        />
        {errors.dateBought && <p>{errors.dateBought.message}</p>}
      </div>

      <div className="flex flex-col space-y-2">
        <label htmlFor="isAvailable" className="text-gray-500 text-sm">
          Available
        </label>
        <input
          {...register("isAvailable")}
          id="isAvailable"
          type="checkbox"
          className="form-checkbox"
        />
        {errors.isAvailable && <p>{errors.isAvailable.message}</p>}
      </div>

      <div className="flex flex-col space-y-2">
        <label htmlFor="imageUrl" className="text-gray-500 text-sm">
          Image
        </label>
        <input
          id="imageUrl"
          type="file"
          accept="image/*"
          onChange={(e) => setImage(e.target.files ? e.target.files[0] : null)}
          className="p-2 border border-gray-300 rounded-lg"
        />
      </div>

      <div className="flex items-center justify-end gap-4">
        {equipment && (
          <button
            className="border-red-600 text-red-600 border-2 px-6 py-2 rounded-lg"
            onClick={handleDelete}
            disabled={loading}
          >
            {deleting ? "Deleting..." : "Delete"}
          </button>
        )}
        <button
          className="px-6 py-2 bg-red-950 text-white rounded-lg"
          type="submit"
          disabled={loading}
        >
          {loading
            ? equipment
              ? "Updating..."
              : "Creating..."
            : equipment
            ? "Update"
            : "Create"}
        </button>
      </div>
    </form>
  );
}
