"use client";

import { Box, Button, Paper, Typography } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import moment from "moment";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useState } from "react";
import useSWR from "swr";

const AdminPage = () => {
  const { data } = useSession();
  const [date, setDate] = useState<any>("");
  const url = `/book?book_date=${date}`;
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

  return (
    <>
      <h1>Admin Page</h1>
      <DatePicker
        label="Search Date"
        onChange={handleDate}
        // slotProps={{ field: { clearable: true } }}
        sx={{ mb: 16 }}
      />
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
