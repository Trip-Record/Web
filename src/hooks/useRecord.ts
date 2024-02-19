import { useEffect, useState } from "react";
import { CardType } from "../components/Posts";
import { useGetRecordsQuery } from "../api/record";

export function useRecord(page: number, showPageCount: number) {
  const [cardType, setCardType] = useState<CardType>("blog");

  const { data: records, refetch } = useGetRecordsQuery({
    page: page,
    size: showPageCount,
  });

  useEffect(() => {
    refetch();
    window.scrollTo({
      top: 0, // 스크롤을 맨 위로 이동
      // behavior: "smooth", // 부드러운 스크롤 이동
    });
  }, [page, refetch]);

  return { cardType, records, refetch, setCardType };
}
