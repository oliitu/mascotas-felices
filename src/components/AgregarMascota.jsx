import { useState } from "react";
import { collection, addDoc, Timestamp } from "firebase/firestore";
import { db, auth } from "../../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import {
  Dog,
  Cat,
  Calendar,
  MapPin,
  Phone,
  ImagePlus,
  PawPrint,
  Heart,
  Mars,
  Venus,
  Check
} from "lucide-react";

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
  });

  const manejarCambio = (e) => {
    setDatos({ ...datos, [e.target.name]: e.target.value });
  };

  const manejarEnvio = async (e) => {
    e.preventDefault();

    const telefonoLimpio = datos.telefono.replace(/\D/g, "");
    const regexTelefonoAR = /^(54)?9?\d{10}$/;

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
        const res = await fetch(
          `https://api.cloudinary.com/v1_1/dvw0as71i/image/upload`,
          { method: "POST", body: formData }
        );
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
        creado: Timestamp.now(),
      });

      navigate(`/mascota/${docRef.id}`);
    } catch (error) {
      console.error(error);
      alert("Error al guardar la mascota");
    }
  };

  return (
    <div className="sm:p-4 p-6 max-w-md mx-auto">
      <h2 className="text-2xl text-purple-600 font-bold mb-6 flex items-center gap-2">
        Registrar mascota
      </h2>

      <form onSubmit={manejarEnvio} className="space-y-4">
        {/* Imagen */}
        

        {/* Nombre */}
        <div className="flex items-center border rounded p-2 bg-white">
          <Check className="text-purple-400 mr-2" />
          <input
            type="text"
            name="nombre"
            value={datos.nombre}
            onChange={manejarCambio}
            placeholder="Nombre"
            className="w-full outline-none"
            required
          />
        </div>

        {/* Raza */}
        <div className="flex items-center border rounded p-2 bg-white">
          <Heart className="text-purple-400 mr-2" />
          <input
            type="text"
            name="raza"
            value={datos.raza}
            onChange={manejarCambio}
            placeholder="Raza"
            className="w-full outline-none"
          />
        </div>

        {/* Edad */}
        <div className="flex items-center border rounded p-2 bg-white">
          <Calendar className="text-purple-400 mr-2" />
          <input
            type="text"
            name="edad"
            value={datos.edad}
            onChange={manejarCambio}
            placeholder="Edad"
            className="w-full outline-none"
          />
        </div>

        {/* Ciudad */}
        <div className="flex items-center border rounded p-2 bg-white">
          <MapPin className="text-purple-400 mr-2" />
          <input
            type="text"
            name="ciudad"
            value={datos.ciudad}
            onChange={manejarCambio}
            placeholder="Ciudad"
            className="w-full outline-none"
          />
        </div>
        
        {/* Teléfono */}
        <div className="flex items-center border rounded p-2 bg-white">
          <Phone className="text-purple-400 mr-2" />
          <input
            type="text"
            name="telefono"
            value={datos.telefono}
            onChange={manejarCambio}
            placeholder="Teléfono"
            className="w-full outline-none"
            required
          />
        </div>
        <div className="flex items-center border rounded p-2 bg-white">
         
  <textarea
    name="descripcion"
    value={datos.descripcion}
    onChange={manejarCambio}
    placeholder="Descripción extra"
    className="w-full rounded p-2 outline-none resize-none h-24"
  />
</div>
<div className="w-full flex justify-center">
        <div className="flex gap-10 items-center">
          <div className="mr-3 align-middle">
          {/* Especie */}
        <div className="mb-5">
          <p className="text-sm font-semibold text-gray-700 text-center mb-3">Especie</p>
          <div className="flex gap-4">
            <button
              type="button"
              onClick={() => setDatos({ ...datos, especie: "perro" })}
              className={`flex flex-col items-center p-3  px-4.5 border rounded-lg transition ${
                datos.especie === "perro"
                  ? "bg-purple-100 border-purple-500 text-purple-600"
                  : "bg-white text-gray-500 hover:bg-purple-50"
              }`}
            >
              <Dog size={24} />
              <span className="text-xs">Perro</span>
            </button>
            <button
              type="button"
              onClick={() => setDatos({ ...datos, especie: "gato" })}
              className={`flex flex-col items-center p-3 px-5 border rounded-lg transition ${
                datos.especie === "gato"
                  ? "bg-purple-100 border-purple-500 text-purple-600"
                  : "bg-white text-gray-500 hover:bg-purple-50"
              }`}
            >
              <Cat size={24} />
              <span className="text-xs">Gato</span>
            </button>
          </div>
        </div>

        {/* Género */}
        <div>
          <p className="text-sm font-semibold text-gray-700 text-center my-2">Sexo</p>
          <div className="flex gap-4">
            <button
              type="button"
              onClick={() => setDatos({ ...datos, genero: "macho" })}
              className={`flex flex-col items-center p-3 border rounded-lg transition ${
                datos.genero === "macho"
                  ? "bg-purple-100 border-purple-500 text-purple-600"
                  : "bg-white text-gray-500 hover:bg-purple-50"
              }`}
            >
              <Mars size={24} />
              <span className="text-xs">Macho</span>
            </button>
            <button
              type="button"
              onClick={() => setDatos({ ...datos, genero: "hembra" })}
              className={`flex flex-col items-center p-3 border rounded-lg transition ${
                datos.genero === "hembra"
                  ? "bg-purple-100 border-purple-500 text-purple-600"
                  : "bg-white text-gray-500 hover:bg-purple-50"
              }`}
            >
              <Venus size={24} />
              <span className="text-xs">Hembra</span>
            </button>
          </div>
        </div>
        </div>
        <div className="w-full flex justify-center">
  <label className="flex flex-col items-center gap-2 rounded-lg border p-4 cursor-pointer bg-white hover:bg-purple-50">
    <ImagePlus className="h-10 w-10 text-purple-500" />
    <span className="text-xs text-gray-600">Subir foto</span>
    <input
      type="file"
      accept="image/*"
      onChange={(e) => setImagen(e.target.files[0])}
      className="hidden"
    />
  </label>
</div>

        </div>
        </div>

        {/* Estado */}
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
          <option value="-">-</option>
        </select>

        {/* Botón */}
        <button
          type="submit"
          className="bg-purple-500 text-white px-4 py-2 rounded w-full shadow hover:bg-purple-600 transition"
        >
          Guardar mascota
        </button>
      </form>
    </div>
  );
}

export default AgregarMascota;
