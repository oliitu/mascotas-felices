import { useNavigate } from "react-router-dom";
import {ChevronLeft} from "lucide-react"

export default function BackButton() {
  const navigate = useNavigate();

  return (
    <button
      onClick={() => navigate(-1)}
      className=" text-purple-400 px-4 py-2 rounded-lg "
    >
      <ChevronLeft/>
    </button>
  );
}
