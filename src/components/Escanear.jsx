import { useEffect, useState } from "react";
import { Html5Qrcode } from "html5-qrcode";
import { useNavigate } from "react-router-dom";

export default function Escanear() {
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // Función para manejar la navegación según decodedText
  const manejarNavegacion = (decodedText) => {
    try {
      const url = new URL(decodedText);
      // Si la URL es de tu dominio y tiene /ver/ en el path, redirijo directo
      if (url.hostname.includes("mascotas-felicess.netlify.app") && url.pathname.startsWith("/ver/")) {
        window.location.href = decodedText;
      } else {
        // Si es URL pero no esperada, podés manejar distinto o hacer fallback
        navigate(`/ver/${decodedText}`);
      }
    } catch {
      // decodedText no es URL, navego con ruta relativa
      navigate(`/ver/${decodedText}`);
    }
  };

  useEffect(() => {
    const html5QrCode = new Html5Qrcode("qr-reader");

    async function startCamera() {
      try {
        // Intento abrir la cámara trasera usando facingMode
        await html5QrCode.start(
          { facingMode: { exact: "environment" } },
          { fps: 10, qrbox: { width: 250, height: 250 } },
          (decodedText) => {
            html5QrCode.stop().then(() => {
              manejarNavegacion(decodedText);
            });
          },
          (err) => {
            console.warn("Escaneo fallido:", err);
          }
        );
      } catch (e) {
        console.warn("No se pudo iniciar con facingMode exact:", e);

        // Fallback por si no funciona el facingMode
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
                manejarNavegacion(decodedText);
              });
            },
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
