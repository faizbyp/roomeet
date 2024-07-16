"use client";

import { PasswordWithEyes } from "@/common/PasswordWithEyes";
import { TextFieldComp } from "@/common/TextField";
import { Controller, useForm } from "react-hook-form";
import { Button, CircularProgress, MenuItem, Select } from "@mui/material";
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

  useEffect(() => {
    const fetchEmail = async () => {
      try {
        const get = await axios.get("/user/email");
        setEmail(get.data);
      } catch (error: any) {
        if (error?.response) {
          toast.error(error.response.data.message);
        } else {
          toast.error("Server Error");
          console.log(error);
        }
      }
    };
    fetchEmail();
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
    // setLoading(true);

    // try {
    //   const res = await axios.post("/user/register", {
    //     nama: values.nama,
    //     business_unit: values.business_unit,
    //     email: values.email,
    //     username: values.username,
    //     password: values.password,
    //   });
    //   if (res?.status === 200) {
    //     toast.success("Verify OTP");
    //     setVerify(true);
    //     setLoading(false);
    //   } else {
    //     toast.error("❌ Failed to register");
    //     setLoading(false);
    //   }
    // } catch (error: any) {
    //   if (error?.response.data) {
    //     toast.error(error.response.data.message);
    //   } else {
    //     toast.error("Server Error");
    //     console.log(error);
    //   }
    //   setLoading(false);
    // }
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
      } else {
        toast.error("❌ Failed to register");
        setLoading(false);
      }
    } catch (error) {
      toast.error("Server Error");
      console.log(error);
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-2 items-center">
      <div className="p-5 m-2 text-center">
        <h2>ROOMEET</h2>
        <h3>Register</h3>
      </div>
      {!verify ? (
        <>
          <form onSubmit={handleSubmit(register)} className="w-full grow">
            <div className="my-4">
              <TextFieldComp
                control={control}
                label="Name"
                name="nama"
                rules={{ required: "Field required" }}
              />
            </div>
            <div className="my-4">
              <SelectComp
                name="business_unit"
                label="Business Unit"
                rules={{ required: "Field required" }}
                control={control}
                onChangeOvr={() => console.log(getValues())}
              >
                <MenuItem value="test1">Test</MenuItem>
                <MenuItem value="test2">Test</MenuItem>
                <MenuItem value="test3">Test</MenuItem>
                <MenuItem value="test4">Test</MenuItem>
                <MenuItem value="test5">Test</MenuItem>
                <MenuItem value="test6">Test</MenuItem>
              </SelectComp>
            </div>
            <div className="my-4">
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
            </div>
            <div className="my-4">
              <TextFieldComp
                control={control}
                label="Username"
                name="username"
                rules={{ required: "Field required" }}
              />
            </div>
            <div className="my-4">
              <PasswordWithEyes
                control={control}
                label="Password"
                name="password"
                rules={{ required: "Field required" }}
              />
            </div>
            <div className="flex justify-end">
              {loading ? (
                <CircularProgress />
              ) : (
                <Button type="submit" className="btn-primary">
                  Register
                </Button>
              )}
            </div>
          </form>
          <Link href="/login">Login</Link>
        </>
      ) : (
        <form onSubmit={handleSubmit(onVerif)} className="w-full grow">
          <p>Please check OTP on your email</p>
          <div className="my-4">
            <TextFieldComp
              control={control}
              label="Email"
              name="email"
              key="email"
              rules={{ required: "Field required" }}
              readOnly
            />
          </div>
          <div className="my-4">
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
          </div>
          <div className="flex justify-end">
            {loading ? (
              <CircularProgress />
            ) : (
              <Button type="submit" className="btn-primary">
                Verify
              </Button>
            )}
          </div>
        </form>
      )}
    </div>
  );
}
