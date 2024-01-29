import SkeletonElement from "./SkeletonElement";

export default function SkeletonDetail() {
  return (
    <section className="w-full max-w-screen-md flex flex-col gap-2">
      <SkeletonElement type="text" className="h-20" />
      <div className="flex gap-2 items-center">
        <SkeletonElement type="avatar" />
        <SkeletonElement type="name" />
        <SkeletonElement type="style" />
      </div>
      <SkeletonElement type="text" />
      <SkeletonElement
        type="image"
        className="w-80 aspect-square mx-auto mb-10"
      />
      <SkeletonElement type="text" />
      <SkeletonElement type="text" />
      <SkeletonElement type="likecomment" />
    </section>
  );
}
