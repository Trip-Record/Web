import { Link, useNavigate } from "react-router-dom";

export default function NotFound() {
  const navigate = useNavigate();
  return (
    <div className="w-full h-full flex flex-col items-center justify-center gap-2">
      페이지를 찾을 수 없어요
      <button
        className="font-extrabold text-blue-500"
        onClick={() => navigate(-1)}
      >
        {"["}이전페이지로{"]"}
      </button>
      <Link to={"/"} className="font-extrabold text-blue-500">
        {"["}처음페이지로{"]"}
      </Link>
    </div>
  );
}
