import { useEffect, useState } from "react";
import { Equipment, RequestedEquipment } from "../../../lib/globals";
import { getEquipmentById } from "../../../lib/equipment";

export function RequestedEquipmentCard({
  requestedEquipment,
}: {
  requestedEquipment: RequestedEquipment;
}) {
  const [equipment, setEquipment] = useState<Equipment | null>(null);

  useEffect(() => {
    const fetchEquipment = async () => {
      const equipment = await getEquipmentById(requestedEquipment.equipmentId);
      setEquipment(equipment);
    };
    fetchEquipment();
  }, []);

  if (!equipment) return;
  return (
    <div
      className="w-[250px] h-[300px] flex items-end rounded-lg relative drop-shadow-lg bg-inherit"
      style={{
        background: `linear-gradient(rgba(0, 0, 0, 0.289), rgba(0, 0, 0, 0.673)), url('${equipment.imageUrl}') no-repeat center center / cover`,
      }}
    >
      <div className="absolute top-0 left-0 m-4 text-white">
        {requestedEquipment.isReturned ? "Returned" : "Not Returned"}
      </div>
      <div className="py-5 px-2 space-y-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="font-bold text-white">{equipment.name}</h1>
            <p className="text-white/80">x {requestedEquipment.quantity}</p>
          </div>
          <p className="font-semibold text-white">{equipment.brand}</p>
        </div>
      </div>
    </div>
  );
}
