"use client";

import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Paper,
  Select,
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
      <Box sx={{ my: 16 }}>
        <Typography variant="h1">Admin Page</Typography>
      </Box>
      <Box sx={{ display: "flex", gap: 8 }}>
        <DatePicker
          label="Search Date"
          onChange={handleDate}
          // slotProps={{ field: { clearable: true } }}
          sx={{ mb: 16 }}
        />
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
                <Typography variant="h3">{book.agenda}</Typography>
                <Typography>{moment(book.book_date).format("YYYY-MM-DD")}</Typography>
                <Typography>User: {book.username}</Typography>
                <Typography sx={{ mb: 16 }}>{book.id_ruangan}</Typography>
                <Link href={`/admin/approval/${book.id_book}`}>
                  <Button variant="contained">Details</Button>
                </Link>
              </Paper>
            ))}
          </>
        )}
      </Box>
    </>
  );
};
export default AdminPage;
