import { useEffect, useState } from "react";
import { useUser } from "./useUser";
import { HOST } from "../constants";
import { useRecord } from "./useRecord";
import { useGetScheduleDetailQuery } from "../api/schedule";

export type PostTypes = "records" | "schedules";
interface Props {
  initLike: boolean;
  initCount: number;
  id: number;
  type: PostTypes;
}
export function useLike({ initLike, initCount, id, type }: Props) {
  const [active, setActive] = useState(initLike);
  const [like, setLike] = useState(initCount);
  const { user } = useUser();

  const { data: recordData, refetch: recordRefetch } = useRecord(id);
  const { data: scheduleData, refetch: scheduleRefetch } =
    useGetScheduleDetailQuery(id + "");

  useEffect(() => {
    recordRefetch();
  }, [id, recordRefetch]);

  useEffect(() => {
    scheduleRefetch();
  }, [id, scheduleRefetch]);

  useEffect(() => {
    if (recordData) {
      setActive(recordData.isUserLiked);
      setLike(recordData.likeCount);
    }
  }, [recordData]);

  useEffect(() => {
    if (scheduleData) {
      setActive(scheduleData.isUserLiked);
      setLike(scheduleData.scheduleLikeCount);
    }
  }, [scheduleData]);

  const addLike = (prevLikeCount: number) => {
    fetch(`${HOST}/${type}/${id}/likes`, {
      method: "POST",
      headers: {
        authorization: `Bearer ${user?.token}`,
      },
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error();
        }
      })
      .catch(() => {
        setLike(prevLikeCount);
        setActive(false);
      });
  };
  const removeLike = (prevLikeCount: number) => {
    fetch(`${HOST}/${type}/${id}/likes`, {
      method: "DELETE",
      headers: {
        authorization: `Bearer ${user?.token}`,
      },
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error();
        }
      })
      .catch(() => {
        setLike(prevLikeCount);
        setActive(true);
      });
  };

  const clickLikeButton = () => {
    if (!user) return alert("로그인 후 이용해주세요");
    const prevLikeCount = like;
    if (active) {
      setLike(prevLikeCount - 1);
      removeLike(prevLikeCount);
    } else {
      setLike(prevLikeCount + 1);
      addLike(prevLikeCount);
    }
    setActive(!active);
  };

  return { clickLikeButton, active, like };
}
