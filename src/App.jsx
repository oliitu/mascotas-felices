import { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "./firebase";
import PedidosList from "./components/PedidosList";

function App() {
  const [ruta, setRuta] = useState("");

  useEffect(() => {
    const fetchRuta = async () => {
      try {
        const docRef = doc(db, "misrutas", "2"); 
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const data = docSnap.data();
          setRuta(data.title); 
        } else {
          console.log("No se encontró el documento con ID 1");
        }
      } catch (error) {
        console.error("Error al obtener la ruta:", error);
      }
    };

    fetchRuta();
  }, []);

  return (
    <div className="min-h-screen">
      <a
        href={ruta || "#"}
        className="hover:bg-yellow-950 bg-amber-900 text-white px-4 py-4 rounded-full"
      >
        
      </a>

      <h1 className="text-3xl lg:text-5xl font-bold text-center mt-5 py-6">
        Pedidos
      </h1>
      <PedidosList />
    </div>
  );
}

export default App;
