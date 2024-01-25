interface Props {
  type: "text" | "image" | "avatar";
}
export default function SkeletonElement({ type }: Props) {
  return <div className={`skeleton ${type}`} />;
}
