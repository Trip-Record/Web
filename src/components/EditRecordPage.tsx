import { useParams } from "react-router-dom";
import WriteRecord, { editRecordInitProps } from "./WriteRecord";
import { useEffect, useState } from "react";
import { useUser } from "../hooks/useUser";
import { useRecord } from "../hooks/useRecord";
import { HOST } from "../constants";

export default function EditRecordPage() {
  const { recordId } = useParams();
  const { user } = useUser();

  const { data, modifyRecord } = useRecord(recordId ? +recordId : 0);
  console.log(data);

  if (!user) {
    alert("로그인 해주세요");
    return <></>;
    // TODO: 로그인 페이지로
  }

  if (!data) return <></>;
  if (data?.isUserCreated === false) {
    alert("내 게시글이 아님");
    return <></>;
    // TODO: 로그인 페이지로
  }

  //   const {
  //     recordContent,
  //     recordImages,
  //     recordPlaces,
  //     recordTitle,
  //     tripEndDate,
  //     tripStartDate,
  //   } = data;

  // //   const initEditData: editRecordInitProps = {
  // //     editData: {
  // //       travelName: recordTitle,
  // //       travelDetails: recordContent,
  // //       images: undefined,
  // //       selectedDays: [new Date(tripStartDate), new Date(tripEndDate)],
  // //       selectedDestinations: recordPlaces.map(
  // //         (place) => `${place.countryName} > ${place.placeName}`
  // //       ),
  // //       selectedLocation: ["a,", "b"],
  // //       selectedLocationIdArray: [1, 2],
  // //     },
  // //   };

  const submnit = (form: FormData) => {
    fetch(HOST + "/");
  };

  return (
    <main>
      {recordId}
      <WriteRecord editData={data} onSubmit={submnit} />
    </main>
  );
}
