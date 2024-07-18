"use client";

import ApprovalAction from "@/components/admin/ApprovalAction";
import { axiosAuth } from "@/lib/axios";
import { Box, Button, TextField, Typography } from "@mui/material";
import moment from "moment";
import { Suspense, useEffect, useState } from "react";
import toast from "react-hot-toast";

export const Approval = ({ params }: { params: { id_book: string } }) => {
  const [book, setBook] = useState<any>();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const get = await axiosAuth.get(`/book/${params.id_book}`);
        setBook(get.data);
      } catch (error: any) {
        if (error?.response) {
          toast.error(error.response.data.message);
        } else {
          toast.error("Server Error");
          console.log(error);
        }
      }
    };

    fetchData();
  }, [params.id_book]);

  return (
    <>
      {book ? (
        <>
          <p>{`Approval - ${book.approval}`}</p>
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
        </>
      ) : (
        <p>Loading...</p>
      )}
    </>
  );
};
export default Approval;
