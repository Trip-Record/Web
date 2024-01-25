interface Props {
  type: "text" | "image" | "avatar" | "name" | "style" | "likecomment";
  className?: string;
}
export default function SkeletonElement({ type, className }: Props) {
  return <div className={`skeleton ${type} ${className}`} />;
}
