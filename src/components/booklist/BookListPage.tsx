"use client";

import { useState, Suspense } from "react";
import { CardsListBook } from "@/components/booklist/CardListBook";
import {
  IconButton,
  Box,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import { CardsListBookSkeleton } from "@/common/skeletons/CardSkeleton";
import BackspaceIcon from "@mui/icons-material/Backspace";
import { DatePicker } from "@mui/x-date-pickers";
import moment from "moment";

export default function BookListPage() {
  const [date, setDate] = useState<any>("");
  const [dateVal, setDateVal] = useState<any>(null);
  const [status, setStatus] = useState<any>("");

  const handleDate = (value: any) => {
    const d = moment(value).format("YYYY-MM-DD");
    setDateVal(value);
    setDate(d);
    console.log(d);
  };

  const handleStatus = (e: any) => {
    const s = e.target.value;
    setStatus(s);
    console.log(s);
  };

  return (
    <Box sx={{ m: 16 }}>
      <Typography variant="h1" sx={{ color: "primary.main" }}>
        My Book List
      </Typography>
      <Box sx={{ display: "flex", alignItems: "center", gap: 8, my: 16 }}>
        <DatePicker value={dateVal} label="Search Date" onChange={handleDate} sx={{ flex: "1" }} />
        <IconButton
          aria-label="clear"
          onClick={() => {
            setDate("");
            setDateVal(null);
          }}
        >
          <BackspaceIcon />
        </IconButton>
      </Box>
      <FormControl fullWidth>
        <InputLabel>Approval Status</InputLabel>
        <Select defaultValue="" value={status} label="Approval" onChange={handleStatus}>
          <MenuItem value="">---</MenuItem>
          <MenuItem value="pending">Pending</MenuItem>
          <MenuItem value="approved">Approved</MenuItem>
          <MenuItem value="rejected">Rejected</MenuItem>
          <MenuItem value="canceled">Canceled</MenuItem>
          <MenuItem value="finished">finished</MenuItem>
        </Select>
      </FormControl>
      <Box sx={{ maxHeight: "70vh", overflow: "auto", mt: 24 }}>
        <Suspense fallback={<CardsListBookSkeleton />}>
          <CardsListBook date={date} status={status} />
        </Suspense>
      </Box>
    </Box>
  );
}
