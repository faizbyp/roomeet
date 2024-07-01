"use client";

import { useState, Suspense } from "react";
import { CardsListBook } from "@/components/booklist/CardListBook";
import { Select, MenuItem, useMediaQuery } from "@mui/material";
import { CardsListBookSkeleton } from "@/common/skeletons/CardSkeleton";
import { TextFieldComp } from "@/common/TextField";
import { useForm } from "react-hook-form";

export default function BookListPage() {
  const [eventStatus, setStatus] = useState("all");

  const { control } = useForm({
    defaultValues: {
      search: "",
    },
  });

  return (
    <>
      <div className="flex justify-evenly items-center m-5 ">
        <TextFieldComp control={control} label="Search" name="search" />

        <Select
          value={eventStatus}
          onChange={(e) => {
            setStatus(e.target.value);
          }}
          className="w-[14rem]"
        >
          <MenuItem value="all">All</MenuItem>
          <MenuItem value="upcoming">Upcoming</MenuItem>
          <MenuItem value="prospective">Prospective</MenuItem>
          <MenuItem value="inactive">Inactive</MenuItem>
        </Select>
      </div>
      <div className="h-[82vh] overflow-y-scroll rounded-xl">
        <Suspense fallback={<CardsListBookSkeleton />}>
          <CardsListBook />
        </Suspense>
      </div>
    </>
  );
}
