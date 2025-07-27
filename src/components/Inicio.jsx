export default function Home() {
  return (
    <div className="min-h-screen bg-white text-gray-800">
      {/* Header */}
      <header className="flex justify-between items-center px-8 py-4 border-b border-purple-500">
        <h1 className="text-3xl font-bold text-purple-500">Mascotas Felices</h1>
      </header>

      {/* Hero Section */}
      <section
        id="inicio"
        className="flex flex-col items-center justify-center text-center px-6 py-20 bg-purple-50"
      >
        <h2 className="text-5xl font-extrabold text-purple-500 mb-4">
          ¡Bienvenido a Mascotas Felices!
        </h2>
        <p className="text-lg max-w-xl mb-8 text-gray-700">
          El lugar donde tus mascotas son felices ahre.
        </p>
        <button className="bg-purple-500 hover:bg-purple-700 text-white font-bold py-3 px-8 rounded-full transition duration-300">
          Conoce más
        </button>
      </section>

    </div>
  );
}
