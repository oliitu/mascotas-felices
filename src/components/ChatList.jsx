import { useEffect, useState } from "react";
import {
  collection,
  query,
  where,
  onSnapshot,
  orderBy,
  doc,
  getDoc,
} from "firebase/firestore";
import { db } from "../../firebase";
import { useNavigate } from "react-router-dom";
import { UserCircle } from "lucide-react";

export default function ChatList({ currentUserId }) {
  const [chats, setChats] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (!currentUserId) return;

    const q = query(
      collection(db, "chats"),
      where("participants", "array-contains", currentUserId),
      orderBy("updatedAt", "desc")
    );

    const unsubscribe = onSnapshot(q, async (snapshot) => {
      const chatData = await Promise.all(
        snapshot.docs.map(async (docSnap) => {
          const chat = { id: docSnap.id, ...docSnap.data() };

          // Obtener el otro participante
          const otherUserId = chat.participants.find((id) => id !== currentUserId);
          if (otherUserId) {
            const userRef = doc(db, "users", otherUserId);
            const userSnap = await getDoc(userRef);
            if (userSnap.exists()) {
              chat.otherUser = userSnap.data();
            }
          }

          return chat;
        })
      );

      setChats(chatData);
    });

    return () => unsubscribe();
  }, [currentUserId]);

  return (
    <section>
      <div className="flex fixed text-center justify-center w-screen h-15 bg-purple-50 p-3 shadow-sm">
        <h2 className="mt-2 text-xl">Chats</h2>
      </div>

      <div className="max-w-md mx-auto pt-15 space-y-3">
        {chats.map((chat) => (
          <div
            key={chat.id}
            onClick={() => navigate(`/chat/${chat.id}`)}
            className="flex justify-between items-center bg-white p-3 shadow-sm hover:bg-purple-50 cursor-pointer rounded-lg"
          >
            <div className="flex items-center gap-3">
              <UserCircle className="text-purple-500" size={36} />
              <div>
                <p className="font-semibold text-gray-800">
                  {chat.otherUser?.name || "Usuario"}
                </p>
                <p className="text-sm text-gray-600">
                  {chat.lastMessage || "Nuevo chat"}
                </p>
              </div>
            </div>

            <span className="text-xs text-gray-500">
              {chat.updatedAt?.seconds
                ? new Date(chat.updatedAt.seconds * 1000).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })
                : ""}
            </span>
          </div>
        ))}

        {chats.length === 0 && (
          <p className="text-center text-gray-500 mt-10">No hay chats todavía</p>
        )}
      </div>
    </section>
  );
}
