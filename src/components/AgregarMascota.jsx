import { useState } from "react";
import { collection, addDoc, Timestamp } from "firebase/firestore";
import { db, auth} from "../../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";

function AgregarMascota() {
  const [imagen, setImagen] = useState(null);

  const [usuario] = useAuthState(auth);
  const navigate = useNavigate();


  const [datos, setDatos] = useState({
    nombre: "",
    raza: "",
    descripcion: "",
    edad: "",
    ciudad: "",
    telefono: "",
    estado: "",
    especie: "",
    genero: "", 
    castracion: ""
  });

  const manejarCambio = (e) => {
    setDatos({ ...datos, [e.target.name]: e.target.value });
  };

  const manejarEnvio = async (e) => {
  e.preventDefault();

  // Validar teléfono argentino (ej: +5491123456789 o 11 2345 6789)
  const telefonoLimpio = datos.telefono.replace(/\D/g, ""); // Quita todo lo que no sea número
  const regexTelefonoAR = /^(54)?9?\d{10}$/; 
  // Explicación:
  // ^(54)? → puede empezar con 54 (código de país)
  // 9? → opcional el "9" que se usa en móviles
  // \d{10}$ → exactamente 10 dígitos para el número local

  if (!regexTelefonoAR.test(telefonoLimpio)) {
    alert("Por favor, ingrese un número de teléfono argentino válido");
    return;
  }

  try {
    let urlImagen = "";

    if (imagen) {
      const formData = new FormData();
      formData.append("file", imagen);
      formData.append("upload_preset", "mascotas");
      const res = await fetch(`https://api.cloudinary.com/v1_1/dvw0as71i/image/upload`, {
        method: "POST",
        body: formData
      });
      const data = await res.json();
      const urlOriginal = data.secure_url;
      const partes = urlOriginal.split("/upload/");
      urlImagen = `${partes[0]}/upload/c_thumb,g_face,w_300,h_300/${partes[1]}`;
    }

    const docRef = await addDoc(collection(db, "mascotas"), {
      ...datos,
      telefono: telefonoLimpio,
      imagen: urlImagen,
      userId: usuario.uid,
      creado: Timestamp.now()
    });

    setDatos({
      nombre: "",
      raza: "",
      descripcion: "",
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
    <div className="sm:p-4 p-10 max-w-md mx-auto">
      <h2 className="text-2xl text-purple-600 font-bold mb-4">Registrar mascota</h2>
      <form onSubmit={manejarEnvio} className="space-y-3">
        {/* Campos de texto */} 
        <input
  type="file"
  accept="image/*"
  onChange={(e) => setImagen(e.target.files[0])}
  className="border bg-white p-2 w-full rounded"
/>
        {["nombre", "raza", "descripcion", "edad", "ciudad"].map((campo) => (
          <input
            key={campo}
            type="text"
            name={campo}
            value={datos[campo]}
            onChange={manejarCambio}
            placeholder={campo.charAt(0).toUpperCase() + campo.slice(1)}
            className="border bg-white p-2 w-full rounded"
            required
          />
        ))}
    <div className="relative mb-4">
      <span className="absolute top-1/2 left-3 -translate-y-1/2 text-primary text-sm">+54 9</span>
      <input
            key="telefono"
            type="text"
            name="telefono"
            value={datos.telefono}
            onChange={manejarCambio}
            placeholder="1232456547"
            className="border bg-white p-2 w-full pl-20 rounded"
            required
          />
    </div>
       
<select
  name="especie"
  value={datos.especie}
  onChange={manejarCambio}
  className="border bg-white p-2 w-full rounded"
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
  className="border bg-white p-2 w-full rounded"
  required
>
  <option value="">Seleccionar estado</option>
  <option value="en adopcion">En adopción</option>
  <option value="perdida">Perdida</option>
  <option value=" ">-</option>
</select>
<select
  name="genero"
  value={datos.genero}
  onChange={manejarCambio}
  className="border bg-white p-2 w-full rounded"
  required
>
  <option value="">Sexo</option>
  <option value="macho">Macho</option>
  <option value="hembra">Hembra</option>
</select>

        <button type="submit" className="bg-purple-500 text-white px-4 py-2 rounded w-full">
          Guardar mascota
        </button>
      </form>
    </div>
  );
}

export default AgregarMascota;
