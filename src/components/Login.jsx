import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase";
import { useNavigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [clave, setClave] = useState("");
  const navigate = useNavigate();

  const manejarLogin = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, clave);
      navigate("/perfil");
    } catch (error) {
      alert(`Error: ${error.code}`);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center pb-20">
    <form onSubmit={manejarLogin} className="p-4 max-w-sm mx-auto text-center">
      <h2 className="text-2xl font-bold mb-4">Iniciar sesión</h2>
      <input
        type="email"
        placeholder="Correo"
        className="border bg-white  p-2 w-full mb-2"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Contraseña"
        className="border bg-white  p-2 w-full mb-4"
        value={clave}
        onChange={(e) => setClave(e.target.value)}
      />
      <button type="submit" className="bg-purple-500 hover:bg-purple-700 text-white px-4 py-2 rounded w-full mb-2">
        Ingresar
      </button>

      {/* 🔸 Botón para ir al registro */}
      <p className="mt-2">¿No tenés cuenta?</p>
      <button
        type="button"
        onClick={() => navigate("/registro")}
        className="text-purple-500 hover:text-purple-700 underline mt-1"
      >
        Registrarme
      </button>
    </form>
    
      </div>
  );
}

export default Login;
