interface Props {
  startPage: number;
  lastPage: number;
  currentPage: number;
}
export default function PageNation({
  currentPage,
  lastPage,
  startPage,
}: Props) {
  const page = new Array(lastPage - startPage + 1).map((i) => i + startPage);
  return (
    <div className="flex">
      {page.map((i) => (
        <span>i</span>
      ))}
    </div>
  );
}
