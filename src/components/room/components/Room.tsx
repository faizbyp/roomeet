import CardEvent from "@/common/CardEvent";
import TitleRoom from "./TitleRoom";
import { Box, FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { useCallback, useEffect, useMemo, useState } from "react";
import BigCalendar from "./BigCalendar";
import { axiosAuth } from "@/lib/axios";
import useSWR from "swr";

const Room = () => {
  const [room, setRoom] = useState("ROOM001");
  const [events, setEvents] = useState();

  const url = `/book?room=${room}`;
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

  const handleRoom = (e: any) => {
    const r = e.target.value;
    setRoom(r);
    console.log(r);
  };

  return (
    <>
      <Box sx={{ display: "flex", justifyContent: "end", mt: 4 }}>
        <FormControl fullWidth>
          <InputLabel>Room</InputLabel>
          <Select defaultValue="ROOM001" value={room} label="Approval" onChange={handleRoom}>
            <MenuItem value="ROOM001">ROOM001</MenuItem>
            <MenuItem value="ROOM002">ROOM002</MenuItem>
            <MenuItem value="ROOM003">ROOM003</MenuItem>
            <MenuItem value="ROOM004">ROOM004</MenuItem>
            <MenuItem value="ROOM005">ROOM005</MenuItem>
          </Select>
        </FormControl>
      </Box>
      {isLoading && events ? <p>Loading...</p> : <BigCalendar events={events} />}
      {error && <p>Error fetching data</p>}
      {/* <CardEvent /> */}
    </>
  );
};

export default Room;
