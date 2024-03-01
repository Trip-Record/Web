import { useNavigate } from "react-router-dom";
import { HOST } from "../constants";
import { useUser } from "./useUser";
import { useGetRecordQuery } from "../api/record";

export function useRecord(recordId: number) {
  const { user } = useUser();
  const navi = useNavigate();
  const { data } = useGetRecordQuery(recordId);

  const deleteRecord = () => {
    fetch(`${HOST}/records/${recordId}`, {
      method: "DELETE",
      headers: {
        AUTHORIZATION: `Bearer ${user?.token}`,
      },
    })
      .then((res) => {
        if (res.ok) {
          alert("삭제되었습니다");
          navi("/");
        } else {
          alert("삭제에 실패하였습니다");
        }
      })
      .catch(() => {
        alert("삭제 중 오류가 발생하였습니다. 네트워크 상태를 확인하세요");
      });
  };

  const modifyRecord = () => {
    fetch("/");
  };

  return { deleteRecord, data, modifyRecord };
}
