import { useState } from "react";

interface ManualFoodModalProps {
  barcode: string;
  onClose: () => void;
  onAdded: () => void;
}

export default function ManualFoodModal({
  barcode,
  onClose,
  onAdded,
}: ManualFoodModalProps) {
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    productName: "",
    productBrand: "",
    productImage: "",
    quantityGrams: 100,
    calories: 0,
    carbohydratesGrams: 0,
    fatsGrams: 0,
    proteinGrams: 0,
  });

  function updateField(key: keyof typeof form, value: string | number) {
    setForm((prev) => ({
      ...prev,
      [key]: value,
    }));
  }

  async function addProduct() {
    try {
      setLoading(true);

      const res = await fetch(
        import.meta.env.DEV
          ? "http://192.168.1.201:3000/add-food-product"
          : "https://api.kineticedge.liamjorgensen.dev/add-food-product",
        {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            barcode,
            ...form,
          }),
        },
      );

      if (!res.ok) {
        throw new Error("Failed adding product");
      }

      onAdded();
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70">
      <div className="w-[420px] rounded-2xl bg-[#131313] p-6 space-y-4">
        <h2 className="text-xl font-black text-white">Add product manually</h2>

        {[
          ["productName", "Name"],
          ["productBrand", "Brand"],
          ["productImage", "Image URL"],
          ["quantityGrams", "Quantity grams"],
          ["calories", "Calories"],
          ["carbohydratesGrams", "Carbs"],
          ["fatsGrams", "Fat"],
          ["proteinGrams", "Protein"],
        ].map(([key, label]) => (
          <div key={key}>
            <label className="text-sm text-gray-400">{label}</label>

            <input
              value={form[key as keyof typeof form]}
              onChange={(e) =>
                updateField(
                  key as keyof typeof form,
                  [
                    "quantityGrams",
                    "calories",
                    "carbohydratesGrams",
                    "fatsGrams",
                    "proteinGrams",
                  ].includes(key)
                    ? Number(e.target.value)
                    : e.target.value,
                )
              }
              className="w-full rounded-lg bg-neutral-800 p-2 text-white"
            />
          </div>
        ))}

        <div className="flex justify-end gap-3">
          <button
            onClick={onClose}
            className="rounded bg-neutral-700 px-4 py-2 text-white"
          >
            Cancel
          </button>

          <button
            disabled={loading}
            onClick={addProduct}
            className="rounded bg-blue-600 px-4 py-2 text-white"
          >
            {loading ? "Adding..." : "Add"}
          </button>
        </div>
      </div>
    </div>
  );
}
