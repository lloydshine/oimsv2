import { useEffect, useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { Equipment } from "../lib/globals";
import {
  createEquipmentRequest,
  getAvailableEquipments,
} from "../lib/equipment";
import toast from "react-hot-toast";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { AvailableEquipmentCard } from "../components/request/AvailableEquipmentCard";
import { useNavigate } from "react-router-dom";

interface EquipmentRequestFormProps {
  eventId?: string;
  departmentId?: string;
}

const schema = z.object({
  departmentId: z.string(),
  eventId: z.string().optional(),
  requestedEquipments: z
    .array(
      z.object({
        equipmentId: z.string(),
        quantity: z.number().min(1),
      })
    )
    .min(1, "You must request at least one item."),
});

export type EquipmentRequestData = z.infer<typeof schema>;

export function EquipmentRequestForm({
  eventId,
  departmentId,
}: EquipmentRequestFormProps) {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<EquipmentRequestData>({
    resolver: zodResolver(schema),
    defaultValues: { departmentId: departmentId, eventId: eventId },
  });

  const { fields, append, update, remove } = useFieldArray({
    control,
    name: "requestedEquipments",
  });

  const [equipments, setEquipments] = useState<Equipment[]>([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const onSubmit = async (data: EquipmentRequestData) => {
    setLoading(true);
    toast
      .promise(createEquipmentRequest(data), {
        loading: "Logging in...",
        success: <b>Request successful!</b>,
        error: <b>Request failed. Please try again.</b>,
      })
      .then(() => {
        navigate("/dashboard");
      })
      .catch((error) => {
        console.error("Toast error:", error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handleAddEquipment = (equipmentId: string, quantity: number) => {
    const existingEquipmentIndex = fields.findIndex(
      (field) => field.equipmentId === equipmentId
    );
    if (existingEquipmentIndex >= 0) {
      update(existingEquipmentIndex, { equipmentId, quantity });
    } else {
      append({ equipmentId, quantity });
    }
  };

  const handleRemoveEquipment = (equipmentId: string) => {
    const index = fields.findIndex(
      (field) => field.equipmentId === equipmentId
    );
    if (index >= 0) {
      remove(index);
    }
  };

  useEffect(() => {
    const fetchEquipments = async () => {
      const availableEquipments = await getAvailableEquipments();
      setEquipments(availableEquipments);
    };
    fetchEquipments();
  }, []);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <h1 className="text-2xl font-bold">Equipment Request Form</h1>
      <section className="flex flex-wrap gap-4">
        {equipments.map((equipment) => (
          <AvailableEquipmentCard
            key={equipment.id}
            equipment={equipment}
            onAdd={handleAddEquipment}
            onRemove={handleRemoveEquipment}
          />
        ))}
      </section>

      {/* Display selected equipments */}
      {fields.length > 0 && (
        <div className="mt-4">
          <h2 className="text-lg font-bold">Selected Equipments</h2>
          {fields.map((field) => (
            <div key={field.id} className="mt-4">
              <p>
                Requested Equipment ID: {field.equipmentId}, Quantity:{" "}
                {field.quantity}
              </p>
            </div>
          ))}
        </div>
      )}

      {errors.requestedEquipments && (
        <p className="text-red-500">{errors.requestedEquipments.message}</p>
      )}

      <button
        type="submit"
        disabled={loading}
        className="bg-red-950 rounded-lg text-white px-4 py-2"
      >
        {loading ? "Submiting Request..." : "Submit Request"}
      </button>
    </form>
  );
}
