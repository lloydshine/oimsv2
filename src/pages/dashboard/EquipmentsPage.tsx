import { useEffect, useState } from "react";
import { ItemForm } from "../../forms/ItemForm";
import { Modal } from "../../components/Modal";
import { Equipment } from "../../lib/globals";
import { getEquipments } from "../../lib/equipment";
import { EquipmentCard } from "../../components/dashboard/equipments/EquipmentCard";

export default function EquipmentsPage() {
  const [modalOpen, setModalOpen] = useState(false); // Control modal open/close
  const [selected, setSelected] = useState<Equipment | null>(null); // Track selected equipment

  // Handle selection of equipment for editing
  const handleSelect = (select: Equipment | null) => {
    setSelected(select);
    setModalOpen(true); // Open modal for editing
  };

  const [equipments, setEquipments] = useState<Equipment[]>([]);
  const fetchEquipments = async () => {
    const equipments = await getEquipments();
    setEquipments(equipments);
  };

  useEffect(() => {
    fetchEquipments();
  }, []);

  return (
    <>
      <Modal
        open={modalOpen}
        toggleModal={() => setModalOpen(!modalOpen)}
        title={selected ? "Edit Item" : "Add Item"} // Dynamically set title
      >
        <ItemForm
          revalidate={fetchEquipments}
          equipment={selected} // Pass selected equipment for editing or null for creating
          toggleModdal={() => setModalOpen(!modalOpen)}
        />
      </Modal>
      <main className="space-y-10">
        <button
          onClick={() => {
            setSelected(null); // Clear selection for creation
            setModalOpen(true); // Open modal for adding new item
          }}
          className="px-4 py-2 bg-red-950 text-white rounded-lg"
        >
          Add Item
        </button>

        <section className="flex flex-wrap gap-4">
          {equipments.map((equipment) => (
            <div key={equipment.id} onClick={() => handleSelect(equipment)}>
              <EquipmentCard equipment={equipment} />
            </div>
          ))}
        </section>
      </main>
    </>
  );
}
