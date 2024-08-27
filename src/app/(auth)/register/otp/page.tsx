"use client";

import { PasswordWithEyes } from "@/common/PasswordWithEyes";
import { TextFieldComp } from "@/common/TextField";
import { Controller, useForm } from "react-hook-form";
import {
  Button,
  CircularProgress,
  MenuItem,
  Select,
  Link as MuiLink,
  Box,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import axios from "@/lib/axios";
import Link from "next/link";
import SelectComp from "@/common/Select";

interface RegisterInput {
  nama: string;
  business_unit: string;
  email: string;
  username: string;
  password: string;
  otpInput: string;
}

export default function OtpPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const { control, handleSubmit, resetField } = useForm({
    defaultValues: {
      email: "",
    } as RegisterInput,
  });

  useEffect(() => {
    const storedEmail = sessionStorage.getItem("userEmail");
    if (storedEmail) {
      resetField("email", { defaultValue: storedEmail });
    }
  }, [resetField]);

  const onVerif = async (values: RegisterInput) => {
    console.log(values);
    setLoading(true);

    try {
      const res = await axios.post("/user/verifynew", {
        email: values.email,
        otpInput: values.otpInput,
      });
      if (res?.status === 200) {
        toast.success("Account verified");
        router.replace("/login");
        sessionStorage.removeItem("userEmail");
      } else {
        toast.error("❌ Failed to register");
        setLoading(false);
      }
      setLoading(false);
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
        <Typography variant="h2">Register</Typography>
        <Typography>Please check OTP on your email</Typography>
      </Box>
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
    </>
  );
}
