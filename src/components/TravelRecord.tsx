import Posts from "./Posts";
import { useUser } from "../hooks/useUser";
import { useState } from "react";
import ApiTest from "../apiTest";
import AddRecordAndSchedule from "./ui/AddRecordAndSchedule";

export default function TravelRecord() {
  return (
    <div>
      <Posts />
      <AddRecordAndSchedule />
    </div>
  );
}
