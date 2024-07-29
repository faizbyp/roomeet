"use client";

import DigitalClock from "./DigitalClock";
import {
  Select,
  MenuItem,
  SelectChangeEvent,
  Paper,
  Button,
  Typography,
  Grid,
  Box,
} from "@mui/material";
import { useEffect, useState } from "react";
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

  useEffect(() => {
    if (Notification.permission !== "denied" || "granted") {
      Notification.requestPermission();
    }
  }, []);

  const ciUrl = `/book/checkin/${data?.user.id_user}`;
  const coUrl = `/book/checkout/${data?.user.id_user}`;
  const bookUrl = `/book/show?id_user=${data?.user.id_user}&limit=2`;

  const { data: checkin, mutate: ciMutate } = useSWR(data && ciUrl, {
    fallback: { ciUrl: [] },
  });

  const { data: checkout, mutate: coMutate } = useSWR(data && coUrl, {
    fallback: { coUrl: [] },
  });

  const { data: books, mutate: bookMutate } = useSWR(data && bookUrl, {
    fallback: { coUrl: [] },
  });

  // console.log("DATA SWR", checkin);
  // console.log(ciError);
  // console.log(ciLoading);

  const handleCheckIn = async (id_user: any, id_book: any) => {
    try {
      const res = await axiosAuth.patch("/book/checkin", {
        data: {
          id_user: id_user,
          id_book: id_book,
        },
      });
      ciMutate();
      coMutate();
      toast.success(res.data.message);
    } catch (error) {
      toast.error("Error");
    }
  };

  const handleCheckOut = async (id_user: any, id_book: any) => {
    try {
      const res = await axiosAuth.patch("/book/checkout", {
        data: {
          id_user: id_user,
          id_book: id_book,
        },
      });
      coMutate();
      toast.success(res.data.message);
    } catch (error) {
      toast.error("Error");
    }
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", px: 4 }}>
      <Box sx={{ my: 16 }}>
        <Typography variant="h1" sx={{ color: "primary.main" }}>
          Welcome!{" "}
          <Box component="span" sx={{ color: "white" }}>
            {data?.user.name}
          </Box>
        </Typography>
      </Box>
      <DigitalClock />

      {checkin && checkin?.data.length !== 0 && (
        <>
          <Typography sx={{ fontWeight: "bold", mb: 16, color: "primary.light" }}>
            Check In
          </Typography>

          {checkin?.data.map((ci: any) => (
            <>
              <Box
                sx={{ px: 24, py: 16, backgroundColor: "background.card", my: 16, borderRadius: 4 }}
              >
                <Typography variant="h2">{ci.agenda}</Typography>
                <Typography variant="h3">{ci.id_ruangan}</Typography>
                <Typography variant="h3" sx={{ fontWeight: "regular" }}>
                  {`${ci.time_start} - ${ci.time_end} | ${moment(ci.book_date).format(
                    "DD/MM/YYYY"
                  )}`}
                </Typography>
                <Button variant="contained" fullWidth>
                  Check In
                </Button>
              </Box>
            </>
          ))}
        </>
      )}

      {checkout && checkout?.data.length !== 0 && (
        <>
          <Typography sx={{ fontWeight: "bold", my: 16, color: "primary.light" }}>
            Check Out
          </Typography>
          {checkout?.data.map((co: any) => (
            <>
              <Box
                sx={{ px: 24, py: 16, backgroundColor: "background.card", mb: 16, borderRadius: 4 }}
              >
                <Typography variant="h2">{co.agenda}</Typography>
                <Typography variant="h3">{co.id_ruangan}</Typography>
                <Typography variant="h3" sx={{ fontWeight: "regular" }}>
                  {`${co.time_start} - ${co.time_end} | ${moment(co.book_date).format(
                    "DD/MM/YYYY"
                  )}`}
                </Typography>
                <Button variant="contained" fullWidth>
                  Check Out
                </Button>
              </Box>
            </>
          ))}
        </>
      )}

      {books && books?.data.length !== 0 && (
        <>
          <Typography sx={{ fontWeight: "bold", my: 16, color: "primary.light" }}>
            Nearest Meeting
          </Typography>
          {books?.data.map((book: any) => (
            <Box
              sx={{ px: 24, py: 16, backgroundColor: "background.card", mb: 16, borderRadius: 4 }}
              key={book.id_book}
            >
              <Grid container>
                <Grid item xs={8}>
                  <Typography variant="h2">{book.agenda}</Typography>
                  <Typography variant="h3">{book.id_room}</Typography>
                  <Typography variant="h4" sx={{ fontWeight: "regular" }}>
                    {`${book.time_start} - ${book.time_end} | ${moment(book.book_date).format(
                      "DD/MM/YYYY"
                    )}`}
                  </Typography>
                </Grid>
                <Grid item xs={4}>
                  <Typography
                    align="center"
                    sx={[
                      {
                        color: "black",
                        borderRadius: 2,
                      },
                      book.approval === "pending" && {
                        backgroundColor: "warning.main",
                      },
                      book.approval === "rejected" && {
                        backgroundColor: "error.main",
                      },
                      book.approval === "approved" && {
                        backgroundColor: "success.main",
                      },
                    ]}
                  >
                    {book.approval}
                  </Typography>
                </Grid>
              </Grid>
            </Box>
          ))}
        </>
      )}
    </Box>
  );
};

export default Home;
