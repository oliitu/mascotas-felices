import { useState } from "react";
import { collection, addDoc, Timestamp } from "firebase/firestore";
import { db, auth } from "../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";



function Mascotas() {
  const [usuario] = useAuthState(auth);
   const navigate = useNavigate();

  const [datos, setDatos] = useState({
    nombre: "",
    raza: "",
    descripcion: "",
    color: "",
    edad: "",
    ciudad: "",
    dueno: "",
    telefono: "",
    estado: "",
  });

  const manejarCambio = (e) => {
    setDatos({ ...datos, [e.target.name]: e.target.value });
  };

  const manejarEnvio = async (e) => {
  e.preventDefault();
  try {
    const docRef = await addDoc(collection(db, "mascotas"), {
      ...datos,
      userId: usuario.uid,
      creado: Timestamp.now()
    });

    alert("Mascota registrada ✅");

    setDatos({
      nombre: "",
      raza: "",
      descripcion: "",
      color: "",
      edad: "",
      ciudad: "",
      dueno: "",
      telefono: "",
      estado: "",
    });

    // ✅ Redirige al perfil de la nueva mascota
    navigate(`/mascota/${docRef.id}`);

  } catch (error) {
    console.error(error);
    alert("Error al guardar la mascota");
  }
};


  return (
    
    <div className="p-4 max-w-md mx-auto">
        <div className="flex justify-end mb-4">
        <button
          onClick={() => signOut(auth)}
          className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700 transition"
        >
          Cerrar sesión
        </button>
      </div>

      <h2 className="text-2xl font-bold mb-4">Registrar mascota</h2>
      <form onSubmit={manejarEnvio} className="space-y-3">
        {["nombre", "raza", "descripcion", "color", "edad", "ciudad", "dueno", "telefono", "estado"].map((campo) => (
          <input
            key={campo}
            type="text"
            name={campo}
            value={datos[campo]}
            onChange={manejarCambio}
            placeholder={campo.charAt(0).toUpperCase() + campo.slice(1)}
            className="border p-2 w-full rounded"
            required
          />
        ))}
        <button type="submit" className="bg-purple-500 text-white px-4 py-2 rounded w-full">
          Guardar mascota
        </button>
      </form>
    </div>
  );
}

export default Mascotas;
