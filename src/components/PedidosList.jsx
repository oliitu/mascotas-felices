import { useEffect, useState } from "react";
import { collection, query, orderBy, onSnapshot } from "firebase/firestore";
import { db } from "../firebase";
import { motion, AnimatePresence } from "framer-motion";

function PedidosList() {
  const [pedidos, setPedidos] = useState([]);

  useEffect(() => {
    const pedidosRef = collection(db, "pedidos");
    const pedidosQuery = query(pedidosRef, orderBy("fecha", "desc"));

    const unsubscribe = onSnapshot(pedidosQuery, (snapshot) => {
      const data = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));
      setPedidos(data);
    });

    return () => unsubscribe();
  }, []);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 p-6">
      <AnimatePresence>
        {pedidos.map(pedido => (
          <motion.div
            key={pedido.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
            layout
            className="bg-amber-100 rounded-xl shadow-md p-4 flex flex-col justify-between h-full"
          >
            <h2 className="text-lg font-bold mb-2">{pedido.cliente}</h2>
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

            <p className="font-semibold text-right">Total: ${pedido.total}</p>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}

export default PedidosList;
