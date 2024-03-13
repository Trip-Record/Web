import { useSearchParams } from "react-router-dom";

export function useCurrentPage(isStartZero: boolean = true) {
  const [searchParams, setSearchParams] = useSearchParams();

  const startPage = isStartZero ? 0 : 1;

  const page = Number(searchParams.get("page") ?? 0);

  return isStartZero && page >= 1 ? page - 1 : page;
}
