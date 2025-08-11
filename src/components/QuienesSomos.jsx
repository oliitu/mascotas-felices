
export default function QuienesSomos() {

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
          ¿Quiénes somos?
        </h2>
        <p className="text-xs sm:text-lg max-w-md mb-8 text-gray-700">
          Somos Olivia Iturrusgarai, Maria Millan y Julieta Lauret, estudiantes de 6to año de la especialidad de informática del colegio IRESM.
        </p>
        <div className="flex flex-col gap-3 w-full max-w-xs">
            <div className="bg-white justify-items-center p-6 rounded-xl shadow hover:shadow-lg transition max-w-[320px] w-full mx-auto">
              {/* <Heart className="text-purple-500 mb-4" size={40} /> */}
              <h3 className="font-bold mb-2 text-base sm:text-xl text-center">¿Por qué hicimos esta app?</h3>
              <p className="text-gray-600 text-xs sm:text-base text-center">
                Hicimos esta app porque nos pareció que era necesario tener registradas a nuestras mascotas, por si se pierden o les pasa algo.
              </p>
            </div>
            <p className="text-gray-600 mt-10 text-xs text-center">
                app web desarrollada por: <a 
                className="text-purple-600 underline" 
                target="_blank"
                rel="noopener noreferrer"
                href="https://www.instagram.com/lituweb?igsh=MTQ0NGd6ZzFhbDB1OQ%3D%3D&utm_source=qr">LituWeb</a>
              </p>
        </div>
      </section>
    
     </div>
  );
}
