"use client";

import { TextFieldComp } from "@/common/TextField";
import axios from "axios";
import { Box, Button, FormControlLabel, Radio, RadioGroup } from "@mui/material";
import { AxiosError } from "axios";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import useAxiosAuth from "@/lib/hooks/useAxiosAuth";
import { useRouter } from "next/navigation";
import { format } from "date-fns";

interface DefaultVal {
  book_date: Date;
  time_start: Date;
  time_end: Date;
  capacity: number;
  ruangan: string;
  agenda: string;
  remark: string;
  approval: string;
  reject_note: string;
  id_user: string;
  username: string;
  email: string;
  id_ticket: string;
  id_ruangan: string;
  prtcpt_ctr: string;
}

export default function ApprovalAction({ id_book, props }: any) {
  console.log("BOOK", props);

  const axiosAuth = useAxiosAuth();
  const router = useRouter();
  const [reject, setReject] = useState<any>();
  const [approve, setApprove] = useState<any>();
  const [loading, setLoading] = useState(false);
  const form = useForm({
    defaultValues: {
      book_date: props.book_date,
      time_start: props.time_start,
      time_end: props.time_end,
      capacity: props.prtcpt_ctr,
      ruangan: props.id_ruangan,
      agenda: props.agenda,
      remark: props.remark,
      approval: "",
      reject_note: "",
      id_user: props.id_user,
      username: props.username,
      email: props.email,
      id_ticket: props.id_ticket,
      id_ruangan: props.id_ruangan,
      prtcpt_ctr: props.prtcpt_ctr,
    } as DefaultVal,
  });

  const submitApproval = async (values: DefaultVal) => {
    setLoading(true);

    const bookDate = new Date(values.book_date);
    const timeStart = new Date(`${format(bookDate, "yyyy-MM-dd")} ${values.time_start}`);
    const timeEnd = new Date(`${format(bookDate, "yyyy-MM-dd")} ${values.time_end}`);

    const payload = {
      book_date: format(bookDate, "Y-L-d"),
      time_start: format(timeStart as Date, "HH:mm"),
      time_end: format(timeEnd as Date, "HH:mm"),
      capacity: values.capacity,
      ruangan: values.ruangan,
      agenda: values.agenda,
      remark: values.remark,
      approval: values.approval,
      reject_note: values.reject_note,
      id_user: values.id_user,
      username: values.username,
      email: values.email,
      id_ticket: values.id_ticket,
      id_ruangan: values.id_ruangan,
      prtcpt_ctr: values.prtcpt_ctr,
    };
    console.log(payload);
    try {
      const res = await axiosAuth.patch(`/book/approval/${id_book}`, { data: payload });
      toast.success(`${props.id_ticket} ${values.approval}`);
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
      setLoading(false);
    }
  };

  return (
    <Box sx={{ mt: 24, mb: 32 }}>
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
          <Box sx={{ textAlign: "right" }}>
            <Button
              type="submit"
              variant="contained"
              disabled={loading}
              sx={{ my: 8, mb: 32 }}
              fullWidth
            >
              Approve
            </Button>
          </Box>
        )}
        {reject && (
          <>
            <Box sx={{ my: 8 }}>
              <TextFieldComp
                multiline={true}
                rows={5}
                control={form.control}
                name="reject_note"
                label="Note"
                rules={{
                  required: "Field required",
                }}
              />
              <Box sx={{ textAlign: "right" }}>
                <Button
                  type="submit"
                  variant="contained"
                  disabled={loading}
                  sx={{ mt: 8, mb: 32 }}
                  fullWidth
                >
                  Reject
                </Button>
              </Box>
            </Box>
          </>
        )}
      </form>
    </Box>
  );
}
