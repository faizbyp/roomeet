"use client";

import { useState, Suspense } from "react";
import { CardsListBook } from "@/components/booklist/CardListBook";
import { IconButton, Box, Typography } from "@mui/material";
import { CardsListBookSkeleton } from "@/common/skeletons/CardSkeleton";
import BackspaceIcon from "@mui/icons-material/Backspace";
import { DatePicker } from "@mui/x-date-pickers";
import moment from "moment";

export default function BookListPage() {
  const [date, setDate] = useState<any>("");
  const [dateVal, setDateVal] = useState<any>(null);
  // const [eventStatus, setStatus] = useState("all");
  // const [filter, setFilter] = useState();

  const handleDate = (value: any) => {
    const d = moment(value).format("YYYY-MM-DD");
    setDateVal(value);
    setDate(d);
    console.log(d);
  };

  return (
    <Box sx={{ m: 16 }}>
      <Typography variant="h1" sx={{ color: "primary.main" }}>
        My Book List
      </Typography>
      <Box sx={{ display: "flex", alignItems: "center", gap: 8, my: 16 }}>
        <DatePicker value={dateVal} label="Search Date" onChange={handleDate} />
        <IconButton
          aria-label="clear"
          onClick={() => {
            setDate("");
            setDateVal(null);
          }}
        >
          <BackspaceIcon />
        </IconButton>

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
      </Box>
      <Box sx={{ maxHeight: "70vh", overflow: "auto" }}>
        <Suspense fallback={<CardsListBookSkeleton />}>
          <CardsListBook date={date} />
        </Suspense>
      </Box>
    </Box>
  );
}
