import { CardType } from "../../Posts";
import SkeletonElement from "./SkeletonElement";

interface Props {
  type: CardType;
}

export default function SkeletonPostCard({ type }: Props) {
  if (type === "blog")
    return (
      <section className="flex flex-row gap-2 w-full h-60 bg-white border-b last:border-b-white p-2 pb-5">
        <div className="flex flex-col flex-1 gap-6">
          <div className="flex gap-2 items-center">
            <SkeletonElement type="avatar" />
            <SkeletonElement type="name" />
            <SkeletonElement type="style" />
          </div>
          <div className="flex flex-col gap-4">
            <SkeletonElement type="text" />
            <SkeletonElement type="text" />
            <SkeletonElement type="text" />
          </div>
          <SkeletonElement type="likecomment" />
        </div>
        <SkeletonElement type="image" />
      </section>
    );
  else
    return (
      <section className="flex flex-col w-full h-80 items-center max-w-lg gap-2 bg-white border shadow-sm rounded-md p-2">
        <div className="flex justify-between w-full items-center">
          <div className="flex items-center gap-1">
            <SkeletonElement type="avatar" />
            <SkeletonElement type="name" />
          </div>
          <SkeletonElement type="style" />
        </div>
        <div className="flex flex-col justify-center w-full items-center cursor-pointer gap-2 flex-1">
          <SkeletonElement type="image" />
          <SkeletonElement type="text" />
          <SkeletonElement type="text" />
        </div>
        <div className="flex items-center w-full mt-4 gap-3">
          <SkeletonElement type="likecomment" />
        </div>
      </section>
    );
}
