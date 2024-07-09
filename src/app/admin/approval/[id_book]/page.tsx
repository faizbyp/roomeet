import ApprovalAction from "@/components/admin/ApprovalAction";
import { axiosAuth } from "@/lib/axios";
import { Box, Button, TextField } from "@mui/material";
import moment from "moment";
import { Suspense } from "react";

export const Approval = async ({ params }: { params: { id_book: string } }) => {
  const get = await axiosAuth.get(`/book/${params.id_book}`);
  const book = get.data;

  return (
    <>
      <p>Approval</p>
      <Suspense fallback={<p>Loading...</p>}>
        <h1>{book.agenda}</h1>
        <h2>{book.id_ruangan}</h2>
        <p>{`${book.prtcpt_ctr} participants`}</p>
        <p>
          Created by:
          <br />
          {book.id_user}
        </p>
        <TextField
          fullWidth
          label="Remark"
          variant="filled"
          value={book.remark ? book.remark : "---"}
          disabled
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

        <ApprovalAction id_book={params.id_book} props={book} />
      </Suspense>
    </>
  );
};
export default Approval;
