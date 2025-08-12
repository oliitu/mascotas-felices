import { QrCode, Search, Heart} from "lucide-react";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

export default function QueEs() {

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-100 to-purple-200 text-gray-800">
      {/* Hero Section */}
      <section
        id="inicio"
        className="flex flex-col items-center justify-center text-center px-3 pb-3 pt-10 sm:pt-16"
      >
        {/* Icono grande */}
        <div className="bg-white p-0 sm:p-4 rounded-full shadow-lg mb-4">
                    <img className=" p-4 h-25" src="/icons/favicon.svg"></img>

        </div>

        <h2 className="text-3xl sm:text-5xl font-bold text-purple-600 mb-4">
          ¿Qué es Mascotas Felices?
        </h2>
        <p className="text-base sm:text-lg max-w-md mb-2 sm:mb-8 text-gray-700">
          Mascotas felices es una app web que permite a sus usuarios gestionar los datos de sus mascotas.
        </p>

        {/* Carrusel Swiper con navegación y paginación */}
        
      </section>
      <Swiper
  modules={[Navigation, Pagination]}
  spaceBetween={20}
  slidesPerView={1}   // + cards visibles, más angostas
  navigation
  pagination={{ clickable: true }}
  breakpoints={{
    640: { slidesPerView: 1 },   // tablets
    768: { slidesPerView: 1 },   // pantallas medianas
    1024: { slidesPerView: 1 },    // pantallas grandes
  }}
  className="max-w-xs"
>
          <SwiperSlide>
  <div className="bg-white justify-items-center p-6 rounded-xl shadow hover:shadow-lg transition max-w-[220px] w-full mx-auto">
    <QrCode className="text-purple-500 justify-self-center mb-4" size={40} />
    <h3 className="font-bold mb-2 text-center">Creá un QR para tu mascota</h3>
    <p className="text-gray-600 text-sm text-center">
      Generá un código QR con la información de tu mascota para colocar en su collar.
    </p>
  </div>
</SwiperSlide>

          <SwiperSlide>
            <div className="bg-white justify-items-center p-6 rounded-xl shadow hover:shadow-lg transition max-w-[220px] w-full mx-auto">
              <Search className="text-purple-500 justify-self-center mb-4" size={40} />
              <h3 className="font-bold mb-2 text-center">Encontrá mascotas perdidas</h3>
              <p className="text-gray-600 text-sm text-center">
                Buscá y ayudá a encontrar mascotas extraviadas en tu zona.
              </p>
            </div>
          </SwiperSlide>

          <SwiperSlide>
            <div className="bg-white justify-items-center p-6 rounded-xl shadow hover:shadow-lg transition max-w-[220px] w-full mx-auto">
              <Heart className="text-purple-500 justify-self-center mb-4" size={40} />
              <h3 className="font-bold mb-2 text-center">Adoptá con amor</h3>
              <p className="text-gray-600 text-sm text-center">
                Conectá con personas que buscan dar en adopción a sus mascotas.
              </p>
            </div>
          </SwiperSlide>
        </Swiper>
        
    </div>
  );
}
