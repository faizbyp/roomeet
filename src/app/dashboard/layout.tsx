"use client";

import Wrapper from "@/common/Wrapper";
import { SWRConfig } from "swr";
import useAxiosAuth from "@/lib/hooks/useAxiosAuth";
import { Container } from "@mui/material";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const axiosAuth = useAxiosAuth();
  const swrConfig = {
    fetcher: (url: any) => axiosAuth?.get(url).then((res) => res.data),
  };

  return (
    <SWRConfig value={swrConfig}>
      <Container component="section" maxWidth="lg">
        <Wrapper>{children}</Wrapper>
      </Container>
    </SWRConfig>
  );
}
