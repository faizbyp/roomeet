"use client";

import DigitalClock from "./DigitalClock";
import { Select, MenuItem, SelectChangeEvent, Paper, Button, Typography } from "@mui/material";
import { useState } from "react";
import { CardRooms } from "./HomeCardRoom";
import { CardsSkeleton } from "@/common/skeletons/CardSkeleton";
import { useSession } from "next-auth/react";
import { Suspense } from "react";
import useAxiosAuth from "@/lib/hooks/useAxiosAuth";
import { axiosAuth } from "@/lib/axios";
import toast from "react-hot-toast";
import useSWR from "swr";
import moment from "moment";

const settings = {
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
  arrows: false,
  variableWidth: true,
};

const hoursOpt = [
  { key: "1", value: 1 },
  { key: "2", value: 2 },
  { key: "3", value: 3 },
];

interface RoomsData {
  id: string;
  id_ruangan: string;
  kapasitas: number;
  lokasi: string;
  nama: string;
}

interface RoomInfo {
  id: string;
  name: string;
  capacity: number;
  location: string;
  image: string;
}

const Home = () => {
  const { data } = useSession();

  const url = `/book/checkin/${data?.user.id_user}`;
  console.log(url);
  const {
    data: checkin,
    error,
    isLoading,
    mutate,
  } = useSWR(data && url, {
    fallback: { url: [] },
  });

  console.log("DATA SWR", checkin);
  console.log(error);
  console.log(isLoading);

  const handleCheckIn = async (id_user: any, id_book: any) => {
    try {
      const res = await axiosAuth.patch("/book/checkin", {
        data: {
          id_user: id_user,
          id_book: id_book,
        },
      });
      mutate();
      toast.success(res.data.message);
    } catch (error) {
      toast.error("Error");
    }
  };

  return (
    <div className="flex flex-col px-4">
      <h3>Welcome {data?.user.name}</h3>
      <DigitalClock />

      {checkin?.data.length !== 0 && (
        <>
          <Typography sx={{ fontWeight: "bold" }}>Check In</Typography>
          {checkin?.data.map((ci: any) => (
            <>
              <Paper sx={{ color: "white", px: 24, py: 16, backgroundColor: "#737373" }}>
                <Typography variant="h2">{ci.agenda}</Typography>
                <Typography variant="h3">{ci.id_ruangan}</Typography>
                <Typography variant="h3" sx={{ fontWeight: "regular" }}>
                  {`${ci.time_start} - ${ci.time_end} | ${moment(ci.book_date).format(
                    "MM/DD/YYYY"
                  )}`}
                </Typography>
                <Button
                  variant="contained"
                  fullWidth
                  onClick={() => handleCheckIn(data?.user.id_user, ci.id_book)}
                >
                  Check In
                </Button>
              </Paper>
            </>
          ))}
        </>
      )}

      {/* <h4 className="mb-0">Available Room: </h4>
      <div className="flex items-center gap-2 mb-2">
        <Select
          value={hours}
          onChange={(e: SelectChangeEvent) => {
            setHours(e.target.value as string);
          }}
        >
          {hoursOpt.map((item) => (
            <MenuItem key={`${item.key}-${item.value}`} value={item.key}>
              {item.value}
            </MenuItem>
          ))}
        </Select>
        <h3>Hours</h3>
      </div>
      <Suspense fallback={<CardsSkeleton />}>
        <CardRooms hours={hours} />
      </Suspense> */}
    </div>
  );
};

export default Home;
