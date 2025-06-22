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
          const cameraId = devices[0].id;
          html5QrCode
            .start(
              cameraId,
              { fps: 10, qrbox: { width: 250, height: 250 } },
              (decodedText) => {
                try {
                  const url = new URL(decodedText);
                  let rutaRelativa = url.pathname + url.search + url.hash;

                  // Asegurarse que empiece con "/" y no tenga doble slash
                  if (!rutaRelativa.startsWith("/")) {
                    rutaRelativa = "/" + rutaRelativa;
                  }
                  while (rutaRelativa.startsWith("//")) {
                    rutaRelativa = rutaRelativa.substring(1);
                  }

                  html5QrCode.stop().then(() => {
                    navigate(rutaRelativa);
                  });
                } catch {
                  // Si no es una URL válida, navegar con decodedText tal cual (mejor si es solo id)
                  html5QrCode.stop().then(() => {
                    navigate(`/ver/${decodedText}`);
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
