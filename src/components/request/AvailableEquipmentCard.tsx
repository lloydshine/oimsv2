import { useState, useEffect } from "react";
import { Equipment } from "../../lib/globals";

interface AvailableEquipmentCardProps {
  equipment: Equipment;
  onAdd: (equipmentId: string, quantity: number) => void;
  onRemove: (equipmentId: string) => void;
}

export function AvailableEquipmentCard({
  equipment,
  onAdd,
  onRemove,
}: AvailableEquipmentCardProps) {
  const [isSelected, setIsSelected] = useState(false);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    if (isSelected) {
      onAdd(equipment.id, quantity);
    } else {
      onRemove(equipment.id);
    }
  }, [isSelected, quantity]);

  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value, 10);

    // Ensure value is a number and greater than or equal to 1
    if (isNaN(value) || value < 1) {
      setQuantity(1);
      return;
    }
    // Ensure value does not exceed available quantity
    if (value > equipment.quantity) {
      setQuantity(equipment.quantity);
      return;
    }
    // Set quantity to the valid value
    setQuantity(value);
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsSelected(e.target.checked);
  };

  return (
    <div className="border p-4 rounded-lg shadow-lg">
      <div
        className="h-[10rem] w-[20rem] rounded-lg flex items-end"
        style={{
          background: `linear-gradient(rgba(0, 0, 0, 0.289), rgba(0, 0, 0, 0.673)), url('${equipment.imageUrl}') no-repeat center center / cover`,
        }}
      >
        <div className="m-2 flex gap-2">
          <input
            type="checkbox"
            checked={isSelected}
            onChange={handleCheckboxChange}
          />
          <h1 className="text-white font-bold text-lg">{equipment.name}</h1>
        </div>
      </div>

      {isSelected && (
        <div className="w-full flex items-center gap-2">
          <label htmlFor="quantity">Quantity:</label>
          <input
            className="p-2 flex-1 border-4 rounded mt-2"
            name="quantity"
            type="number"
            value={quantity}
            onChange={handleQuantityChange}
          />
        </div>
      )}
    </div>
  );
}
