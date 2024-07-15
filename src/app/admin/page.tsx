"use client";

import {
  Box,
  Button,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Stack,
  Typography,
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import moment from "moment";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useState } from "react";
import useSWR from "swr";

const AdminPage = () => {
  const { data } = useSession();
  const [date, setDate] = useState<any>("");
  const [status, setStatus] = useState<any>("");
  const [dateVal, setDateVal] = useState<any>();
  const url = `/book?book_date=${date}&approval=${status}`;
  const {
    data: books,
    error,
    isLoading,
    mutate,
  } = useSWR(data && url, {
    fallback: { url: [] },
  });
  console.log("REVALIDATE");

  const handleDate = (value: any) => {
    const d = moment(value).format("YYYY-MM-DD");
    setDate(d);
    console.log(d);
  };

  const handleStatus = (e: any) => {
    const s = e.target.value;
    setStatus(s);
    console.log(s);
  };

  return (
    <>
      <Box
        sx={{
          py: 16,
          position: "fixed",
          backgroundColor: "#262626",
          width: "450px",
          zIndex: "999",
        }}
      >
        <Typography variant="h1">Admin Page</Typography>
        <Box sx={{ display: "flex", gap: 8 }}>
          <Stack direction="column">
            <DatePicker value={dateVal} label="Search Date" onChange={handleDate} sx={{ mb: 16 }} />
            <Button
              size="small"
              onClick={() => {
                setDate("");
                setDateVal(null);
              }}
            >
              Reset Date
            </Button>
          </Stack>
          <FormControl fullWidth>
            <InputLabel>Approval Status</InputLabel>
            <Select defaultValue="" value={status} label="Approval" onChange={handleStatus}>
              <MenuItem value="">---</MenuItem>
              <MenuItem value="pending">Pending</MenuItem>
              <MenuItem value="approved">Approved</MenuItem>
              <MenuItem value="rejected">Rejected</MenuItem>
            </Select>
          </FormControl>
        </Box>
      </Box>

      <Box sx={{ height: "190px" }} />

      <Box sx={{ display: "flex", gap: 8, flexDirection: "column", px: 16 }}>
        {isLoading ? (
          <p>Loading...</p>
        ) : (
          <>
            {books?.data.map((book: any) => (
              <Paper
                square={false}
                key={book.id}
                sx={{ color: "white", p: 24, backgroundColor: "#737373" }}
              >
                <Box
                  sx={[
                    {
                      color: "black",
                      mb: 16,
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
                  <Typography>Status: {book.approval}</Typography>
                  <Typography>{book.reject_note && `${book.reject_note}`}</Typography>
                </Box>
                <Grid container spacing={2}>
                  <Grid item xs={6}>
                    <Typography>{book.id_ticket}</Typography>
                    <Typography variant="h3">{book.agenda}</Typography>
                    <Typography sx={{ mb: 16 }}>User: {book.username}</Typography>
                    <Link href={`/admin/approval/${book.id_book}`}>
                      <Button variant="contained">Details</Button>
                    </Link>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography>{book.id_ruangan}</Typography>
                    <Typography>{moment(book.book_date).format("YYYY-MM-DD")}</Typography>
                    <Typography>{`${book.time_start} - ${book.time_end}`}</Typography>
                  </Grid>
                </Grid>
              </Paper>
            ))}
          </>
        )}
      </Box>
    </>
  );
};
export default AdminPage;
