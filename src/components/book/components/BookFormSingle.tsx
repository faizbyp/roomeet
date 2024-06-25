"use client";

import DatePickerComp from "@/common/DatePicker";
import { useForm } from "react-hook-form";
import { Button, TextField } from "@mui/material";
import TimePickerComp from "@/common/TimePicker";
import { CardRoom, CardRooms } from "./CardRoom";
import { TextFieldComp } from "@/common/TextField";
import { room } from "@/mock/room";
import { useState } from "react";
import Slider from "react-slick";
import { Suspense } from "react";
import { CardsBookSkeleton } from "@/common/skeletons/CardSkeleton";
import NumericFieldComp from "@/common/NumericField";
import { addHours, format } from "date-fns";
import useAxiosAuth from "@/lib/hooks/useAxiosAuth";
import { useSession } from "next-auth/react";
import toast, { Toaster } from "react-hot-toast";
import axios, { AxiosError } from "axios";
import moment from "moment";

interface DefaultVal {
  dateBook: Date;
  startTime: Date | null | undefined;
  endTime: Date | null | undefined;
  capacity: number;
  ruangan: string;
  agenda: string;
  remark: string;
  hour: number | undefined;
  minute: number | undefined;
}

export default function BookFormSingle({ bookpar }: { bookpar: string[] }) {
  let idRoom, bookId;
  if (bookpar?.length == 2) {
    idRoom = bookpar[0];
    bookId = bookpar[1];
  } else if (bookpar !== undefined) {
    idRoom = bookpar[0];
  }
  const { data } = useSession();
  const axiosAuth = useAxiosAuth();
  const form = useForm({
    defaultValues: {
      dateBook: new Date(),
      startTime: null,
      endTime: null,
      capacity: 0,
      ruangan: "",
      agenda: "",
      remark: "",
      hour: 0,
      minute: 0,
    } as DefaultVal,
  });

  const handleSubmit = form.handleSubmit;
  const register = form.register;
  const setValue = form.setValue;
  const values = form.getValues();
  const formState = form.formState;

  const [roomId, setRoomid] = useState<string>("");
  const [endTime, setEndTime] = useState<Date | undefined>();
  const [startTime, setStartTime] = useState<Date | undefined>();
  const [hour, setHour] = useState<number>(0);
  const [minute, setMinute] = useState<number>(0);
  const [available, setAvailable] = useState(false);
  const [rooms, setRooms] = useState([]);

  const settings = {
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    variableWidth: true,
  };

  const selectRoom = (idRoom: string) => {
    setRoomid(idRoom);
    setValue("ruangan", idRoom);
    form.clearErrors("ruangan");
  };

  const onSubmit = async (values: DefaultVal) => {
    const payload = {
      id_ruangan: values.ruangan,
      id_user: data?.user.id_user,
      book_date: format(values.dateBook, "Y-L-d"),
      time_start: format(values.startTime as Date, "HH:mm"),
      time_end: format(values.endTime as Date, "HH:mm"),
      agenda: values.agenda,
      participant: values.capacity,
      remark: values.remark,
    };
    console.log(payload);
    try {
      const res = await axiosAuth.post("/book", { data: payload });
      toast.success(res.data.message);
    } catch (error) {
      const errors = error as AxiosError;
      if (axios.isAxiosError(error)) {
        const data = errors.response?.data as { message: string };
        toast.error(data.message);
      } else {
        toast.error("error");
      }
      console.error(error);
    }
  };

  const checkAvail = async (values: DefaultVal) => {
    form.setValue("hour", hour);
    form.setValue("minute", minute);
    const valid = await form.trigger([
      "dateBook",
      "startTime",
      "endTime",
      "capacity",
      "hour",
      "minute",
    ]);
    console.log(hour, minute);

    console.log(form.getValues());

    if (valid) {
      const payload = {
        book_date: format(values.dateBook, "Y-L-d"),
        time_start: format(values.startTime as Date, "HH:mm"),
        time_end: format(values.endTime as Date, "HH:mm"),
        participant: values.capacity,
      };
      console.log(payload);

      try {
        const res = await axiosAuth.post("/room/search-avail", { data: payload });
        if (res.data.data.length === 0) {
          toast.error("Ruangan tidak tersedia");
        } else {
          toast.success(res.data.message);
          setAvailable(true);
          const tempRooms = res.data.data;
          setRooms(tempRooms);
          console.log(tempRooms);
        }
      } catch (error) {
        const errors = error as AxiosError;
        if (axios.isAxiosError(error)) {
          const data = errors.response?.data as { message: string };
          toast.error(data.message);
        } else {
          toast.error("error");
        }
        console.error(error);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="flex flex-col container gap-4 pt-6 px-10">
        <DatePickerComp
          name="dateBook"
          label="Booking Date"
          control={form.control}
          rules={{
            required: "This field is required",
            validate: {
              minDate: (value: any) =>
                new Date(value).setHours(0, 0, 0, 0) >= new Date().setHours(0, 0, 0, 0) ||
                "Booking date can't be in the past",
            },
          }}
        />
        <div className="flex gap-1">
          <TimePickerComp
            name="startTime"
            label="Start Time"
            control={form.control}
            rules={{
              required: "This field is required",
              // validate: {
              //   minDate: (value: any) =>
              //     new Date(value) >= new Date() || "Start time can't be in the past",
              // },
            }}
            onChangeOvr={(value) => {
              const tempStartTime = value;
              const tempHour = moment(endTime).diff(moment(value), "hours");
              const tempMinute = moment(endTime).diff(moment(value), "minutes") % 60;

              setStartTime(tempStartTime);
              setHour(tempHour);
              setMinute(tempMinute);
            }}
          />
          <TimePickerComp
            name="endTime"
            label="End Time"
            control={form.control}
            rules={{
              required: "This field is required",
            }}
            onChangeOvr={(value) => {
              const tempEndTime = value;
              const tempHour = moment(value).diff(moment(startTime), "hours");
              const tempMinute = moment(value).diff(moment(startTime), "minutes") % 60;

              setEndTime(tempEndTime);
              setHour(tempHour);
              setMinute(tempMinute);
            }}
          />
          <input {...register("ruangan")} hidden={true} />
        </div>
        <div className="flex gap-1">
          <div className="flex gap-1">
            <TextField
              type="number"
              value={hour}
              label="Hour"
              variant="outlined"
              error={!!formState.errors.hour}
              helperText={formState.errors.hour ? formState.errors.hour.message : ""}
              {...register("hour", {
                min: {
                  value: 0,
                  message: "Duration error",
                },
              })}
            />
            <TextField
              type="number"
              value={minute}
              label="Minute"
              variant="outlined"
              error={!!formState.errors.minute}
              helperText={formState.errors.minute ? formState.errors.minute.message : ""}
              {...register("minute", {
                validate: {
                  minimum: (value: any) => {
                    if (form.getValues("hour") === 0) {
                      return value > 0 || "Duration error";
                    } else {
                      return value >= 0 || "Duration error";
                    }
                  },
                },
              })}
            />
          </div>
          <NumericFieldComp
            control={form.control}
            name="capacity"
            label="Capacity"
            type="number"
            min={0}
            max={100}
            rules={{
              required: "Insert capacity",
              min: { value: 1, message: "Minimum value 1" },
            }}
          />
          <input {...register("ruangan", { required: "Please input" })} hidden={true} />
        </div>
        {available ? (
          <>
            <p className="my-0">Room:</p>
            <Suspense fallback={<CardsBookSkeleton />}>
              <CardRooms
                selectedId={roomId}
                clickCard={selectRoom}
                errorData={!!formState.errors?.ruangan}
                filterId={rooms}
              />
            </Suspense>
            <TextFieldComp
              control={form.control}
              name="agenda"
              label="Agenda"
              rules={{
                required: "This field is required",
                maxLength: {
                  value: 50,
                  message: "Please input less than 50 character",
                },
              }}
            />
            <TextFieldComp
              multiline={true}
              rows={5}
              control={form.control}
              name="remark"
              label="Remark"
            />
            <Button type="submit" variant="contained">
              Submit
            </Button>
          </>
        ) : (
          <Button variant="outlined" onClick={() => checkAvail(form.getValues())}>
            Check Available Room
          </Button>
        )}
      </div>
      <Toaster />
    </form>
  );
}
