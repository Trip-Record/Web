import React from "react"; // React import 추가
import { recordApi } from "./api/record";

export default function ApiTest() {
  // useSetRecordMutation 훅 사용하여 뮤테이션 함수와 상태 추출
  const [setRecord, { isLoading, isSuccess, isError, error }] =
    recordApi.useSetRecordMutation();

  const handleSetRecord = async () => {
    const recordData = {
      recordTitle: "Test Title",
      recordContent: "This is a test content",
      startDate: "2022-01-01",
      endDate: "2022-01-02",
      recordImages: ["image1.jpg", "image2.jpg"],
      placeIds: ["place1", "place2"],
    };

    try {
      // setRecord 함수를 사용하여 뮤테이션 실행
      //const response = await setRecord(recordData).unwrap();
      //console.log("Record set successfully:", response);
    } catch (error) {
      console.error("Error setting the record:", error);
    }
  };

  return <button onClick={handleSetRecord}>Set Record</button>;
}
