import { BrowserMultiFormatReader } from "@zxing/browser";
import { BarcodeFormat, DecodeHintType } from "@zxing/library";
import { useEffect, useRef, useState } from "react";

type Product = {
  product_name?: string;
  brands?: string;
  image_front_url?: string;
};

export default function BarcodeScanner() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const started = useRef(false);

  const [barcode, setBarcode] = useState("");
  const [product, setProduct] = useState<Product | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    if (started.current) return;

    started.current = true;

    let codeReader: BrowserMultiFormatReader | null = null;
    let controls: { stop: () => void } | null = null;
    let stopped = false;

    async function startScanner() {
      if (!videoRef.current) return;

      const hints = new Map<DecodeHintType, unknown>();

      hints.set(DecodeHintType.POSSIBLE_FORMATS, [
        BarcodeFormat.EAN_13,
        BarcodeFormat.EAN_8,
        BarcodeFormat.UPC_A,
        BarcodeFormat.UPC_E,
        BarcodeFormat.CODE_128,
        BarcodeFormat.ITF,
        BarcodeFormat.CODABAR,
      ]);

      hints.set(DecodeHintType.TRY_HARDER, true);

      codeReader = new BrowserMultiFormatReader(hints);

      try {
        controls = await codeReader.decodeFromConstraints(
          {
            video: {
              facingMode: {
                ideal: "environment",
              },
              width: {
                ideal: 1920,
              },
              height: {
                ideal: 1080,
              },
              advanced: [
                {
                  focusMode: "continuous",
                } as any,
              ],
            },
          },
          videoRef.current,
          async (result, err) => {
            if (stopped || !result) return;

            const code = result.getText();

            console.log("Barcode:", code);

            stopped = true;

            setBarcode(code);

            controls?.stop();

            // Stop camera stream completely
            const stream = videoRef.current?.srcObject as MediaStream | null;

            stream?.getTracks().forEach((track) => {
              track.stop();
            });

            try {
              const res = await fetch(
                `https://world.openfoodfacts.org/api/v2/product/${code}.json`,
              );

              const data = await res.json();

              if (data.status === 1) {
                setProduct(data.product);
              } else {
                setError("Product not found");
              }
            } catch (e) {
              console.error(e);
              setError("Product lookup failed");
            }
          },
        );
      } catch (e) {
        console.error("Camera error:", e);
        setError("Could not access camera");
      }
    }

    startScanner();

    return () => {
      stopped = true;

      controls?.stop();

      const stream = videoRef.current?.srcObject as MediaStream | null;

      stream?.getTracks().forEach((track) => {
        track.stop();
      });

      started.current = false;
    };
  }, []);

  return (
    <div className="flex flex-col items-center gap-4">
      <video
        ref={videoRef}
        autoPlay
        muted
        playsInline
        className="w-full max-w-xl rounded border"
      />

      <p>Barcode: {barcode || "Scanning..."}</p>

      {error && <p className="text-red-500">{error}</p>}

      {product && (
        <div className="text-center">
          <h2 className="text-xl font-bold">
            {product.product_name ?? "Unknown product"}
          </h2>

          <p>{product.brands}</p>

          {product.image_front_url && (
            <img
              src={product.image_front_url}
              className="w-48 mx-auto"
              alt={product.product_name ?? "Product"}
            />
          )}
        </div>
      )}
    </div>
  );
}
