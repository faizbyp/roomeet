import { axiosAuth } from "@/lib/axios";
import { Box, Paper } from "@mui/material";
import clsx from "clsx";
import Link from "next/link";
import { Suspense } from "react";

export const AdminPage = async () => {
  let books;
  try {
    const get = await axiosAuth.get("/book");
    books = get.data.data;
  } catch (error) {
    console.error(error);
  }

  return (
    <>
      <h1>Admin Page</h1>
      <Box sx={{ display: "flex", gap: 8, flexDirection: "column", px: 16 }}>
        <Suspense fallback={<div>Loading...</div>}>
          {books?.map((book: any) => (
            <Paper square={false} key={book.id} sx={{ px: 8, py: 6 }}>
              <p
                className={clsx(
                  book.approval === "pending" && "bg-yellow-500",
                  book.approval === "rejected" && "bg-red-500",
                  book.approval === "approved" && "bg-green-500"
                )}
              >
                Status: {book.approval}
                <br />
                {book.reject_note && `${book.reject_note}`}
              </p>
              <h3>{book.agenda}</h3>
              <p>User: {book.username}</p>
              <p>{book.id_ruangan}</p>
              <Link href={`/admin/approval/${book.id_book}`}>Details</Link>
            </Paper>
          ))}
        </Suspense>
      </Box>
    </>
  );
};
export default AdminPage;
