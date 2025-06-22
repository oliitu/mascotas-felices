import { useEffect, useState } from "react";
import { Html5Qrcode } from "html5-qrcode";
import { useNavigate } from "react-router-dom";

export default function Escanear() {
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const html5QrCode = new Html5Qrcode("qr-reader");

    async function startCamera() {
      try {
        // Primero intento con facingMode exacto para forzar trasera
        await html5QrCode.start(
          { facingMode: { exact: "environment" } },
          { fps: 10, qrbox: { width: 250, height: 250 } },
          (decodedText) => {
            html5QrCode.stop().then(() => {
              navigate(`/ver/${decodedText}`);
            });
          },
          (err) => {
            console.warn("Escaneo fallido:", err);
          }
        );
      } catch (e) {
        console.warn("No se pudo iniciar con facingMode exact:", e);

        // Fallback: obtener cámaras y usar la trasera por id
        try {
          const devices = await Html5Qrcode.getCameras();
          if (!devices || devices.length === 0) {
            setError("No se encontraron cámaras.");
            return;
          }

          const backCamera = devices.find(({ label }) =>
            label.toLowerCase().includes("back") ||
            label.toLowerCase().includes("rear") ||
            label.toLowerCase().includes("environment")
          );

          const cameraId = backCamera ? backCamera.id : devices[0].id;

          await html5QrCode.start(
            cameraId,
            { fps: 10, qrbox: { width: 250, height: 250 } },
            (decodedText) => {
  html5QrCode.stop().then(() => {
    try {
      const url = new URL(decodedText);

      // Si la URL contiene la ruta esperada "/ver/"
      if (url.pathname.startsWith("/ver/")) {
        // Navegamos usando window.location para evitar concatenar mal
        window.location.href = decodedText;
      } else {
        // Si la URL es otra, navegar a la ruta relativa con decodedText
        navigate(`/ver/${decodedText}`);
      }
    } catch {
      // No es URL, navegamos con ruta relativa
      navigate(`/ver/${decodedText}`);
    }
  });
}
,
            (err) => {
              console.warn("Escaneo fallido fallback:", err);
            }
          );
        } catch (err) {
          setError("Error iniciando cámara en fallback: " + err);
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
