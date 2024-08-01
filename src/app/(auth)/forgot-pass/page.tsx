"use client";

import { TextFieldComp } from "@/common/TextField";
import { useForm } from "react-hook-form";
import { Box, Button, CircularProgress, Link as MuiLink, Typography } from "@mui/material";
import { useState } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import axios from "@/lib/axios";
import Link from "next/link";

interface ReqInput {
  email: string;
  otpInput: string;
}

export default function ForgotPass() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const { control, handleSubmit } = useForm({
    defaultValues: {
      email: "",
      otpInput: "",
    } as ReqInput,
  });

  const reqReset = async (values: ReqInput) => {
    console.log(values);
    setLoading(true);

    try {
      const res = await axios.post("/user/reqres", {
        email: values.email,
      });
      if (res?.status === 200) {
        toast.success(res.data.message);
        router.replace(`/forgot-pass/reset/${values.email}`);
      } else {
        toast.error(res.data.message);
        setLoading(false);
      }
    } catch (error: any) {
      if (error?.response.data) {
        toast.error(error.response.data.message);
      } else {
        toast.error("Server Error");
        console.log(error);
      }
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 32,
        justifyContent: "center",
        minHeight: "100svh",
      }}
    >
      <Box>
        <Typography variant="h1" sx={{ color: "primary.light" }}>
          ROOMEET
        </Typography>
        <Typography variant="h2">Forgot Password</Typography>
      </Box>

      <Box component="form" onSubmit={handleSubmit(reqReset)} sx={{ width: "100%" }}>
        <Box sx={{ mb: 12 }}>
          <TextFieldComp
            control={control}
            label="Email"
            name="email"
            rules={{
              required: "Field required",
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: "invalid email address",
              },
            }}
          />
        </Box>
        <Box sx={{ display: "flex", justifyContent: "end" }}>
          <Button type="submit" variant="contained" disabled={loading}>
            {loading ? <CircularProgress /> : "Send"}
          </Button>
        </Box>
      </Box>
      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <MuiLink href="/login" component={Link}>
          Login
        </MuiLink>
      </Box>
    </Box>
  );
}
