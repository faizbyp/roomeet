"use client";

import { Box, Button, Paper, Typography } from "@mui/material";
import clsx from "clsx";
import { useSession } from "next-auth/react";
import Link from "next/link";
import useSWR from "swr";

const AdminPage = () => {
  const { data } = useSession();
  const url = "/book";
  const {
    data: books,
    error,
    isLoading,
    mutate,
  } = useSWR(data && url, {
    fallback: { url: [] },
  });
  console.log("REVALIDATE");

  return (
    <>
      <h1>Admin Page</h1>
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
