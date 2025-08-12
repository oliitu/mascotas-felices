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
        const devices = await Html5Qrcode.getCameras();
        console.log("Cámaras detectadas:", devices);

        if (!devices.length) {
          setError("No se encontraron cámaras.");
          return;
        }

        const backCamera = devices.find(device =>
          (device.facingMode === "environment" ||
           device.label.toLowerCase().includes("back") ||
           device.label.toLowerCase().includes("rear")) &&
          !device.label.toLowerCase().includes("wide") &&
          !device.label.toLowerCase().includes("ultra") &&
          !device.label.toLowerCase().includes("0.5")
        ) || devices[0];

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
