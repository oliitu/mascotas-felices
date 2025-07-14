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
          El lugar donde cuidamos y celebramos a tus mascotas con todo el amor que se merecen.
        </p>
        <button className="bg-purple-500 hover:bg-purple-700 text-white font-bold py-3 px-8 rounded-full transition duration-300">
          Conoce más
        </button>
      </section>

      {/* Features Section */}
      <section
        id="servicios"
        className="max-w-6xl mx-auto px-6 py-20 grid grid-cols-1 md:grid-cols-3 gap-12 text-center"
      >
        <div className="shadow-lg rounded-lg p-6 border border-purple-200">
          <svg
            className="mx-auto mb-4 w-12 h-12 text-purple-500"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 20l9-5-9-5-9 5 9 5z"
            ></path>
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 12l9-5-9-5-9 5 9 5z"
            ></path>
          </svg>
          <h3 className="text-xl font-semibold mb-2">Cuidado personalizado</h3>
          <p className="text-gray-600">
            Ofrecemos atención especial para que tu mascota esté siempre feliz y saludable.
          </p>
        </div>

        <div className="shadow-lg rounded-lg p-6 border border-purple-200">
          <svg
            className="mx-auto mb-4 w-12 h-12 text-purple-500"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9 12h6m-6 4h6m2 4H7a2 2 0 01-2-2v-4a2 2 0 012-2h10a2 2 0 012 2v4a2 2 0 01-2 2z"
            ></path>
          </svg>
          <h3 className="text-xl font-semibold mb-2">Productos de calidad</h3>
          <p className="text-gray-600">
            Contamos con los mejores productos para el bienestar de tu mascota.
          </p>
        </div>

        <div className="shadow-lg rounded-lg p-6 border border-purple-200">
          <svg
            className="mx-auto mb-4 w-12 h-12 text-purple-500"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15 12H9m6 4H9m12 4H3a2 2 0 01-2-2v-4a2 2 0 012-2h18a2 2 0 012 2v4a2 2 0 01-2 2z"
            ></path>
          </svg>
          <h3 className="text-xl font-semibold mb-2">Atención 24/7</h3>
          <p className="text-gray-600">
            Estamos disponibles para ayudarte en cualquier momento del día.
          </p>
        </div>
      </section>
    </div>
  );
}
