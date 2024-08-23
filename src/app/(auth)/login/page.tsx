"use client";
import { PasswordWithEyes } from "@/common/PasswordWithEyes";
import { TextFieldComp } from "@/common/TextField";
import { useForm } from "react-hook-form";
import { Box, Button, CircularProgress, Container, Typography } from "@mui/material";
import { Link as MuiLink } from "@mui/material";
import { useState } from "react";
import { signIn, getSession, SignInOptions } from "next-auth/react";
import toast from "react-hot-toast";
import { useSWReg } from "@/lib/provider/SWRegProvider";
import { useRouter } from "next/navigation";
import Link from "next/link";

interface LoginInput {
  username: string;
  password: string;
}

interface Payload {
  username: string;
  password: string;
  subscription?: any;
  callbackUrl: string;
  redirect: boolean;
}

const base64ToUint8Array = (base64: any) => {
  console.log(base64);
  const padding = "=".repeat((4 - (base64.length % 4)) % 4);
  const b64 = (base64 + padding).replace(/-/g, "+").replace(/_/g, "/");
  console.log(b64);

  const rawData = window.atob(b64);
  const outputArray = new Uint8Array(rawData.length);

  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
};

export default function LoginPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const SW = useSWReg();
  const SWReg = SW?.SWReg;
  const { control, handleSubmit } = useForm({
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const loginUser = async (values: LoginInput) => {
    setLoading(true);
    let sub = null;
    try {
      if ("Notification" in window) {
        if (SWReg && Notification?.permission === "granted") {
          sub = await SWReg?.pushManager.subscribe({
            userVisibleOnly: true,
            applicationServerKey: base64ToUint8Array(process.env.NEXT_PUBLIC_WEB_PUSH_PUBLIC_KEY),
          });
        }
      }
      let payload: Payload = {
        username: values.username,
        password: values.password,
        subscription: sub && JSON.stringify({ sub }),
        callbackUrl: "/",
        redirect: false,
      };
      if (payload.subscription === null) {
        delete payload.subscription;
      }
      console.log(sub);
      const res = await signIn("credentials", payload as any);
      console.log("RESPON", res);

      if (res?.status === 200) {
        let session = await getSession();
        while (!session) {
          session = await getSession();
        }

        if (session?.user.role_id === process.env.NEXT_PUBLIC_USER_ID) {
          console.log("redirect");
          router.replace("/dashboard");
        } else if (session?.user.role_id === process.env.NEXT_PUBLIC_ADMIN_ID) {
          console.log("redirect");
          router.replace("/admin");
        } else {
          console.log("session role id", session?.user.role_id);
          console.log("env user role id", process.env.NEXT_PUBLIC_USER_ID);
          setLoading(false);
          toast("Please try again");
        }
      } else if (res?.status === 401) {
        if (res.error) {
          toast.error(JSON.parse(res.error).message);
        } else {
          toast.error("Error");
        }
        setLoading(false);
      } else {
        toast.error("❌ Failed to login");
        setLoading(false);
      }
    } catch (error) {
      console.error("login error", error);
    }
  };

  return (
    <>
      <Box>
        <Typography variant="h1" sx={{ color: "primary.light" }}>
          ROOMEET
        </Typography>
        <Typography variant="h2">Login</Typography>
      </Box>
      <Box component="form" onSubmit={handleSubmit(loginUser)} sx={{ width: "100%" }}>
        <Box sx={{ mb: 12 }}>
          <TextFieldComp
            control={control}
            label="Email / Username"
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
          <Button type="submit" variant="contained" disabled={loading}>
            {loading ? <CircularProgress /> : "Login"}
          </Button>
        </Box>
      </Box>
      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <MuiLink href="/forgot-pass" component={Link}>
          Forgot Password?
        </MuiLink>
      </Box>
      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <MuiLink href="/register" component={Link}>
          Create Account
        </MuiLink>
      </Box>
    </>
  );
}
