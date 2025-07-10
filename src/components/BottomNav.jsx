// components/BottomNav.jsx
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../firebase";
import  {Heart, Dog, User, QrCode, HomeIcon} from "lucide-react";

export default function BottomNav() {
  const [user] = useAuthState(auth);

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-purple-200 shadow-lg z-50">
      <div className="flex justify-around items-center h-16 text-purple-500 text-sm font-semibold">
        
        <a href="/" className="flex flex-col items-center">
          <HomeIcon/>
          Inicio
        </a>
        
        <a href="/perdidas" className="flex flex-col items-center">
          <Dog/>
          Perdidas
        </a>
        
        <a
          href="/escanear"
          className="bg-purple-500 hover:bg-purple-600 text-white rounded-full p-4 -mt-10 shadow-lg transition transform hover:scale-105"
        >
          <QrCode/>
        </a>

        {/* <a href="/mis-mascotas" className="flex flex-col items-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mb-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
          Mascotas
        </a> */}

        <a href="/adopcion" className="flex flex-col items-center">
          <Heart/>
          Adoptar
        </a>

        <a href={user ? "/perfil" : "/login"} className="flex flex-col items-center">
          <User/>
          {user ? "Perfil" : "Login"}
        </a>

      </div>
    </nav>
  );
}
