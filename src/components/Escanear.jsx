import { useEffect, useState } from "react";
import { Html5Qrcode } from "html5-qrcode";
import { useNavigate } from "react-router-dom";

export default function Escanear() {
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const manejarNavegacion = (decodedText) => {
    try {
      const url = new URL(decodedText);
      if (url.hostname.includes("mascotas-felicess.netlify.app") && url.pathname.startsWith("/ver/")) {
        window.location.href = decodedText;
      } else {
        navigate(`/ver/${decodedText}`);
      }
    } catch {
      navigate(`/ver/${decodedText}`);
    }
  };

  useEffect(() => {
  const html5QrCode = new Html5Qrcode("qr-reader");

  async function startCamera() {
    try {
      // iOS: intentar usar facingMode directamente
      await html5QrCode.start(
        { facingMode: "environment" },
        { fps: 10, qrbox: { width: 250, height: 250 } },
        (decodedText) => {
          html5QrCode.stop().then(() => manejarNavegacion(decodedText));
        },
        (err) => console.warn("Escaneo fallido:", err)
      );
    } catch {
      try {
        // Si falla, buscar cámaras manualmente (Android u otros)
        const devices = await Html5Qrcode.getCameras();
        if (!devices.length) {
          setError("No se encontraron cámaras.");
          return;
        }

        c// Buscar la cámara trasera principal evitando ultra wide
const backCamera =
  devices.find(({ label }) =>
    (label.toLowerCase().includes("back") || label.toLowerCase().includes("rear")) &&
    !label.toLowerCase().includes("wide") &&
    !label.toLowerCase().includes("0.5") &&
    !label.toLowerCase().includes("ultra")
  ) ||
  // A veces el principal es el segundo o tercero de la lista si hay varias back
  devices.find(({ label }, idx) =>
    idx > 0 && (label.toLowerCase().includes("back") || label.toLowerCase().includes("rear"))
  ) ||
  devices[0];


        await html5QrCode.start(
          backCamera.id,
          { fps: 10, qrbox: { width: 250, height: 250 } },
          (decodedText) => {
            html5QrCode.stop().then(() => manejarNavegacion(decodedText));
          },
          (err) => console.warn("Escaneo fallido:", err)
        );
      } catch (err) {
        setError("Error iniciando cámara: " + err);
      }
    }
  }

  startCamera();

  return () => {
    html5QrCode.stop().catch(() => {});
  };
}, [navigate]);


  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center text-center p-4">
      <h1 className="text-2xl font-bold text-purple-500 mb-4">Escaneando código QR...</h1>
      <div id="qr-reader" className="w-full max-w-sm" />
      {error && <p className="text-red-500 mt-4">{error}</p>}
    </div>
  );
}
