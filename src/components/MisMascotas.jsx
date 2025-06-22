import { useEffect, useState, useRef } from "react";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db, auth } from "../../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import { QRCodeCanvas } from "qrcode.react";

function MisMascotas() {
  const [usuario] = useAuthState(auth);
  const [mascotas, setMascotas] = useState([]);
  const navigate = useNavigate();
  const qrRefs = useRef({}); // un ref por mascota

  useEffect(() => {
    const obtenerMascotas = async () => {
      if (!usuario) return;

      const q = query(collection(db, "mascotas"), where("userId", "==", usuario.uid));
      const querySnapshot = await getDocs(q);
      const lista = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setMascotas(lista);
    };

    obtenerMascotas();
  }, [usuario]);

  // Función para descargar el QR
  const descargarQR = (id, nombre) => {
    const canvas = qrRefs.current[id]?.querySelector("canvas");
    if (!canvas) return;

    const url = canvas.toDataURL("image/png");
    const link = document.createElement("a");
    link.href = url;
    link.download = `qr-${nombre}.png`;
    link.click();
  };

  return (
    <div className="p-4 max-w-2xl mx-auto justify-items-center">
      <h2 className="text-3xl font-bold mb-6 text-center">Mis Mascotas</h2>
      {mascotas.length === 0 ? (
        <p className="text-center">Todavía no cargaste mascotas.</p>
      ) : (
        <div className="space-y-4">
          {mascotas.map((mascota) => (
            <div key={mascota.id} className="border rounded p-4 shadow-sm bg-white">
              <h3 className="text-xl font-bold mb-1">{mascota.nombre}</h3>
              {mascota.imagen && (
 <img
  src={mascota.imagen}
  alt={mascota.nombre}
  className="w-32 h-32 object-cover rounded-full mx-auto"
/>

)}

              <p className="text-gray-700">Raza: {mascota.raza}</p>
              <p className="text-gray-700">Edad: {mascota.edad}</p>

              <button
                onClick={() => navigate(`/editar/${mascota.id}`)}
                className="mt-2 bg-purple-500 text-white rounded hover:bg-purple-700 px-4 py-1"
              >
                Editar
              </button>

              <div className="mt-4 text-center" ref={(el) => (qrRefs.current[mascota.id] = el)}>
                <p className="text-sm font-medium mb-1">QR del perfil</p>
                <div className="inline-block p-2 bg-white shadow rounded">
                  <QRCodeCanvas value={mascota.id} size={100} />
                </div>
                <button
                  onClick={() => descargarQR(mascota.id, mascota.nombre)}
                  className="mt-2 px-3 py-1 text-sm bg-purple-500 text-white rounded hover:bg-purple-700"
                >
                  Descargar QR
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
      <button
        onClick={() => navigate(`/registrar-mascota`)}
        className="mt-6 bg-purple-500 text-white rounded hover:bg-purple-700 px-4 py-2 block mx-auto"
      >
        Agregar Mascota
      </button>
    </div>
  );
}

export default MisMascotas;
