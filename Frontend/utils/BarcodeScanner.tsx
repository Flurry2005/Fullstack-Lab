import { BrowserMultiFormatReader } from "@zxing/browser";
import { BarcodeFormat, DecodeHintType } from "@zxing/library";
import { useEffect, useRef, useState } from "react";

export type Product = {
  product_name?: string;
  brands?: string;
  image_front_url?: string;
  nutriments?: any;
};

interface BarcodeScannerProps {
  onClose: () => void;
  onProductFound: (barcode: string, product: Product) => void;
  onProductNotFound: (barcode: string) => void;
}

export default function BarcodeScanner({
  onClose,
  onProductFound,
  onProductNotFound,
}: BarcodeScannerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const controlsRef = useRef<{ stop: () => void } | null>(null);
  const foundRef = useRef(false);

  const [found, setFound] = useState(false);
  const [error, setError] = useState("");

  const [manualMode, setManualMode] = useState(false);
  const [manualBarcode, setManualBarcode] = useState("");

  async function lookupBarcode(barcode: string) {
    try {
      const res = await fetch(
        `https://world.openfoodfacts.org/api/v3/product/${barcode}?fields=product_name,nutriments,brands,image_front_url`,
      );

      const data = await res.json();

      if (data.status === "success") {
        onProductFound(barcode, data.product);
        onClose();
      } else {
        onProductNotFound(barcode);
        onClose();
      }
    } catch {
      setError("Lookup failed");
    }
  }

  function stopCamera() {
    controlsRef.current?.stop();

    const stream = videoRef.current?.srcObject as MediaStream | null;

    stream?.getTracks().forEach((track) => track.stop());
  }

  async function submitManualBarcode() {
    if (!manualBarcode.trim()) return;

    stopCamera();

    await lookupBarcode(manualBarcode.trim());
  }

  useEffect(() => {
    if (manualMode) return;

    if (!videoRef.current) return;

    const hints = new Map<DecodeHintType, unknown>();

    hints.set(DecodeHintType.POSSIBLE_FORMATS, [
      BarcodeFormat.EAN_13,
      BarcodeFormat.EAN_8,
      BarcodeFormat.UPC_A,
      BarcodeFormat.UPC_E,
      BarcodeFormat.CODE_128,
    ]);

    hints.set(DecodeHintType.TRY_HARDER, true);

    const reader = new BrowserMultiFormatReader(hints);

    async function start() {
      try {
        controlsRef.current = await reader.decodeFromConstraints(
          {
            video: {
              facingMode: "environment",
            },
          },
          videoRef.current!,
          async (result) => {
            if (!result || foundRef.current) return;

            foundRef.current = true;

            setFound(true);

            const barcode = result.getText();

            setTimeout(async () => {
              stopCamera();

              await lookupBarcode(barcode);
            }, 500);
          },
        );
      } catch (e) {
        if (e instanceof DOMException) {
          setError(`${e.name}: ${e.message}`);
        } else {
          setError(String(e));
        }
      }
    }

    start();

    return () => {
      stopCamera();
    };
  }, [manualMode]);

  return (
    <div className="fixed inset-0 z-50 bg-black">
      {!manualMode && (
        <>
          <video
            ref={videoRef}
            autoPlay
            muted
            playsInline
            className="absolute inset-0 h-full w-full object-cover"
          />

          <div className="absolute inset-0 flex items-center justify-center">
            <div
              className={`w-72 h-40 rounded-xl border-4 transition-all duration-300 ${
                found
                  ? "border-green-400 bg-green-400/20 scale-105"
                  : "border-white"
              }`}
            />
          </div>
        </>
      )}

      {manualMode && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-[350px] rounded-2xl bg-[#131313] p-6 space-y-4">
            <h2 className="text-xl font-black text-white">Enter barcode</h2>

            <input
              autoFocus
              type="text"
              inputMode="numeric"
              value={manualBarcode}
              onChange={(e) => setManualBarcode(e.target.value)}
              placeholder="Barcode number"
              className="w-full rounded-lg bg-neutral-800 p-3 text-white"
            />

            <button
              onClick={submitManualBarcode}
              className="w-full rounded-lg bg-blue-600 py-3 text-white"
            >
              Search
            </button>
          </div>
        </div>
      )}

      <div className="absolute bottom-10 left-1/2 flex -translate-x-1/2 gap-3">
        <button
          onClick={() => {
            stopCamera();
            setManualMode(true);
          }}
          className="rounded bg-white px-6 py-3 cursor-pointer"
        >
          Manual
        </button>

        <button
          onClick={onClose}
          className="rounded bg-white px-6 py-3 cursor-pointer"
        >
          Cancel
        </button>
      </div>

      {error && (
        <div className="absolute top-8 left-1/2 -translate-x-1/2 rounded bg-red-500 px-4 py-2 text-white">
          {error}
        </div>
      )}
    </div>
  );
}
