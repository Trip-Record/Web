import { Link } from "react-router-dom";
import Posts from "./Posts";

export default function TravelRecord() {
  return (
    <div>
      <Posts />
      <Link to={"/write-record"}>글 작성</Link>
    </div>
  );
}
