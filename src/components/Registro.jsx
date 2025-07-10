import { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase";
import { useNavigate } from "react-router-dom";

function Registro() {
  const [email, setEmail] = useState("");
  const [clave, setClave] = useState("");
  const navigate = useNavigate();

  const manejarRegistro = async (e) => {
    e.preventDefault();
    try {
      await createUserWithEmailAndPassword(auth, email, clave);
      alert("Usuario registrado exitosamente ✅");
      navigate("/"); // redirigí después del registro
    } catch (error) {
      console.error(error.code, error.message);
      alert(`Error: ${error.code}`);
    }
  };

  return (
    <div>
    <form onSubmit={manejarRegistro} className="p-4 max-w-sm mx-auto text-center">
      <h2 className="text-xl font-bold mb-4">Registrarse</h2>
      <input
        type="user"
        placeholder="Nombre"
        className="border p-2 w-full mb-2"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="email"
        placeholder="Correo electrónico"
        className="border p-2 w-full mb-2"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Contraseña"
        className="border p-2 w-full mb-4"
        value={clave}
        onChange={(e) => setClave(e.target.value)}
      />
      <button type="submit" className="bg-purple-500 hover:bg-purple-700 text-white px-4 py-2 rounded w-full">
        Crear cuenta
      </button>
    
    <p className="mt-2">¿Ya tenés una cuenta?</p>
      <button
        type="button"
        onClick={() => navigate("/login")}
        className="text-purple-500 hover:text-purple-700 underline mt-1"
      >
        Iniciar sesión
      </button>
      </form>
      
      </div>
    
  );
}

export default Registro;
