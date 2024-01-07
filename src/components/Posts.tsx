import { useGetTodosQuery } from "../api/dummy";

export default function Posts() {
  const { data, isLoading } = useGetTodosQuery();
  console.log(data);

  return <></>;
}
