import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { v4 as uuidv4 } from "uuid";
import { z } from "zod";
import toast from "react-hot-toast";
import { useState } from "react";
import { InboxIcon, XIcon } from "lucide-react";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage } from "../lib/firebase";
import { createAdmission } from "../lib/admission";

const schema = z.object({
  firstName: z.string().min(1, "First name is required"),
  middleName: z.string().optional(),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().email("Invalid email address"),
  contactNumber: z
    .string()
    .min(10, "Contact number must be at least 10 digits long"),
  fileUrls: z.array(z.string()),
});

export type AdmissionFormData = z.infer<typeof schema>;

export default function AdmissionForm({
  admissionNumber,
}: {
  admissionNumber: string;
}) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<AdmissionFormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      firstName: "",
      middleName: "",
      lastName: "",
      email: "",
      contactNumber: "",
      fileUrls: [],
    },
  });

  const [imagePreviews, setImagePreviews] = useState<string[]>([]);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]); // Track selected files
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  // Handle form submission
  const onSubmit = async (data: AdmissionFormData) => {
    setLoading(true);
    try {
      const uploadedUrls = await uploadImagesToCloud(selectedFiles);
      setValue("fileUrls", uploadedUrls);
      const updatedData = { ...data, fileUrls: uploadedUrls };
      await createAdmission(updatedData, admissionNumber);
      toast.success("Form submitted successfully!");
    } catch (error) {
      toast.error("Failed to upload images");
    } finally {
      setLoading(false);
      setSubmitted(true);
    }
  };

  const uploadImagesToCloud = async (files: File[]): Promise<string[]> => {
    let urls: string[] = [];
    const uploadPromises = files.map(async (file) => {
      const uniqueId = uuidv4();
      const imageRef = ref(storage, `files/${uniqueId}-${file.name}`);
      const uploadResult = await uploadBytes(imageRef, file);
      const downloadURL = await getDownloadURL(uploadResult.ref);
      urls.push(downloadURL);
    });
    await Promise.all(uploadPromises);
    return urls;
  };

  // Handle image change
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const fileArray = Array.from(files);
      const totalFiles = [...selectedFiles, ...fileArray];

      // Limit to a maximum of 5 images
      if (totalFiles.length > 5) {
        toast.error("You can only upload a maximum of 5 images.");
        return;
      }

      setSelectedFiles(totalFiles); // Store selected files
      const previewUrls = totalFiles.map((file) => URL.createObjectURL(file));
      setImagePreviews(previewUrls); // Generate previews
    }
  };

  const removeImage = (index: number) => {
    const updatedFiles = [...selectedFiles];
    const updatedPreviews = [...imagePreviews];

    updatedFiles.splice(index, 1);
    updatedPreviews.splice(index, 1);

    setSelectedFiles(updatedFiles);
    setImagePreviews(updatedPreviews);
  };

  if (submitted)
    return (
      <>Admission Submitted, Wait for your email for admission notifications</>
    );

  return (
    <div className="p-8 bg-gray-100 rounded-lg shadow-md">
      <h1 className="text-3xl font-bold mb-6 text-red-950">
        {admissionNumber === "1"
          ? "New Student Admission"
          : "Old/Returnee Student Admission"}
      </h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <section className="flex flex-col md:flex-row gap-4">
          <div className="space-y-4 md:w-[40rem] w-full">
            {/* Form Inputs */}
            <div className="flex flex-col space-y-2">
              <label htmlFor="firstName" className="text-gray-500 text-sm">
                First Name
              </label>
              <input
                {...register("firstName")}
                id="firstName"
                type="text"
                placeholder="First Name"
                className="p-2 border border-gray-300 rounded-lg"
              />
              {errors.firstName && (
                <p className="text-red-600">{errors.firstName.message}</p>
              )}
            </div>

            <div className="flex flex-col space-y-2">
              <label htmlFor="middleName" className="text-gray-500 text-sm">
                Middle Name
              </label>
              <input
                {...register("middleName")}
                id="middleName"
                type="text"
                placeholder="Middle Name (Optional)"
                className="p-2 border border-gray-300 rounded-lg"
              />
            </div>

            <div className="flex flex-col space-y-2">
              <label htmlFor="lastName" className="text-gray-500 text-sm">
                Last Name
              </label>
              <input
                {...register("lastName")}
                id="lastName"
                type="text"
                placeholder="Last Name"
                className="p-2 border border-gray-300 rounded-lg"
              />
              {errors.lastName && (
                <p className="text-red-600">{errors.lastName.message}</p>
              )}
            </div>

            <div className="flex flex-col space-y-2">
              <label htmlFor="email" className="text-gray-500 text-sm">
                Email
              </label>
              <input
                {...register("email")}
                id="email"
                type="email"
                placeholder="Email"
                className="p-2 border border-gray-300 rounded-lg"
              />
              {errors.email && (
                <p className="text-red-600">{errors.email.message}</p>
              )}
            </div>

            <div className="flex flex-col space-y-2">
              <label htmlFor="contactNumber" className="text-gray-500 text-sm">
                Contact Number
              </label>
              <input
                {...register("contactNumber")}
                id="contactNumber"
                type="text"
                placeholder="Contact Number"
                className="p-2 border border-gray-300 rounded-lg"
              />
              {errors.contactNumber && (
                <p className="text-red-600">{errors.contactNumber.message}</p>
              )}
            </div>

            {/* Image Upload */}
            <div className="flex flex-col space-y-2">
              <label htmlFor="images" className="text-gray-500 text-sm">
                Upload Images (Max 5)
              </label>
              <input
                type="file"
                multiple
                accept="image/*"
                className="p-2 border border-gray-300 rounded-lg"
                onChange={handleImageChange}
              />
              {errors.fileUrls && (
                <p className="text-red-600">{errors.fileUrls.message}</p>
              )}
            </div>
          </div>

          <div className="flex-1 md:p-10">
            <div className="w-full md:h-full h-[20rem] border-4 border-dashed flex flex-col items-center justify-center">
              {imagePreviews.length > 0 ? (
                <div className="grid grid-cols-2 gap-2">
                  {imagePreviews.map((src, index) => (
                    <div key={index} className="relative">
                      <img
                        src={src}
                        alt={`Preview ${index + 1}`}
                        className="h-24 w-24 object-cover"
                      />
                      <button
                        type="button"
                        onClick={() => removeImage(index)}
                        className="absolute top-0 right-0 bg-red-500 text-white p-1 rounded-full"
                      >
                        <XIcon className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="m-auto flex items-center gap-2">
                  <InboxIcon />
                  <h1 className="text-lg text-black/70">Image Preview</h1>
                </div>
              )}
            </div>
          </div>
        </section>

        <button
          type="submit"
          disabled={loading}
          className="px-6 py-2 bg-red-950 text-white rounded-lg"
        >
          {loading ? "Submitting..." : "Submit"}
        </button>
      </form>
    </div>
  );
}
