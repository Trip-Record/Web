export default function CommentModal() {
  const comments = ["asd", "zxc", "asd1", "zxc2", "asd3", "zxc4"];
  return (
    <section className="w-[90vw] max-w-[50rem] flex flex-col p-2 border">
      <h2 className="border-b">댓글</h2>
      <div className="max-h-20 overflow-y-scroll">
        {comments.map((c) => (
          <div key={c}>{c}</div>
        ))}
      </div>
    </section>
  );
}
