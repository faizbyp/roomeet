import CardEvent from "@/common/CardEvent";
import TitleRoom from "./TitleRoom";
import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Skeleton,
  Typography,
} from "@mui/material";
import { useCallback, useEffect, useMemo, useState } from "react";
import BigCalendar from "./BigCalendar";
import { axiosAuth } from "@/lib/axios";
import useSWR from "swr";
import useAxiosAuth from "@/lib/hooks/useAxiosAuth";

const Room = () => {
  const [room, setRoom] = useState("");
  const [events, setEvents] = useState();
  const [rooms, setRooms] = useState<any>();
  const axiosAuth = useAxiosAuth();

  let url = "";
  if (room) {
    url = `/book?room=${room}`;
  }

  const {
    data: books,
    error,
    isLoading,
  } = useSWR(url, {
    fallback: { url: [] },
  });

  useEffect(() => {
    const getRooms = async () => {
      const get = await axiosAuth.get("/room");
      setRooms(get.data);
    };
    getRooms();

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
  }, [books, axiosAuth]);

  const handleRoom = (e: any) => {
    const r = e.target.value;
    setRoom(r);
    console.log(r);
  };

  return (
    <>
      <Box sx={{ display: "flex", justifyContent: "end", mt: 24 }}>
        {rooms ? (
          <FormControl fullWidth>
            <InputLabel>Select Room</InputLabel>
            <Select defaultValue="" value={room} label="Approval" onChange={handleRoom}>
              {rooms.map((room: any) => (
                <MenuItem key={room.id} value={room.id_ruangan}>
                  {room.nama}
                </MenuItem>
              ))}
              {/* <MenuItem value="ROOM001">ROOM001</MenuItem>
            <MenuItem value="ROOM002">ROOM002</MenuItem>
            <MenuItem value="ROOM003">ROOM003</MenuItem>
            <MenuItem value="ROOM004">ROOM004</MenuItem>
            <MenuItem value="ROOM005">ROOM005</MenuItem> */}
            </Select>
          </FormControl>
        ) : (
          <Skeleton variant="rounded" width="100%" height={64} sx={{ bgcolor: "grey.700" }} />
        )}
      </Box>
      {isLoading && events ? (
        <Skeleton
          variant="rounded"
          width="100%"
          height={128}
          sx={{ bgcolor: "grey.700", mt: 48 }}
        />
      ) : (
        <BigCalendar events={events} />
      )}
      {error && <Typography align="center">Error fetching data</Typography>}
      {/* <CardEvent /> */}
    </>
  );
};

export default Room;
