import { useEffect, useState, useRef } from "react";
import { Html5Qrcode } from "html5-qrcode";
import { useNavigate } from "react-router-dom";

export default function Escanear() {
  const [error, setError] = useState("");
  const [devices, setDevices] = useState([]);
  const [currentCameraIndex, setCurrentCameraIndex] = useState(0);

  const qrCodeRef = useRef(null);
  const navigate = useNavigate();

  const manejarNavegacion = (decodedText) => {
    try {
      const url = new URL(decodedText);
      if (
        url.hostname.includes("mascotas-felicess.netlify.app") &&
        url.pathname.startsWith("/ver/")
      ) {
        window.location.href = decodedText;
      } else {
        navigate(`/ver/${decodedText}`);
      }
    } catch {
      navigate(`/ver/${decodedText}`);
    }
  };

  useEffect(() => {
    Html5Qrcode.getCameras()
      .then((cameras) => {
        if (cameras && cameras.length) {
          // Filtrar cámaras traseras no ultra wide
          const filtered = cameras.filter(
            (device) =>
              (device.facingMode === "environment" ||
                device.label.toLowerCase().includes("back") ||
                device.label.toLowerCase().includes("rear")) &&
              !device.label.toLowerCase().includes("wide") &&
              !device.label.toLowerCase().includes("ultra") &&
              !device.label.toLowerCase().includes("0.5")
          );
          setDevices(filtered.length ? filtered : cameras);
          setCurrentCameraIndex(0);
        } else {
          setError("No se encontraron cámaras.");
        }
      })
      .catch((err) => setError("Error al obtener cámaras: " + err));

    qrCodeRef.current = new Html5Qrcode("qr-reader");

    return () => {
      if (qrCodeRef.current) {
        qrCodeRef.current.stop().catch(() => {});
        qrCodeRef.current.clear();
      }
    };
  }, []);

  useEffect(() => {
    if (!qrCodeRef.current || devices.length === 0) return;

    // Parar si ya está corriendo
    qrCodeRef.current
      .stop()
      .catch(() => {})
      .finally(() => {
        const deviceId = devices[currentCameraIndex].id;

        qrCodeRef.current
          .start(
            deviceId,
            { fps: 10, qrbox: { width: 250, height: 250 } },
            (decodedText) => {
              qrCodeRef.current
                .stop()
                .then(() => manejarNavegacion(decodedText))
                .catch(() => manejarNavegacion(decodedText));
            },
            (err) => {
              // Opcional: console.warn("Error escaneando:", err);
            }
          )
          .catch((err) => setError("Error iniciando cámara: " + err));
      });
  }, [currentCameraIndex, devices]);

  const toggleCamera = () => {
    if (devices.length <= 1) return;
    setCurrentCameraIndex((i) => (i + 1) % devices.length);
  };

  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center text-center p-4">
      <h1 className="text-2xl font-bold text-purple-500 mb-4">
        Escaneando código QR...
      </h1>

      {devices.length > 1 && (
        <button
          onClick={toggleCamera}
          className="mb-4 px-4 py-2 bg-purple-500 text-white rounded hover:bg-purple-600 transition"
        >
          Cambiar cámara
        </button>
      )}

      <div id="qr-reader" className="w-full max-w-sm" />
      {error && <p className="text-red-500 mt-4">{error}</p>}
    </div>
  );
}
