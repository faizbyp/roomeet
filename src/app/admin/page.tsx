import Wrapper from "@/common/Wrapper";
import { axiosAuth } from "@/lib/axios";
import { Box, Paper } from "@mui/material";
import Link from "next/link";
import { Suspense } from "react";

const AdminPage = async () => {
  const get = await axiosAuth.get("/book");
  const books = get.data.data;
  console.log(books);

  return (
    <>
      <Wrapper>
        <h1>Admin Page</h1>
        <Box sx={{ display: "flex", gap: 8, flexDirection: "column", px: 16 }}>
          <Suspense fallback={<div>Loading...</div>}>
            {books.map((book: any) => (
              <Paper square={false} key={book.id} sx={{ px: 8, py: 6 }}>
                <h3>{book.agenda}</h3>
                <p>User: {book.id_user}</p>
                <p>{book.id_ruangan}</p>
              </Paper>
            ))}
          </Suspense>
        </Box>
      </Wrapper>
    </>
  );
};
export default AdminPage;
