import { useNavigate } from "react-router-dom";
import { Info, PawPrint, Download, Users } from "lucide-react";

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-100 to-purple-200 text-gray-800">
      {/* Hero Section */}
      <section
        id="inicio"
        className="flex flex-col items-center justify-center text-center px-6 pb-16 pt-10 sm:pt-16"
      >
        {/* Icono grande */}
        <div className="bg-white p-0 sm:p-4 rounded-full shadow-lg mb-4">
          <img className=" p-4 h-25" src="/icons/favicon.svg"></img>
        </div>

        <h2 className="text-3xl sm:text-5xl font-bold text-purple-600 mb-4">
          ¡Bienvenido a Mascotas Felices!
        </h2>
        <p className="text-base sm:text-lg max-w-md mb-8 text-gray-700">
          "Las mascotas no son nuestra vida entera, pero hacen que nuestra vida esté completa."
        </p>

        {/* Botones */}
        <div className="flex flex-col gap-3 w-full max-w-xs">
          <button
            onClick={() => navigate("/mis-mascotas")}
            className="flex items-center justify-center gap-2 bg-purple-500 hover:bg-purple-600 text-white font-semibold py-3 px-6 rounded-full shadow-md transition"
          >
            <PawPrint size={20} /> Ver mis mascotas
          </button>
          <button
            onClick={() => navigate("/tutorial")}
            className="flex items-center justify-center gap-2 bg-purple-500 hover:bg-purple-600 text-white font-semibold py-3 px-6 rounded-full shadow-md transition"
          >
            <Download size={20} /> Cómo descargar la app
          </button>
          <button
            onClick={() => navigate("/que-es")}
            className="flex items-center justify-center gap-2 bg-white hover:bg-purple-100 text-purple-600 font-semibold py-3 px-6 rounded-full shadow-md border border-purple-300 transition"
          >
            <Info size={20} /> ¿Qué es "Mascotas Felices"?
          </button>
          <button
            onClick={() => navigate("/quienes-somos")}
            className="flex items-center justify-center gap-2 bg-white hover:bg-purple-100 text-purple-600 font-semibold py-3 px-6 rounded-full shadow-md border border-purple-300 transition"
          >
            <Users size={20} /> ¿Quiénes somos?
          </button>
        </div>
      </section>
    </div>
  );
}
