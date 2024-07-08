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

interface DefaultVal {
  approval: string;
  reject_note: string;
}

export default function ApprovalAction({ id_book }: any) {
  const axiosAuth = useAxiosAuth();
  const router = useRouter();
  const [reject, setReject] = useState<any>();
  const [approve, setApprove] = useState<any>();
  const form = useForm({
    defaultValues: {
      approval: "",
      reject_note: "",
    } as DefaultVal,
  });

  const submitApproval = async (values: DefaultVal) => {
    const payload = {
      approval: values.approval,
      reject_note: values.reject_note,
    };
    console.log(payload);
    try {
      const res = await axiosAuth.patch(`/book/approval/${id_book}`, { data: payload });
      toast.success("Success");
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
