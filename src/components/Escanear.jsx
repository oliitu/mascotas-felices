import { useEffect, useRef, useState } from "react";
import { Html5Qrcode } from "html5-qrcode";
import { useNavigate } from "react-router-dom";

export default function Escanear() {
  const qrRef = useRef(null);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
  const html5QrCode = new Html5Qrcode("qr-reader");

  Html5Qrcode.getCameras()
    .then((devices) => {
      if (devices && devices.length) {
        // Buscar la cámara trasera (environment)
        let cameraId = devices[0].id; // default

        // Opcional: buscar por label que contenga 'back', 'rear', 'environment'
        const backCamera = devices.find((device) => {
          const label = device.label.toLowerCase();
          return label.includes("back") || label.includes("rear") || label.includes("environment");
        });

        if (backCamera) {
          cameraId = backCamera.id;
        }

        html5QrCode
          .start(
            cameraId,
            { fps: 10, qrbox: { width: 250, height: 250 } },
            (decodedText) => {
              html5QrCode.stop().then(() => {
                navigate(`/ver/${decodedText}`);
              });
            },
            (err) => {
              console.warn("Escaneo fallido:", err);
            }
          )
          .catch((err) => {
            setError("No se pudo iniciar la cámara: " + err);
          });
      }
    })
    .catch((err) => setError("No se encontraron cámaras: " + err));

  return () => {
    html5QrCode.stop().catch(() => {});
  };
}, [navigate]);



  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center text-center p-4">
      <h1 className="text-2xl font-bold text-purple-500 mb-4">Escaneando código QR...</h1>
      <div id="qr-reader" ref={qrRef} className="w-full max-w-sm" />
      {error && <p className="text-red-500 mt-4">{error}</p>}
    </div>
  );
}
