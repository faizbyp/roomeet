"use client";

import { useState, Suspense } from "react";
import { CardsListBook } from "@/components/booklist/CardListBook";
import { Select, MenuItem, Stack, Button } from "@mui/material";
import { CardsListBookSkeleton } from "@/common/skeletons/CardSkeleton";
import { useForm } from "react-hook-form";
import { DatePicker } from "@mui/x-date-pickers";
import moment from "moment";

export default function BookListPage() {
  const [eventStatus, setStatus] = useState("all");
  const [date, setDate] = useState<any>("");
  const [dateVal, setDateVal] = useState<any>(null);
  const [filter, setFilter] = useState();

  const handleDate = (value: any) => {
    const d = moment(value).format("YYYY-MM-DD");
    setDateVal(value);
    setDate(d);
    console.log(d);
  };

  return (
    <>
      <div className="flex justify-evenly items-center m-5 ">
        <Stack direction="column">
          <DatePicker value={dateVal} label="Search Date" onChange={handleDate} />
          <Button
            size="small"
            onClick={() => {
              setDate("");
              setDateVal(null);
            }}
          >
            Reset Date
          </Button>
        </Stack>

        {/* <Select
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
        </Select> */}
      </div>
      <div className="h-[82vh] overflow-y-scroll rounded-xl">
        <Suspense fallback={<CardsListBookSkeleton />}>
          <CardsListBook date={date} />
        </Suspense>
      </div>
    </>
  );
}
