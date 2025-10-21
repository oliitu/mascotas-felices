import { useEffect, useState, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  collection,
  addDoc,
  query,
  orderBy,
  onSnapshot,
  serverTimestamp,
  doc,
  getDoc,
} from "firebase/firestore";
import { Send, UserCircle } from "lucide-react";
import { auth, db } from "../../firebase";
import { onAuthStateChanged } from "firebase/auth";

export default function ChatPage() {
  const { chatId } = useParams();
  const navigate = useNavigate();

  // ✅ hooks arriba del todo
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [currentUser, setCurrentUser] = useState(null);
  const [chatUser, setChatUser] = useState(null);
  const [bloqueado, setBloqueado] = useState(false);
  const bottomRef = useRef(null);

  // Detectar usuario logueado
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => setCurrentUser(user));
    return () => unsubscribe();
  }, []);

  // Escuchar mensajes en tiempo real
  useEffect(() => {
    if (!chatId) return;
    const q = query(collection(db, "chats", chatId, "messages"), orderBy("createdAt"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      setMessages(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
      bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    });
    return () => unsubscribe();
  }, [chatId]);

  // Obtener info del otro usuario
  useEffect(() => {
    const getChatUser = async () => {
      if (!chatId || !currentUser) return;
      const chatRef = doc(db, "chats", chatId);
      const chatSnap = await getDoc(chatRef);

      if (chatSnap.exists()) {
        const { participants } = chatSnap.data();
        const otherUserId = participants.find((id) => id !== currentUser.uid);
        if (otherUserId) {
          const userRef = doc(db, "users", otherUserId);
          const userSnap = await getDoc(userRef);
          if (userSnap.exists()) setChatUser({ id: otherUserId, ...userSnap.data() });
        }
      }
    };
    getChatUser();
  }, [chatId, currentUser]);

  // Enviar mensaje
  const sendMessage = async (e) => {
    e.preventDefault();
    if (!newMessage.trim() || !currentUser || !chatUser) return;

    try {
      // Verificar si alguno bloqueó al otro
      const currentUserRef = doc(db, "users", currentUser.uid);
      const chatUserRef = doc(db, "users", chatUser.id);

      const [currentSnap, otherSnap] = await Promise.all([
        getDoc(currentUserRef),
        getDoc(chatUserRef),
      ]);

      const currentData = currentSnap.data();
      const otherData = otherSnap.data();

      const bloqueadosActual = currentData?.bloqueados || [];
      const bloqueadosOtro = otherData?.bloqueados || [];

      if (bloqueadosActual.includes(chatUser.id) || bloqueadosOtro.includes(currentUser.uid)) {
        alert("⚠️ No puedes enviar mensajes. Uno de los usuarios bloqueó al otro.");
        return;
      }

      const messagesRef = collection(db, "chats", chatId, "messages");
      await addDoc(messagesRef, {
        text: newMessage,
        senderId: currentUser.uid,
        createdAt: serverTimestamp(),
      });
      setNewMessage("");
    } catch (error) {
      console.error("Error enviando mensaje:", error);
    }
  };

  // UI
  return (
    <section className="h-screen flex flex-col bg-white">
      {/* Header */}
      <div
        onClick={() => chatUser && navigate(`/perfil/${chatUser.id}`)}
        className="flex items-center gap-3 p-4 border-b bg-purple-600 text-white fixed top-0 w-full cursor-pointer z-10"
      >
        <UserCircle size={40} />
        <div>
          <p className="font-semibold">
            {chatUser ? chatUser.name || "Usuario" : "Cargando..."}
          </p>
          <p className="text-sm opacity-80">{chatUser?.email || ""}</p>
        </div>
      </div>

      {/* Mensajes */}
      <div className="flex-1 overflow-y-auto mt-35 p-4 mb-[70px] space-y-3">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex ${
              msg.senderId === currentUser?.uid ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`max-w-xs px-4 py-2 rounded-2xl text-sm ${
                msg.senderId === currentUser?.uid
                  ? "bg-purple-500 text-white rounded-br-none"
                  : "bg-gray-100 text-gray-800 rounded-bl-none"
              }`}
            >
              {msg.text}
            </div>
          </div>
        ))}
        <div ref={bottomRef} />
      </div>

      {/* Campo de texto */}
      <form
        onSubmit={sendMessage}
        className="fixed bottom-15 left-0 w-full flex items-center border-t border-gray-300 p-3 bg-gray-50 z-10"
      >
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Escribe un mensaje..."
          className="flex-1 border border-gray-300 rounded-full px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-400"
        />
        <button
          type="submit"
          className="ml-2 p-2 bg-purple-600 text-white rounded-full hover:bg-purple-700"
        >
          <Send size={18} />
        </button>
      </form>
    </section>
  );
}
