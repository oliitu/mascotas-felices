import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-purple-50 text-gray-800">
      {/* Hero Section */}
      <section
        id="inicio"
        className="flex flex-col items-center justify-center text-center px-6 py-20 "
      >
        <h2 className="text-5xl nunito text-purple-500 mb-4">
          ¡Bienvenido a Mascotas Felices!
        </h2>
        <p className="text-lg max-w-xl mb-8 text-gray-700">
          El lugar donde tus mascotas son felices ahre.
        </p>

        {/* Botones */}
        <div className="flex flex-col sm:flex-row gap-4">
          <button
            onClick={() => navigate("/tutorial")}
            className="bg-purple-500 hover:bg-purple-600 text-white font-bold py-3 px-8 rounded-full transition duration-300"
          >
            Cómo descargar la app
          </button>

          <button
            onClick={() => navigate("/mis-mascotas")}
            className="bg-purple-500 hover:bg-purple-600 text-white font-bold py-3 px-8 rounded-full transition duration-300"
          >
            Ver mis mascotas
          </button>
        </div>
      </section>
    </div>
  );
}
// bg-[url('/public/img/bg.png')] bg-cover bg-center