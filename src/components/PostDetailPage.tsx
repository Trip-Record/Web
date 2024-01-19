import PostDetail from "./post/PostDetail";

export default function PostDetailPage() {
  const postId = 1;

  return (
    <div className="flex items-center justify-center w-full p-2">
      <PostDetail postId={postId} />
    </div>
  );
}
