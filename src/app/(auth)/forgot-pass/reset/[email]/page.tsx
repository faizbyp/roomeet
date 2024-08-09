"use client";

import { TextFieldComp } from "@/common/TextField";
import { useForm } from "react-hook-form";
import { Box, Button, CircularProgress, Link as MuiLink, Typography } from "@mui/material";
import { useState } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import axios from "@/lib/axios";
import Link from "next/link";
import { PasswordWithEyes } from "@/common/PasswordWithEyes";

interface ResetInput {
  email: string;
  otpInput: string;
  newPass: string;
}

export default function ResetPassword({ params }: { params: { email: string } }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [verified, setVerified] = useState(false);

  const { control, handleSubmit } = useForm({
    defaultValues: {
      email: decodeURIComponent(params.email),
      otpInput: "",
      newPass: "",
    } as ResetInput,
  });

  const onVerif = async (values: ResetInput) => {
    console.log(values);
    setLoading(true);

    try {
      const res = await axios.post("/user/verifresotp", {
        email: values.email,
        otpInput: values.otpInput,
      });
      if (res?.status === 200) {
        toast.success(res.data.message);
        console.log(res);
        setVerified(true);
        setLoading(false);
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

  const resetPass = async (values: ResetInput) => {
    console.log(values);
    setLoading(true);

    try {
      const res = await axios.post("/user/resetpass", {
        email: values.email,
        newPass: values.newPass,
      });
      if (res?.status === 200) {
        toast.success(res.data.message);
        router.replace("/login");
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
    <>
      <Box>
        <Typography variant="h1" sx={{ color: "primary.light" }}>
          ROOMEET
        </Typography>
        <Typography variant="h2">{!verified ? "Verify OTP" : "Reset Password"}</Typography>
      </Box>

      {verified ? (
        <Box component="form" onSubmit={handleSubmit(resetPass)} sx={{ width: "100%" }}>
          <Box sx={{ mb: 12 }}>
            <TextFieldComp
              control={control}
              label="Email"
              name="email"
              key="email"
              rules={{ required: "Field required" }}
              readOnly
            />
          </Box>
          <Box sx={{ mb: 12 }}>
            <PasswordWithEyes
              control={control}
              label="New Password"
              name="newPass"
              rules={{ required: "Field required" }}
            />
          </Box>
          <Box sx={{ display: "flex", justifyContent: "end" }}>
            <Button type="submit" variant="contained" disabled={loading}>
              {loading ? <CircularProgress /> : "Reset"}
            </Button>
          </Box>
        </Box>
      ) : (
        <Box component="form" onSubmit={handleSubmit(onVerif)} sx={{ width: "100%" }}>
          <Box sx={{ mb: 12 }}>
            <TextFieldComp
              control={control}
              label="Email"
              name="email"
              key="email"
              rules={{ required: "Field required" }}
              readOnly
            />
          </Box>
          <Box sx={{ mb: 12 }}>
            <TextFieldComp
              control={control}
              label="OTP Code"
              name="otpInput"
              key="otpInput"
              rules={{
                required: "Field required",
                validate: {
                  length: (values: any) => values.length === 6 || "OTP is 6 character length",
                },
              }}
            />
          </Box>
          <Box sx={{ display: "flex", justifyContent: "end" }}>
            <Button type="submit" variant="contained" disabled={loading}>
              {loading ? <CircularProgress /> : "Verify"}
            </Button>
          </Box>
        </Box>
      )}
    </>
  );
}
