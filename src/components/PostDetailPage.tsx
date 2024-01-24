import { useParams } from "react-router-dom";
import PostDetail from "./post/PostDetail";

export default function PostDetailPage() {
  const { id } = useParams();
  // const postId = 1;

  console.log(id);
  if (!id) return <>페이지 없음...</>;
  if (!+id) return <>페이지 없음...</>;
  return (
    <div className="flex items-center justify-center w-full p-2">
      <PostDetail postId={+id} />
    </div>
  );
}
