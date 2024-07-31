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

export default function RegisterPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [verify, setVerify] = useState(false);
  const [email, setEmail] = useState<any>();
  const [bizUnit, setBizUnit] = useState<any>();
  const [div, setDiv] = useState<any>();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const getEmail = await axios.get("/user/email");
        const getUnit = await axios.get("/user/bizunit");

        setEmail(getEmail.data);
        setBizUnit(getUnit.data);
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
  }, []);

  const { control, handleSubmit, getValues } = useForm({
    defaultValues: {
      nama: "",
      business_unit: "",
      email: "",
      username: "",
      password: "",
    } as RegisterInput,
  });

  const register = async (values: RegisterInput) => {
    console.log(values);
    setLoading(true);

    try {
      const res = await axios.post("/user/register", {
        nama: values.nama,
        business_unit: values.business_unit,
        email: values.email,
        username: values.username,
        password: values.password,
      });
      if (res?.status === 200) {
        toast.success("Verify OTP");
        setVerify(true);
        setLoading(false);
      } else {
        toast.error("❌ Failed to register");
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
      }
      // else {
      //   toast.error("❌ Failed to register");
      //   setLoading(false);
      // }
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
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 32,
        justifyContent: "center",
        minHeight: "100svh",
        py: 16,
      }}
    >
      <Box>
        <Typography variant="h1" sx={{ color: "primary.light" }}>
          ROOMEET
        </Typography>
        <Typography variant="h2">Register</Typography>
      </Box>
      {!verify ? (
        <>
          <Box component="form" onSubmit={handleSubmit(register)} sx={{ width: "100%" }}>
            <Box sx={{ mb: 12 }}>
              <TextFieldComp
                control={control}
                label="Name"
                name="nama"
                rules={{ required: "Field required" }}
              />
            </Box>
            <Box sx={{ mb: 12 }}>
              <SelectComp
                name="business_unit"
                label="Business Unit"
                rules={{ required: "Field required" }}
                control={control}
              >
                {bizUnit &&
                  bizUnit.data.map((b: any) => (
                    <MenuItem value={b.id_unit} key={b.id_unit}>
                      {b.biz_unit} - {b.division}
                    </MenuItem>
                  ))}
              </SelectComp>
            </Box>
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
                  validate: {
                    domain: (value: any) =>
                      email?.data.some((em: any) => em.domain === value.split("@")[1]) ||
                      "Domain not allowed",
                  },
                }}
              />
            </Box>
            <Box sx={{ mb: 12 }}>
              <TextFieldComp
                control={control}
                label="Username"
                name="username"
                rules={{ required: "Field required" }}
              />
            </Box>
            <Box sx={{ mb: 12 }}>
              <PasswordWithEyes
                control={control}
                label="Password"
                name="password"
                rules={{ required: "Field required" }}
              />
            </Box>
            <Box sx={{ display: "flex", justifyContent: "end" }}>
              <Button variant="contained" type="submit" disabled={loading}>
                Register
              </Button>
            </Box>
          </Box>
          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <MuiLink href="/login" component={Link}>
              Login
            </MuiLink>
          </Box>
        </>
      ) : (
        <Box component="form" onSubmit={handleSubmit(onVerif)} sx={{ width: "100%" }}>
          <Typography>Please check OTP on your email</Typography>
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
            {loading ? (
              <CircularProgress />
            ) : (
              <Button type="submit" variant="contained">
                Verify
              </Button>
            )}
          </Box>
        </Box>
      )}
    </Box>
  );
}
