import { useParams } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../firebase";
import { useEffect, useState, useRef } from "react";
import { QRCodeCanvas } from "qrcode.react";
import  {Mars, Venus} from "lucide-react"; 

function PerfilMascota() {
  const { id } = useParams();
  const [mascota, setMascota] = useState(null);
  const qrRef = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      const docRef = doc(db, "mascotas", id);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setMascota(docSnap.data());
      }
    };
    fetchData();
  }, [id]);

  if (!mascota) return <p>Cargando...</p>;

  const perfilURL = `https://mascotas-felicess.netlify.app/ver/${id}`;


  // 🖼 Función para descargar el código QR
  const descargarQR = () => {
    const canvas = qrRef.current.querySelector("canvas");
    const url = canvas.toDataURL("image/png");

    const link = document.createElement("a");
    link.href = url;
    link.download = `qr-${mascota.nombre}.png`;
    link.click();
  };

  return (
    <div className="p-4 max-w-md mx-auto bg-white rounded-lg shadow">
      <h1 className="text-2xl font-bold mb-4">{mascota.nombre}</h1>
   {mascota.imagen && (
  <img
  src={mascota.imagen}
  alt={mascota.nombre}
  className="w-32 h-32 object-cover rounded-full mx-auto"
/>

)}

      <p>{mascota.descripcion}</p>
      {mascota.genero && (
  <p className="flex items-center gap-2">
    {" "}
    {mascota.genero === "macho" ? (
      <span className="flex items-center text-blue-600"><Mars className="w-4 h-4 mr-1" /> </span>
    ) : (
      <span className="flex items-center text-pink-600"><Venus className="w-4 h-4 mr-1" /> </span>
    )}
  </p>
)}
      <p><strong>Raza:</strong> {mascota.raza}</p>
      <p><strong>Edad:</strong> {mascota.edad}</p>
      <p><strong>Ciudad:</strong> {mascota.ciudad}</p>
      <p><strong>Teléfono:</strong> {mascota.telefono}</p>
      <p>{mascota.estado}</p>

      <div className="mt-6 text-center" ref={qrRef}>
  <p className="mb-2 font-semibold">Escaneá este código QR para ver el perfil:</p>
  <div className="p-2 bg-white  rounded">
    <div className="flex flex-col drop-shadow-xl items-center gap-2">
  <QRCodeCanvas value={perfilURL} size={180} />
  
</div>

  </div>
  <button
    onClick={descargarQR}
    className="mt-4 px-4 py-2 bg-purple-500 text-white rounded hover:bg-purple-700 transition"
  >
    Descargar QR
  </button>
</div>

    </div>
  );
}

export default PerfilMascota;
