import { useParams, useNavigate } from "react-router-dom";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../../firebase";
import { useEffect, useState } from "react";
import { deleteDoc } from "firebase/firestore";


function EditarMascota() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [datos, setDatos] = useState(null);

  useEffect(() => {
    const obtenerMascota = async () => {
      const ref = doc(db, "mascotas", id);
      const snap = await getDoc(ref);
      if (snap.exists()) {
        setDatos(snap.data());
      } else {
        alert("Mascota no encontrada");
        navigate("/mis-mascotas");
      }
    };
    obtenerMascota();
  }, [id, navigate]);

  const manejarCambio = (e) => {
    setDatos({ ...datos, [e.target.name]: e.target.value });
  };

  const manejarGuardar = async (e) => {
    e.preventDefault();
    try {
      const ref = doc(db, "mascotas", id);
      await updateDoc(ref, datos);
      navigate("/mis-mascotas");
    } catch (error) {
      console.error(error);
      alert("Error al guardar los cambios");
    }
  };
  const manejarEliminar = async () => {
  const confirmar = window.confirm("¿Estás segura de que querés eliminar esta mascota?");
  if (!confirmar) return;

  try {
    const ref = doc(db, "mascotas", id);
    await deleteDoc(ref);
    alert("Mascota eliminada 🗑️");
    navigate("/mis-mascotas");
  } catch (error) {
    console.error(error);
    alert("Error al eliminar la mascota");
  }
};

  if (!datos) return <p className="text-center mt-8">Cargando...</p>;

  return (
    <div className="p-4 max-w-md mx-auto">
      <h2 className="text-2xl text-purple-600 font-bold mb-4 text-center">Editar Mascota</h2>
      <form onSubmit={manejarGuardar} className="space-y-3">
  {/* Campos de texto */}
  {["nombre", "raza", "descripcion", "edad", "ciudad", "telefono"].map((campo) => (
    <input
      key={campo}
      type="text"
      name={campo}
      value={datos[campo] || ""}
      onChange={manejarCambio}
      placeholder={campo.charAt(0).toUpperCase() + campo.slice(1)}
      className="border bg-white p-2 w-full rounded"
      required
    />
  ))}

  <select
    name="especie"
    value={datos.especie || ""}
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
    value={datos.estado || ""}
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
    value={datos.genero || ""}
    onChange={manejarCambio}
    className="border bg-white p-2 w-full rounded"
    required
  >
    <option value="">Sexo</option>
    <option value="macho">Macho</option>
    <option value="hembra">Hembra</option>
  </select>


  {/* Botones */}
  <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded w-full">
    Guardar cambios
  </button>

  <button
    type="button"
    onClick={manejarEliminar}
    className="bg-red-600 text-white px-4 py-2 rounded w-full hover:bg-red-700"
  >
    Eliminar mascota
  </button>
</form>

    </div>
  );
}

export default EditarMascota;
