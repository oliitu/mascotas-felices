import { useEffect, useRef, useState } from "react";
import { Html5Qrcode } from "html5-qrcode";
import { useNavigate } from "react-router-dom";

export default function Escanear() {
  const qrRef = useRef(null);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const html5QrCode = new Html5Qrcode("qr-reader");

    // Función para iniciar el escáner con stream personalizado
    const startScanner = (stream) => {
      html5QrCode
        .start(
          { deviceId: undefined, facingMode: { exact: "environment" } },
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
    };

    // Intentar obtener stream con facingMode environment (trasera)
    navigator.mediaDevices
      .getUserMedia({ video: { facingMode: { exact: "environment" } } })
      .then((stream) => {
        // Aquí no usamos el stream directamente pero esto forzará la cámara trasera
        stream.getTracks().forEach((track) => track.stop()); // detenemos el stream ya que html5-qrcode lo manejará
        startScanner();
      })
      .catch((err) => {
        // Si falla, arrancamos sin constraints para que use cámara por defecto
        console.warn("No se pudo acceder a cámara trasera, se usa cámara por defecto", err);
        startScanner();
      });

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
