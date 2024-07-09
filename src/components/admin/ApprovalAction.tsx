"use client";

import { TextFieldComp } from "@/common/TextField";
import axios from "axios";
import { Button, FormControlLabel, Radio, RadioGroup } from "@mui/material";
import { AxiosError } from "axios";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import useAxiosAuth from "@/lib/hooks/useAxiosAuth";
import { useRouter } from "next/navigation";
import { format } from "date-fns";

interface DefaultVal {
  approval: string;
  reject_note: string;
  book_date: Date;
  agenda: string;
  id_user: string;
  time_start: Date;
}

export default function ApprovalAction({ id_book, book_date, agenda, id_user, time_start }: any) {
  const axiosAuth = useAxiosAuth();
  const router = useRouter();
  const [reject, setReject] = useState<any>();
  const [approve, setApprove] = useState<any>();
  const form = useForm({
    defaultValues: {
      approval: "",
      reject_note: "",
      book_date: book_date,
      agenda: agenda,
      id_user: id_user,
      time_start: time_start,
    } as DefaultVal,
  });

  const submitApproval = async (values: DefaultVal) => {
    console.log(values);
    console.log(typeof values.time_start);
    console.log(values.time_start);
    console.log(typeof new Date(values.time_start));
    console.log(new Date(values.time_start));

    const bookDate = new Date(values.book_date);
    const timeStart = new Date(`${format(bookDate, "yyyy-MM-dd")} ${values.time_start}`);

    const payload = {
      approval: values.approval,
      reject_note: values.reject_note,
      book_date: format(bookDate, "Y-L-d"),
      agenda: values.agenda,
      id_user: values.id_user,
      time_start: format(timeStart as Date, "HH:mm"),
    };
    console.log(payload);
    try {
      const res = await axiosAuth.patch(`/book/approval/${id_book}`, { data: payload });
      toast.success(`${id_book} ${values.approval}`);
      router.replace("/admin");
      router.refresh();
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
      <div>Action:</div>
      <form onSubmit={form.handleSubmit(submitApproval)}>
        <Controller
          rules={{ required: true }}
          control={form.control}
          name="approval"
          render={({ field }) => (
            <RadioGroup {...field} row>
              <FormControlLabel
                value="approved"
                control={<Radio />}
                label="Approve"
                onClick={() => {
                  setReject(false);
                  setApprove(true);
                  form.setValue("reject_note", "");
                }}
              />
              <FormControlLabel
                value="rejected"
                control={<Radio />}
                label="Reject"
                onClick={() => {
                  setApprove(false);
                  setReject(true);
                }}
              />
            </RadioGroup>
          )}
        />
        {approve && (
          <Button type="submit" variant="contained">
            Approve
          </Button>
        )}
        {reject && (
          <>
            <TextFieldComp
              multiline={true}
              rows={5}
              control={form.control}
              name="reject_note"
              label="Note"
              rules={{
                required: "This field is required",
              }}
            />
            <Button type="submit" variant="contained">
              Reject
            </Button>
          </>
        )}
      </form>
    </>
  );
}
