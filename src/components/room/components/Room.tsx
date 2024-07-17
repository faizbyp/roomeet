import CardEvent from "@/common/CardEvent";
import TitleRoom from "./TitleRoom";
import { MenuItem, Select } from "@mui/material";
import { useCallback, useEffect, useMemo, useState } from "react";
import BigCalendar from "./BigCalendar";
import { axiosAuth } from "@/lib/axios";
import useSWR from "swr";

const Room = () => {
  const [room, setRoom] = useState();
  const [events, setEvents] = useState();

  const url = `/book`;
  const {
    data: books,
    error,
    isLoading,
  } = useSWR(url, {
    fallback: { url: [] },
  });

  useEffect(() => {
    if (books) {
      setEvents(
        books.data.map((item: any) => {
          const startHour = Number(item.time_start.split(":")[0]);
          const startMinute = Number(item.time_start.split(":")[1]);
          const endHour = Number(item.time_end.split(":")[0]);
          const endMinute = Number(item.time_end.split(":")[1]);
          const date = new Date(item.book_date);

          return {
            title: item.agenda,
            start: new Date(date.setHours(startHour, startMinute)),
            end: new Date(date.setHours(endHour, endMinute)),
            allDay: false,
          };
        })
      );
    }
  }, [books]);

  console.log(books);
  console.log(events);

  return (
    <>
      <div className="px-4 mt-4">
        <div className="flex justify-end">
          <TitleRoom name={"ROOM 12"} />
        </div>
        {isLoading && events ? <p>Loading...</p> : <BigCalendar events={events} />}
        {error && <p>Error fetching data</p>}
        {/* <CalendarEvent /> */}
        <CardEvent />
        <CardEvent />
        <p className="text-center text-neutral-100 pt-2">View More</p>
      </div>
    </>
  );
};

export default Room;
