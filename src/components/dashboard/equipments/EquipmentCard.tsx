import { Equipment } from "../../../lib/globals";
import { AvailabilityBadge } from "../../AvailabilityBadge";

export function EquipmentCard({ equipment }: { equipment: Equipment }) {
  return (
    <div
      className="w-[250px] h-[300px] flex items-end rounded-lg relative drop-shadow-lg bg-inherit"
      style={{
        background: `linear-gradient(rgba(0, 0, 0, 0.289), rgba(0, 0, 0, 0.673)), url('${equipment.imageUrl}') no-repeat center center / cover`,
      }}
    >
      <div className="absolute top-0 left-0 m-4">
        <AvailabilityBadge isAvailable={equipment.isAvailable} />
      </div>
      <div className="py-5 px-2 space-y-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="font-bold text-white">{equipment.name}</h1>
            <p className="text-white/80">x {equipment.quantity}</p>
          </div>
          <p className="font-semibold text-white">{equipment.brand}</p>
        </div>
      </div>
    </div>
  );
}
