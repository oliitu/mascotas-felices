// src/components/PedidosList.jsx
import { useEffect, useState } from "react";
import { collection, getDocs, query, orderBy } from "firebase/firestore"; // 👈 agrega query y orderBy

import { db } from "../firebase";
// ahhhh
function PedidosList() {
  const [pedidos, setPedidos] = useState([]);

  useEffect(() => {
  const fetchPedidos = async () => {
    const pedidosRef = collection(db, "pedidos");
    const pedidosQuery = query(pedidosRef, orderBy("fecha", "desc")); // 👈 ordenar por fecha descendente
    const snapshot = await getDocs(pedidosQuery);

    const data = snapshot.docs.map(doc => {
      const pedido = { id: doc.id, ...doc.data() };
      console.log("Pedido cargado:", pedido);
      return pedido;
    });

    setPedidos(data);
  };

  fetchPedidos();
}, []);


  return (
    <div className=" grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 p-6">
      {pedidos.map(pedido => (
        <div key={pedido.id} className="bg-amber-100 rounded-xl shadow-md p-4 flex flex-col justify-between h-full">

        <h2 className="text-lg font-bold mb-2" >{pedido.cliente}</h2>
         <h3 className="text-base font-bold mb-2">
  Fecha: {pedido.fecha.toDate().toLocaleString()}
</h3>

          
          {Array.isArray(pedido.carrito) && pedido.carrito.length > 0 ? (
            <ul className="mb-3">
              {pedido.carrito.map((item, index) => (
                <li key={index} className="text-gray-800 mb-1">
                  🍪 <strong>{item.name}</strong> — {item.quantity} x ${item.price}
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500 italic">No hay productos en el carrito</p>
          )}

          <p className="font-semibold text-right ">Total: ${pedido.total}</p>
        </div>
      ))}
    </div>
  );
}

export default PedidosList;
