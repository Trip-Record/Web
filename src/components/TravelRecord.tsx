import { Link } from "react-router-dom";
import Posts from "./Posts";
import { useUser } from "../hooks/useUser";
import { useState } from "react";

export default function TravelRecord() {
  const { user } = useUser();
  // console.log();
  const [hoverState, setHoverState] = useState("none");

  const link_record = user ? "/write-record" : "/login";
  const link_schedule = user ? "/write-schedule" : "/login";

  const newClass = `h-12 mb-1 mx-auto aspect-square shadow-lg leading-none items-center justify-center text-white bg-black/50 rounded-full ${
    hoverState === "in" ? "flex" : "hidden"
  }`;
  return (
    <div>
      <Posts />
      <div
        className="fixed right-5 bottom-5"
        onMouseEnter={() => setHoverState("in")}
        onMouseLeave={() => setHoverState("out")}
      >
        <Link to={link_record} className={newClass}>
          기록
        </Link>
        <Link to={link_schedule} className={newClass}>
          일정
        </Link>
        <div className="h-14 aspect-square shadow-lg leading-none flex items-center justify-center text-white bg-blue-300 rounded-full">
          <span
            className={`rotate-on-hover text-6xl xl h-[4.7rem] ${hoverState}`}
          >
            +
          </span>
        </div>
      </div>
    </div>
  );
}
