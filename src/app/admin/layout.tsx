"use client";

import WrapperAdmin from "@/common/WrapperAdmin";
import { SWRConfig } from "swr";
import useAxiosAuth from "@/lib/hooks/useAxiosAuth";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const axiosAuth = useAxiosAuth();
  const swrConfig = {
    fetcher: (url: any) => axiosAuth.get(url).then((res) => res.data),
  };

  return (
    <SWRConfig value={swrConfig}>
      <WrapperAdmin>{children}</WrapperAdmin>
    </SWRConfig>
  );
}
