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
  Heart,
  Mars,
  Venus,
  Check,
  Loader2,
} from "lucide-react";

function AgregarMascota() {
  const [imagen, setImagen] = useState(null);
  const [preview, setPreview] = useState(null);
  const [subiendoImagen, setSubiendoImagen] = useState(false);
  const [guardando, setGuardando] = useState(false);
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

  const manejarImagen = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImagen(file);
      setPreview(URL.createObjectURL(file)); 
    }
  };

  const manejarEnvio = async (e) => {
    e.preventDefault();
    if (guardando || subiendoImagen) return;

    const telefonoLimpio = datos.telefono ? datos.telefono.replace(/\D/g, "") : "";
    const regexTelefonoAR = /^(54)?9?\d{10}$/;
    if (telefonoLimpio && !regexTelefonoAR.test(telefonoLimpio)) {
      alert("Por favor, ingrese un número de teléfono argentino válido");
      return;
    }

    setGuardando(true);
    try {
      let urlImagen = "";

      if (imagen) {
        setSubiendoImagen(true);
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
        setSubiendoImagen(false);
      }

      const docRef = await addDoc(collection(db, "mascotas"), {
        ...datos,
        telefono: telefonoLimpio || null,
        imagen: urlImagen,
        userId: usuario.uid,
        creado: Timestamp.now(),
      });

      navigate(`/mascota/${docRef.id}`);
    } catch (error) {
      console.error(error);
      alert("Error al guardar la mascota");
    } finally {
      setGuardando(false);
      setSubiendoImagen(false);
    }
  };

  return (
    <div className="sm:p-4 p-6 max-w-md mx-auto">
      <h2 className="text-2xl text-purple-600 font-bold mb-6 flex items-center gap-2">
        Registrar mascota
      </h2>

      <form onSubmit={manejarEnvio} className="space-y-4">
        {/* Inputs texto */}
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

        <div className="flex items-center border rounded p-2 bg-white">
          <Phone className="text-purple-400 mr-2" />
          <input
            type="text"
            name="telefono"
            value={datos.telefono}
            onChange={manejarCambio}
            placeholder="Teléfono (opcional)"
            className="w-full outline-none"
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

        {/* Sección especie / género */}
        <div className="w-full flex justify-center">
          <div className="flex sm:gap-10 items-center">
            <div className="mr-3 align-middle">
              <div className="mb-5">
                <p className="text-sm font-semibold text-gray-700 text-center mb-3">
                  Especie
                </p>
                <div className="flex gap-4">
                  <button
                    type="button"
                    onClick={() => setDatos({ ...datos, especie: "perro" })}
                    className={`flex flex-col items-center p-3 border rounded-lg transition ${
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
                    className={`flex flex-col items-center p-3 border rounded-lg transition ${
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

              <div>
                <p className="text-sm font-semibold text-gray-700 text-center my-2">
                  Sexo
                </p>
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

            {/* Subir imagen */}
            <div className="flex flex-col items-center gap-2 relative">
              {preview ? (
                <div className="relative w-32 h-32 rounded-lg overflow-hidden border">
                  <img
                    src={preview}
                    alt="Vista previa"
                    className="w-full h-full object-cover"
                  />
                  {subiendoImagen && (
                    <div className="absolute inset-0 bg-black/60 flex flex-col items-center justify-center text-white text-xs">
                      <Loader2 className="animate-spin mb-1" />
                      Subiendo...
                    </div>
                  )}
                </div>
              ) : (
                <label className="flex flex-col items-center gap-2 rounded-lg border p-4 cursor-pointer bg-white hover:bg-purple-50">
                  <ImagePlus className="h-10 w-10 text-purple-500" />
                  <span className="text-xs text-gray-600">Subir foto</span>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={manejarImagen}
                    className="hidden"
                    disabled={subiendoImagen || guardando}
                  />
                </label>
              )}
            </div>
          </div>
        </div>

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

        <button
          type="submit"
          disabled={guardando || subiendoImagen}
          className={`w-full flex justify-center items-center gap-2 px-4 py-2 rounded shadow transition ${
            guardando || subiendoImagen
              ? "bg-purple-300 cursor-not-allowed"
              : "bg-purple-500 hover:bg-purple-600 text-white"
          }`}
        >
          {(guardando || subiendoImagen) && (
            <Loader2 className="animate-spin h-4 w-4" />
          )}
          {guardando
            ? "Guardando mascota..."
            : subiendoImagen
            ? "Subiendo imagen..."
            : "Guardar mascota"}
        </button>
      </form>
    </div>
  );
}

export default AgregarMascota;
