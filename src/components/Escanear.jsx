import { useEffect, useState } from "react";
import { Html5Qrcode } from "html5-qrcode";
import { useNavigate } from "react-router-dom";

export default function Escanear() {
  const [error, setError] = useState("");
  const [devices, setDevices] = useState([]);
  const [selectedDeviceId, setSelectedDeviceId] = useState(null);
  const [html5QrCode, setHtml5QrCode] = useState(null);

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
    const qrCode = new Html5Qrcode("qr-reader");
    setHtml5QrCode(qrCode);

    Html5Qrcode.getCameras()
      .then((cameras) => {
        if (cameras && cameras.length) {
          setDevices(cameras);
          // Intentar seleccionar automáticamente la cámara trasera no ultra wide
          const backCamera = cameras.find(
            (device) =>
              (device.facingMode === "environment" ||
                device.label.toLowerCase().includes("back") ||
                device.label.toLowerCase().includes("rear")) &&
              !device.label.toLowerCase().includes("wide") &&
              !device.label.toLowerCase().includes("ultra") &&
              !device.label.toLowerCase().includes("0.5")
          );
          setSelectedDeviceId(backCamera ? backCamera.id : cameras[0].id);
        } else {
          setError("No se encontraron cámaras.");
        }
      })
      .catch((err) => {
        setError("Error al obtener cámaras: " + err);
      });

    return () => {
      qrCode.stop().catch(() => {});
      qrCode.clear();
    };
  }, []);

  useEffect(() => {
    if (!html5QrCode || !selectedDeviceId) return;

    html5QrCode
      .start(
        selectedDeviceId,
        { fps: 10, qrbox: { width: 250, height: 250 } },
        (decodedText) => {
          html5QrCode.stop().then(() => manejarNavegacion(decodedText));
        },
        (err) => console.warn("Escaneo fallido:", err)
      )
      .catch((err) => {
        setError("Error iniciando cámara: " + err);
      });

    return () => {
      html5QrCode.stop().catch(() => {});
    };
  }, [html5QrCode, selectedDeviceId]);

  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center text-center p-4">
      <h1 className="text-2xl font-bold text-purple-500 mb-4">
        Escaneando código QR...
      </h1>

      {devices.length > 1 && (
        <div className="mb-4">
          <label className="mr-2 font-semibold">Elegí cámara:</label>
          <select
            value={selectedDeviceId}
            onChange={(e) => setSelectedDeviceId(e.target.value)}
            className="border border-gray-300 rounded px-2 py-1"
          >
            {devices.map((device) => (
              <option key={device.id} value={device.id}>
                {device.label || device.id}
              </option>
            ))}
          </select>
        </div>
      )}

      <div id="qr-reader" className="w-full max-w-sm" />
      {error && <p className="text-red-500 mt-4">{error}</p>}
    </div>
  );
}
