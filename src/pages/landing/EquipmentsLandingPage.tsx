import { useEffect, useState } from "react";
import { Equipment } from "../../lib/globals";
import { getAvailableEquipments } from "../../lib/equipment";

export default function EquipmentsLandingPage() {
  const [equipments, setEquipments] = useState<Equipment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchEquipments = async () => {
      try {
        const equipments = await getAvailableEquipments();
        setEquipments(equipments);
      } catch (err) {
        setError("Failed to load equipments.");
      } finally {
        setLoading(false);
      }
    };
    fetchEquipments();
  }, []);

  return (
    <main className="w-full">
      {/* Hero Section */}
      <section
        className="text-white h-[70vh] flex flex-col justify-center items-center text-center bg-top"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.389), rgba(0, 0, 0, 0.873)), url("/1.jpg")`,
        }}
      >
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Equipments</h1>
          <p className="text-lg">
            Browse through our collection of equipment available for borrowing.
          </p>
        </div>
      </section>

      {/* Equipment Section */}
      <section className="w-full p-8">
        <h2 className="text-3xl font-bold text-center mb-8">Our Equipment</h2>

        {/* Loading and Error Handling */}
        {loading && <p className="text-center">Loading equipment...</p>}
        {error && <p className="text-center text-red-500">{error}</p>}

        {/* No Equipment Available */}
        {!loading && !error && equipments.length === 0 && (
          <p className="text-center">No equipment available at the moment.</p>
        )}

        {/* Equipment Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {equipments.map((equipment) => (
            <div
              key={equipment.id}
              className="bg-white shadow-lg rounded-lg p-6 flex flex-col items-center"
            >
              <img
                src={equipment.imageUrl}
                alt={equipment.name}
                className="w-full h-40 object-cover mb-4 rounded-lg"
              />
              <h3 className="text-xl font-semibold mb-2">{equipment.name}</h3>
              <p className="text-gray-700">{equipment.brand}</p>

              <div className="flex items-center justify-between w-full mt-4">
                <span className="text-sm text-gray-600">
                  Price: Php{equipment.price}
                </span>
                <span
                  className={`text-sm font-semibold ${
                    equipment.isAvailable ? "text-green-600" : "text-red-600"
                  }`}
                >
                  {equipment.isAvailable ? "Available" : "Unavailable"}
                </span>
              </div>

              <p className="text-sm text-gray-500 mt-2">
                Bought on: {new Date(equipment.dateBought).toLocaleDateString()}
              </p>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
