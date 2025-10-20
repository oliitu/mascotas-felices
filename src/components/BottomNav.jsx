// components/BottomNav.jsx
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../firebase";
import  {Heart, MessageSquare, User, QrCode, HomeIcon} from "lucide-react";

export default function BottomNav() {
  const [user] = useAuthState(auth);

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-purple-200 shadow-lg z-50">
      <div className="flex justify-around items-center h-16 text-purple-500 text-sm font-semibold">
        
        <a href="/" className="flex flex-col text-xs sm:text-base items-center">
          <HomeIcon/>
          Inicio
        </a>
        
        {/* <a href="/perdidas" className="flex flex-col text-xs sm:text-base items-center">
          <Dog/>
          Perdidas
        </a> */}
        <a href="/adopcion" className="flex flex-col text-xs sm:text-base items-center">
          <Heart/>
          Adoptar
        </a>

        <a
          href="/escanear"
          className="bg-purple-500 hover:bg-purple-600 text-white rounded-full p-4 -mt-5 sm:-mt-10 shadow-lg transition transform hover:scale-105"
        >
          <QrCode/>
        </a>
        
        <a href="/chats" className="flex flex-col text-xs sm:text-base items-center">
          <MessageSquare/>
          Chats
        </a>

        <a href={user ? "/miperfil" : "/login"} className="flex text-xs sm:text-base flex-col items-center">
          <User/>
          {user ? "Perfil" : "Login"}
        </a>

      </div>
    </nav>
  );
}
