import { useNavigate } from "react-router-dom";
import { collection, query, where, getDocs, addDoc, serverTimestamp, updateDoc, doc } from "firebase/firestore";
import { db } from "../../firebase";
import { MessageCircle } from "lucide-react";

export default function ChatButton({ currentUserId, ownerId }) {
  const navigate = useNavigate();

  const handleChat = async () => {
    if (!currentUserId || !ownerId || currentUserId === ownerId) return;

    try {
      const chatsRef = collection(db, "chats");
      const q = query(
        chatsRef,
        where("participants", "array-contains", currentUserId)
      );
      const querySnapshot = await getDocs(q);

      let chatId = null;

      querySnapshot.forEach((doc) => {
        const data = doc.data();
        if (data.participants.includes(ownerId)) {
          chatId = doc.id;
        }
      });

      if (!chatId) {
  const newChat = await addDoc(chatsRef, {
    participants: [currentUserId, ownerId],
    lastMessage: "",
    updatedAt: serverTimestamp(),
  });
  chatId = newChat.id;
} else {
  // si ya existe, actualizamos el timestamp
  await updateDoc(doc(db, "chats", chatId), {
    updatedAt: serverTimestamp(),
  });
}


      navigate(`/chat/${chatId}`);
    } catch (error) {
      console.error("Error iniciando chat:", error);
    }
  };

  return (
    <button
  onClick={(e) => {
    e.stopPropagation(); // 💥 evita que se abra el perfil por accidente
    handleChat();
  }}
  className="flex items-center gap-2 bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition"
>
  <MessageCircle size={20} />
  <span>Iniciar chat</span>
</button>

  );
}
