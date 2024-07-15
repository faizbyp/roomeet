import ApprovalAction from "@/components/admin/ApprovalAction";
import { axiosAuth } from "@/lib/axios";
import { Box, Button, TextField, Typography } from "@mui/material";
import moment from "moment";
import { Suspense } from "react";

export const Approval = async ({ params }: { params: { id_book: string } }) => {
  let book;
  try {
    const get = await axiosAuth.get(`/book/${params.id_book}`);
    book = get.data;
  } catch (error) {
    console.error(error);
  }

  return (
    <>
      <p>{`Approval - ${book.approval}`}</p>
      <Suspense fallback={<p>Loading...</p>}>
        <Typography variant="h1">{book.agenda}</Typography>
        <Typography variant="h2">{book.id_ruangan}</Typography>
        <Typography>{`${book.prtcpt_ctr} participants`}</Typography>
        <p>
          Created by:
          <br />
          {book.username}
        </p>
        <TextField
          fullWidth
          label="Remark"
          variant="filled"
          value={book.remark ? book.remark : "---"}
          disabled
          sx={{ mb: 8 }}
        />
        <TextField
          fullWidth
          label="Booking Date"
          variant="filled"
          value={moment(book.book_date).format("dddd, MM/DD/YYYY")}
          disabled
        />
        <p>Time</p>
        <TextField label="Start Time" variant="filled" value={book.time_start} disabled />
        <TextField label="End Time" variant="filled" value={book.time_end} disabled />

        {book.approval === "approved" || book.approval === "rejected" ? null : (
          <ApprovalAction id_book={params.id_book} props={book} />
        )}
      </Suspense>
    </>
  );
};
export default Approval;
