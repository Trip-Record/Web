interface Props {
  count: number;
}
export default function CommentHeader({ count }: Props) {
  return (
    <div className="flex justify-start items-center relative mt-10">
      <span className="text-2xl font-bold">댓글 {count}개</span>
    </div>
  );
}
