import { useEffect, useState, useRef } from "react";
import { Html5Qrcode } from "html5-qrcode";
import { useNavigate } from "react-router-dom";

function esAndroid() {
  return /Android/i.test(navigator.userAgent);
}

function esiOS() {
  return /iPhone|iPad|iPod/i.test(navigator.userAgent);
}

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
        navigate(`/ver/${decodedText}`,{ state: { origen: "escanear" } });
      }
    } catch {
      navigate(`/ver/${decodedText}`,{ state: { origen: "escanear" } });
    }
  };

  useEffect(() => {
    qrCodeRef.current = new Html5Qrcode("qr-reader");

    async function iniciarCamara() {
      try {
        if (esiOS()) {
          // iOS: usar facingMode directo
          await qrCodeRef.current.start(
            { facingMode: "environment" },
            { fps: 10, qrbox: { width: 250, height: 250 } },
            (decodedText) => {
              qrCodeRef.current
                .stop()
                .then(() => manejarNavegacion(decodedText))
                .catch(() => manejarNavegacion(decodedText));
            },
            (err) => {
              console.warn("Error escaneando:", err);
            }
          );

          const cams = await Html5Qrcode.getCameras();
          setDevices(cams);
          setCurrentCameraIndex(0);
        } else if (esAndroid()) {
          const cams = await Html5Qrcode.getCameras();
          if (!cams.length) {
            setError("No se encontraron cámaras.");
            return;
          }

          const traseras = cams.filter(
            (device) =>
              (device.facingMode === "environment" ||
                device.label.toLowerCase().includes("back") ||
                device.label.toLowerCase().includes("rear")) &&
              !device.label.toLowerCase().includes("wide") &&
              !device.label.toLowerCase().includes("ultra") &&
              !device.label.toLowerCase().includes("0.5")
          );

          const camSeleccionada = traseras.length ? traseras[0] : cams[0];

          await qrCodeRef.current.start(
            camSeleccionada.id,
            { fps: 10, qrbox: { width: 250, height: 250 } },
            (decodedText) => {
              qrCodeRef.current
                .stop()
                .then(() => manejarNavegacion(decodedText))
                .catch(() => manejarNavegacion(decodedText));
            },
            (err) => {
              console.warn("Error escaneando:", err);
            }
          );

          setDevices(cams);
          setCurrentCameraIndex(cams.findIndex((c) => c.id === camSeleccionada.id));
        } else {
          // Otros: intentar facingMode
          await qrCodeRef.current.start(
            { facingMode: "environment" },
            { fps: 10, qrbox: { width: 250, height: 250 } },
            (decodedText) => {
              qrCodeRef.current
                .stop()
                .then(() => manejarNavegacion(decodedText))
                .catch(() => manejarNavegacion(decodedText));
            },
            (err) => {
              console.warn("Error escaneando:");
            }
          );

          const cams = await Html5Qrcode.getCameras();
          setDevices(cams);
          setCurrentCameraIndex(0);
        }
      } catch (err) {
        setError("Error iniciando cámara: ");
      }
    }

    iniciarCamara();

    return () => {
      if (qrCodeRef.current) {
        qrCodeRef.current.stop().catch(() => {});
        qrCodeRef.current.clear();
      }
    };
  }, [navigate]);

  // Función para cambiar cámara (solo si hay >1)
  const cambiarCamara = async () => {
    if (!qrCodeRef.current || devices.length <= 1) return;

    const siguienteIndex = (currentCameraIndex + 1) % devices.length;
    try {
      await qrCodeRef.current.stop();
    } catch {}

    try {
      await qrCodeRef.current.start(
        devices[siguienteIndex].id,
        { fps: 10, qrbox: { width: 250, height: 250 } },
        (decodedText) => {
          qrCodeRef.current
            .stop()
            .then(() => manejarNavegacion(decodedText))
            .catch(() => manejarNavegacion(decodedText));
        },
        (err) => {
          console.warn("Error escaneando:", err);
        }
      );
      setCurrentCameraIndex(siguienteIndex);
    } catch (err) {
      setError("Error cambiando cámara: " + err);
    }
  };

  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center text-center p-4">
      <h1 className="text-2xl font-bold text-purple-500 mb-4">
        Escaneando código QR...
      </h1>

      {devices.length > 1 && (
        <button
          onClick={cambiarCamara}
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
