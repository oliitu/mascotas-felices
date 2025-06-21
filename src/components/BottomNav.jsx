// components/BottomNav.jsx
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase";

export default function BottomNav() {
  const [user] = useAuthState(auth);

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-purple-200 shadow-lg z-50">
      <div className="flex justify-around items-center h-16 text-purple-500 text-sm font-semibold">
        
        <a href="/" className="flex flex-col items-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mb-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.105 0-2 .672-2 1.5s.895 1.5 2 1.5 2-.672 2-1.5S13.105 8 12 8zm0 7c-1.657 0-3 1.567-3 3.5V20h6v-1.5c0-1.933-1.343-3.5-3-3.5z" />
          </svg>
          Inicio
        </a>
        
        <a href="/perdidas" className="flex flex-col items-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mb-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.105 0-2 .672-2 1.5s.895 1.5 2 1.5 2-.672 2-1.5S13.105 8 12 8zm0 7c-1.657 0-3 1.567-3 3.5V20h6v-1.5c0-1.933-1.343-3.5-3-3.5z" />
          </svg>
          Perdidas
        </a>
        
        <a
          href="/escanear"
          className="bg-purple-500 hover:bg-purple-600 text-white rounded-full p-4 -mt-10 shadow-lg transition transform hover:scale-105"
        >
            
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10h4.586a1 1 0 00.707-1.707l-4.586-4.586a1 1 0 00-1.707.707V9h-2a1 1 0 000 2h2v2a1 1 0 002 0v-2z" />
          </svg>
        </a>

        <a href="/mis-mascotas" className="flex flex-col items-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mb-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
          Mascotas
        </a>

        <a href={user ? "/perfil" : "/login"} className="flex flex-col items-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mb-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.121 17.804A10.963 10.963 0 0112 15c2.657 0 5.094.936 6.879 2.489M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          {user ? "Perfil" : "Login"}
        </a>

      </div>
    </nav>
  );
}
