
export default function TutorialPWA() {

  return (
    <div className="p-6 max-w-3xl mx-auto bg-white rounded-lg shadow-md">
      <h1 className="text-3xl sm:mt-0 mt-5 font-bold text-purple-600 mb-6">
        Cómo instalar la app en tu dispositivo 📲
      </h1>

      <div className="space-y-6 text-gray-800">
        <div>
          <h2 className="text-xl font-semibold text-purple-500">📱 En celulares Android:</h2>
          <ol className="list-decimal list-inside mt-2 space-y-1">
            <li>Abrí la app web en Chrome: <strong>mascotas-felicess.netlify.app</strong></li>
            <li>Tocá los tres puntos arriba a la derecha (menú del navegador).</li>
            <li>Seleccioná <strong>"Agregar a pantalla de inicio"</strong>.</li>
            <li>Confirmá tocando "Agregar".</li>
          </ol>
        </div>

        <div>
          <h2 className="text-xl font-semibold text-purple-500">📱 En iPhone (iOS):</h2>
          <ol className="list-decimal list-inside mt-2 space-y-1">
            <li>Abrí la app en Safari: <strong>mascotas-felicess.netlify.app</strong></li>
            <li>Presioná el botón de <strong>compartir</strong> (cuadro con flechita hacia arriba).</li>
            <li>Bajá y elegí <strong>"Agregar a pantalla de inicio"</strong>.</li>
            <li>Confirmá tocando "Agregar".</li>
          </ol>
        </div>
      </div>
    </div>
  );
}
