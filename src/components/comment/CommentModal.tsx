export default function CommentModal() {
  const comments = ["asd", "zxc", "asd", "zxc", "asd", "zxc"];
  return (
    <section className="w-[80vw] max-w-lg bg-white flex flex-col p-2">
      <h2 className="border-b">댓글</h2>
      <div className="max-h-20 overflow-y-scroll">
        {comments.map((c) => (
          <div key={c}>{c}</div>
        ))}
      </div>
    </section>
  );
}
