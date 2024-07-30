"use client";

import { Box, Grid, IconButton, Typography } from "@mui/material";
import { useSession } from "next-auth/react";
import useSWR from "swr";
import { CardsListBookSkeleton } from "@/common/skeletons/CardSkeleton";
import Link from "next/link";
import { axiosAuth } from "@/lib/axios";
import axios, { AxiosError } from "axios";
import toast from "react-hot-toast";
import ConfirmationDialog from "@/common/ConfirmationDialog";
import EditIcon from "@mui/icons-material/Edit";
import ClearIcon from "@mui/icons-material/Clear";
import moment from "moment";

interface CardListBookProp {
  agendaTitle: string;
  room: string;
  startTime: string;
  endTime: string;
  bookDate: string;
  status: string;
  id_book: string;
  id_room: string;
  approval: string;
  mutate: any;
}

interface AgendaDatas {
  id_book: string;
  id_user: string;
  id_room: string;
  nama_ruangan: string;
  agenda: string;
  is_active: string;
  time_start: string;
  time_end: string;
  book_date: string;
  approval: string;
  status: string;
}

export function CardListBook({
  agendaTitle,
  startTime,
  endTime,
  bookDate,
  status,
  room,
  id_book,
  id_room,
  approval,
  mutate,
}: CardListBookProp) {
  const handleDelete = async (id_book: string) => {
    try {
      await axiosAuth.delete(`/book/${id_book}`);
      mutate();
      toast.success(`Success canceling ${id_book}`);
    } catch (error) {
      const errors = error as AxiosError;
      if (axios.isAxiosError(error)) {
        const data = errors.response?.data as { message: string };
        toast.error(data.message);
      } else {
        toast.error("error");
      }
      console.error(error);
    }
  };

  return (
    <>
      <Box sx={{ px: 24, py: 24, bgcolor: "background.card", mb: 16, borderRadius: 4 }}>
        <Grid container>
          <Grid item xs={8}>
            <Typography variant="h3" sx={{ color: "primary.light" }}>
              {agendaTitle}
            </Typography>
            <Typography variant="h4">{room}</Typography>
            <Typography>{`${moment(bookDate).format("DD/MM/YYYY")}`}</Typography>
            <Typography>{`${startTime} - ${endTime}`}</Typography>
          </Grid>
          <Grid
            item
            xs={4}
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "end",
              justifyContent: "space-between",
            }}
          >
            <Typography
              align="center"
              sx={[
                {
                  color: "black",
                  borderRadius: 2,
                  width: "100%",
                },
                approval === "pending" && {
                  backgroundColor: "warning.main",
                },
                approval === "rejected" && {
                  backgroundColor: "error.main",
                },
                approval === "approved" && {
                  backgroundColor: "success.main",
                },
              ]}
            >
              {approval}
            </Typography>
            <Box sx={{ display: "flex", gap: 8 }}>
              <Link href={`/dashboard/book/${id_room}/${id_book}`}>
                <IconButton
                  sx={{
                    bgcolor: "secondary.main",
                    color: "#202020",
                    "&:hover": {
                      bgcolor: "secondary.light",
                    },
                  }}
                >
                  <EditIcon />
                </IconButton>
              </Link>
              <ConfirmationDialog
                title="Submit Book"
                desc="Are you sure you want to delete?"
                action="Delete"
                response={() => handleDelete(id_book)}
                type="button"
                color="error"
              >
                {(showDialog: any) => (
                  <IconButton
                    sx={{
                      bgcolor: "error.main",
                      color: "#fafafa",
                      "&:hover": {
                        bgcolor: "error.light",
                      },
                    }}
                    onClick={showDialog}
                  >
                    <ClearIcon />
                  </IconButton>
                )}
              </ConfirmationDialog>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </>
  );
}

export function CardsListBook({ date }: any) {
  const { data } = useSession();
  const url = `/book/show?id_user=${data?.user?.id_user}&book_date=${date}`;
  const {
    data: agendas,
    error,
    isLoading,
    mutate,
    isValidating,
  } = useSWR(data && url, {
    suspense: true,
    fallback: {
      [url]: [],
    },
  });
  const agendasData: Array<CardListBookProp> = agendas
    ? agendas?.data?.map((item: AgendaDatas) => ({
        agendaTitle: item.agenda,
        room: item.nama_ruangan,
        startTime: item.time_start,
        endTime: item.time_end,
        bookDate: item.book_date,
        status: item.status,
        id_book: item.id_book,
        id_room: item.id_room,
        approval: item.approval,
      }))
    : [];
  console.log(agendas);
  console.log(isValidating);
  console.log("TANGGAL", date);

  return (
    <>
      <Box sx={{ px: 24 }}>
        {!isLoading &&
          agendasData &&
          agendasData.map((item) => (
            <CardListBook {...item} mutate={mutate} key={item.id_book + item.id_room} />
          ))}
      </Box>
      {isLoading && !agendasData && <CardsListBookSkeleton />}
    </>
  );
}
