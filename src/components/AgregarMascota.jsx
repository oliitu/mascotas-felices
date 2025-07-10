import { useState } from "react";
import { collection, addDoc, Timestamp } from "firebase/firestore";
import { db, auth, storage } from "../../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage"; // 👈

function AgregarMascota() {
  const [imagen, setImagen] = useState(null);

  const [usuario] = useAuthState(auth);
  const navigate = useNavigate();


  const [datos, setDatos] = useState({
    nombre: "",
    raza: "",
    descripcion: "",
    color: "",
    edad: "",
    ciudad: "",
    telefono: "",
    estado: "",
    especie: "",
    genero: "",
  });

  const manejarCambio = (e) => {
    setDatos({ ...datos, [e.target.name]: e.target.value });
  };

  const manejarEnvio = async (e) => {
    e.preventDefault();

    try {
      let urlImagen = "";

if (imagen) {
  const formData = new FormData();
  formData.append("file", imagen);
  formData.append("upload_preset", "mascotas"); // ⚠️ lo vas a configurar ahora
  const res = await fetch(`https://api.cloudinary.com/v1_1/dvw0as71i/image/upload`, {
    method: "POST",
    body: formData
  });
  const data = await res.json();
const urlOriginal = data.secure_url;
const partes = urlOriginal.split("/upload/");
const urlTransformada = `${partes[0]}/upload/c_thumb,g_face,w_300,h_300/${partes[1]}`;
urlImagen = urlTransformada;


}

      // 👉 guardá los datos en Firestore incluyendo la URL
      const docRef = await addDoc(collection(db, "mascotas"), {
  ...datos,
  imagen: urlImagen,
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
        telefono: "",
      });
      setImagen(null);

      navigate(`/mascota/${docRef.id}`);
    } catch (error) {
      console.error(error);
      alert("Error al guardar la mascota");
    }
  };

  return (
    <div className="p-4 max-w-md mx-auto">
      <h2 className="text-2xl font-bold mb-4">Registrar mascota</h2>
      <form onSubmit={manejarEnvio} className="space-y-3">
        {/* Campos de texto */}
        {["nombre", "raza", "descripcion", "color", "edad", "ciudad", "telefono"].map((campo) => (
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

        <input
  type="file"
  accept="image/*"
  onChange={(e) => setImagen(e.target.files[0])}
  className="border p-2 w-full rounded"
/>
<select
  name="especie"
  value={datos.especie}
  onChange={manejarCambio}
  className="border p-2 w-full rounded"
  required
>
  <option value="">Seleccionar especie</option>
  <option value="perro">Perro</option>
  <option value="gato">Gato</option>
</select>

<select
  name="estado"
  value={datos.estado}
  onChange={manejarCambio}
  className="border p-2 w-full rounded"
  required
>
  <option value="">Seleccionar estado</option>
  <option value="en adopcion">En adopción</option>
  <option value="perdida">Perdida</option>
  <option value="-">-</option>
</select>
<select
  name="genero"
  value={datos.genero}
  onChange={manejarCambio}
  className="border p-2 w-full rounded"
  required
>
  <option value="">Genero</option>
  <option value="macho">Macho</option>
  <option value="hembra">Hembra</option>
  <option value="-">-</option>
</select>


        <button type="submit" className="bg-purple-500 text-white px-4 py-2 rounded w-full">
          Guardar mascota
        </button>
      </form>
    </div>
  );
}

export default AgregarMascota;
