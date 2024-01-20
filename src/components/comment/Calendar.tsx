import React, { useState } from "react";

export type SelectDate = Date[];

//여행 날짜 선택 안하면 안넘어가게 하는 기능 추가
//사진 넣기

interface CalendarProps {
  selectedDays: SelectDate;
  setShowSelectDays: (inputValue: string) => void;
  setSelectedDays: (day: SelectDate) => void;
  isPrevMonth?: boolean;
  isNextMonth?: boolean;
  setModal: (modal?: boolean) => void;
}

export default function Calendar({
  selectedDays,
  setSelectedDays,
  isPrevMonth,
  isNextMonth,
  setShowSelectDays,
  setModal,
}: CalendarProps) {
  const daysOfWeek = ["일", "월", "화", "수", "목", "금", "토"];
  const [currentMonth, setCurrentMonth] = useState<Date>(new Date());

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const isSameDay = (toDay: Date, selectedDays: SelectDate) => {
    let dupliCount = -1;
    selectedDays.forEach((e, index) => {
      if (
        toDay.getFullYear() === e.getFullYear() &&
        toDay.getMonth() === e.getMonth() &&
        toDay.getDate() === e.getDate()
      ) {
        dupliCount = index;
      }
    });
    return dupliCount;
  };

  const onClickDay = (day: Date, selectedDays: SelectDate) => {
    const dupliCount = isSameDay(day, selectedDays);
    if (dupliCount >= 0) {
      const spliceSelectedDays = [...selectedDays];
      spliceSelectedDays.splice(dupliCount, 1);
      setSelectedDays(spliceSelectedDays);
    } else if (checkArrayCountTwo(selectedDays)) {
      alert("2개 이상 선택할 수 없습니다!");
    } else {
      const copySelectedDays = [...selectedDays, day];
      setSelectedDays(copySelectedDays);
    }
  };

  const checkArrayCountTwo = (selectedDays: SelectDate) => {
    if (selectedDays.length >= 2) return true;
    else return false;
  };

  const prevCalendar = () => {
    setCurrentMonth(
      new Date(
        currentMonth.getFullYear(),
        currentMonth.getMonth() - 1,
        currentMonth.getDate()
      )
    );
  };

  const nextCalendar = () => {
    setCurrentMonth(
      new Date(
        currentMonth.getFullYear(),
        currentMonth.getMonth() + 1,
        currentMonth.getDate()
      )
    );
  };

  const buildCalendarDays = () => {
    const curMonthStartDate = new Date(
      currentMonth.getFullYear(),
      currentMonth.getMonth(),
      1
    ).getDay();
    const curMonthEndDate = new Date(
      currentMonth.getFullYear(),
      currentMonth.getMonth() + 1,
      0
    );
    const prevMonthEndDate = new Date(
      currentMonth.getFullYear(),
      currentMonth.getMonth(),
      0
    );
    const nextMonthStartDate = new Date(
      currentMonth.getFullYear(),
      currentMonth.getMonth() + 1,
      1
    );
    const days: Date[] = Array.from({ length: curMonthStartDate }, (_, i) => {
      return new Date(
        currentMonth.getFullYear(),
        currentMonth.getMonth() - 1,
        prevMonthEndDate.getDate() - i
      );
    }).reverse();

    days.push(
      ...Array.from(
        { length: curMonthEndDate.getDate() },
        (_, i) =>
          new Date(currentMonth.getFullYear(), currentMonth.getMonth(), i + 1)
      )
    );

    const remainingDays = 7 - (days.length % 7);
    if (remainingDays < 7) {
      days.push(
        ...Array.from(
          { length: remainingDays },
          (_, i) =>
            new Date(
              nextMonthStartDate.getFullYear(),
              nextMonthStartDate.getMonth(),
              i + 1
            )
        )
      );
    }
    return days;
  };

  const buildCalendarTag = (calendarDays: Date[]) => {
    return calendarDays.map((day: Date, i: number) => {
      if (day.getMonth() < currentMonth.getMonth()) {
        return (
          <td key={i} className="text-gray-400">
            {isPrevMonth ? day.getDate() : ""}
          </td>
        );
      }
      if (day.getMonth() > currentMonth.getMonth()) {
        return (
          <td key={i} className="text-gray-400">
            {isNextMonth ? day.getDate() : ""}
          </td>
        );
      }
      if (day < today) {
        return (
          <td
            key={i}
            className={`first:text-red-600 last:text-blue-600 ${
              isSameDay(day, selectedDays) >= 0 ? "bg-blue-200" : ""
            }`}
            onClick={() => {
              onClickDay(day, selectedDays);
            }}
          >
            {day.getDate()}
          </td>
        );
      }
      return (
        <td
          key={i}
          className={`first:text-red-600 last:text-blue-600 ${
            isSameDay(day, selectedDays) >= 0 ? "bg-blue-200" : ""
          }`}
          onClick={() => {
            onClickDay(day, selectedDays);
          }}
        >
          {day.getDate()}
        </td>
      );
    });
  };

  const divideWeek = (calendarTags: JSX.Element[]) => {
    return calendarTags.reduce(
      (acc: JSX.Element[][], day: JSX.Element, i: number) => {
        if (i % 7 === 0) acc.push([day]);
        else acc[acc.length - 1].push(day);
        return acc;
      },
      []
    );
  };

  const calendarDays = buildCalendarDays();
  const calendarTags = buildCalendarTag(calendarDays);
  const calendarRows = divideWeek(calendarTags);

  const sortDays = (selectDays: SelectDate) => {
    selectDays.sort((a, b) => {
      return a.getTime() - b.getTime();
    });

    return selectDays;
  };

  const makeDaysString = (days: string[]): string => {
    return days.join(" ~ ");
  };

  const dateFormat = (selectDays: SelectDate): string[] => {
    sortDays(selectDays);
    return selectDays.map((i) => {
      return (
        i.getFullYear() +
        "-" +
        (i.getMonth() + 1 < 10 ? "0" + (i.getMonth() + 1) : i.getMonth() + 1) +
        "-" +
        (i.getDate() < 10 ? "0" + i.getDate() : i.getDate())
      );
    });
  };

  return (
    <div className="w-[40vw] h-[60vh] flex flex-col text-center p-5 bg-white">
      <div>
        <button data-testid="prevMonth" onClick={prevCalendar}>
          &lt;
        </button>
        <span>
          {currentMonth.getFullYear()}년 {currentMonth.getMonth() + 1}월
        </span>
        <button data-testid="nextMonth" onClick={nextCalendar}>
          &gt;
        </button>
      </div>
      <table className="mx-auto w-full h-full text-center font-bold">
        <thead className="border-b-2 border-black">
          <tr>
            {daysOfWeek.map((day, i) => (
              <th key={i} data-testid="calendarHead" className="pb-3">
                {day}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {calendarRows.map((row: JSX.Element[], i: number) => (
            <tr key={i} className="">
              {row}
            </tr>
          ))}
        </tbody>
      </table>
      <div className=" h-[50px] mt-3">
        <button
          onClick={() => {
            setShowSelectDays(makeDaysString(dateFormat(selectedDays)));
            setModal();
          }}
          className="bg-blue-400 h-full w-1/3 rounded-sm text-white font-bold"
        >
          확인
        </button>
      </div>
    </div>
  );
}
