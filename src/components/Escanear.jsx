import { useEffect, useState } from "react";
import { Html5Qrcode } from "html5-qrcode";
import { useNavigate } from "react-router-dom";

export default function Escanear() {
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const html5QrCode = new Html5Qrcode("qr-reader");

    html5QrCode
      .start(
        { facingMode: "environment" },
        { fps: 10, qrbox: { width: 250, height: 250 } },
        (decodedText) => {
          try {
            const url = new URL(decodedText);
            const rutaRelativa = url.pathname + url.search + url.hash;

            html5QrCode.stop().then(() => {
              navigate(rutaRelativa);
            });
          } catch {
            // Si no es URL válida, navegamos con decodedText tal cual
            html5QrCode.stop().then(() => {
              navigate(`mascotas-felicess.netlify.app/ver/${decodedText}`);
            });
          }
        },
        (err) => {
          console.warn("Escaneo fallido:", err);
        }
      )
      .catch((err) => {
        setError("No se pudo iniciar la cámara: " + err);
      });

    return () => {
      html5QrCode.stop().catch(() => {});
    };
  }, [navigate]);

  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center text-center p-4">
      <h1 className="text-2xl font-bold text-purple-500 mb-4">
        Escaneando código QR...
      </h1>
      <div id="qr-reader" className="w-full max-w-sm" />
      {error && <p className="text-red-500 mt-4">{error}</p>}
    </div>
  );
}
