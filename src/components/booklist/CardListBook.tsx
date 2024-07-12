"use client";

import { IconButton } from "@mui/material";
import { PencilSquareIcon, XCircleIcon } from "@heroicons/react/24/outline";
import clsx from "clsx";
import { useSession } from "next-auth/react";
import useSWR from "swr";
import { CardsListBookSkeleton } from "@/common/skeletons/CardSkeleton";
import Link from "next/link";
import { axiosAuth } from "@/lib/axios";
import axios, { AxiosError } from "axios";
import toast from "react-hot-toast";

interface CardListBookProp {
  agendaTitle: string;
  room: string;
  startTime: string;
  endTime: string;
  bookDate: string;
  status: string;
  id_book: string;
  id_room: string;
  mutate: any;
}

interface AgendaDatas {
  id_book: string;
  id_user: string;
  id_room: string;
  nama_ruangan: string;
  agenda: string;
  is_active: string;
  time_start: string;
  time_end: string;
  book_date: string;
  status: string;
}

export function CardListBook({
  agendaTitle,
  startTime,
  endTime,
  bookDate,
  status,
  room,
  id_book,
  id_room,
  mutate,
}: CardListBookProp) {
  const handleDelete = async (id_book: string) => {
    try {
      await axiosAuth.delete(`/book/${id_book}`);
      mutate();
      toast.success(`Success canceling ${id_book}`);
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

  return (
    <>
      <div className="h-36 rounded-xl bg-neutral-500 px-4 py-4 mx-6 my-2 flex">
        <div className="flex flex-col grow justify-center">
          <div className="w-full grow flex items-center">
            <p className="my-0 text-ellipsis">{agendaTitle}</p>
          </div>
          <div className="my-2">
            <div className="text-xs">
              <div className="flex">
                <p className="my-0">
                  {startTime} - {endTime}
                </p>
                <p className="my-0 mx-3">|</p>
                <p className="my-0">{bookDate}</p>
              </div>

              <p className="my-0">{room}</p>
            </div>
          </div>
        </div>
        <div className="flex flex-col justify-between">
          <div
            className={clsx(
              "px-3 py-1 mb-2 mt-2 rounded-full flex items-center",
              status === "Oncoming" && "bg-green-600",
              status === "Prospective" && "bg-yellow-600",
              status === "Ongoing" && "bg-neutral-800",
              status === "Inactive" && "bg-red-800"
            )}
          >
            <p className="my-0 text-[10pt]">{status}</p>
          </div>
          <div className="flex gap-1 justify-center items-center grow">
            {(status === "Prospective" || status === "Oncoming" || status === "Pending") && (
              <>
                <Link href={`/dashboard/book/${id_room}/${id_book}`}>
                  <IconButton className="btn-primary h-10 w-10">
                    <PencilSquareIcon />
                  </IconButton>
                </Link>
                <IconButton className="btn-primary h-10 w-10" onClick={() => handleDelete(id_book)}>
                  <XCircleIcon />
                </IconButton>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export function CardsListBook({ date }: any) {
  const { data } = useSession();
  const url = `/book/show?id_user=${data?.user?.id_user}&book_date=${date}`;
  const {
    data: agendas,
    error,
    isLoading,
    mutate,
    isValidating,
  } = useSWR(data && url, {
    suspense: true,
    fallback: {
      [url]: [],
    },
  });
  const agendasData: Array<CardListBookProp> = agendas
    ? agendas?.data?.map((item: AgendaDatas) => ({
        agendaTitle: item.agenda,
        room: item.nama_ruangan,
        startTime: item.time_start,
        endTime: item.time_end,
        bookDate: item.book_date,
        status: item.status,
        id_book: item.id_book,
        id_room: item.id_room,
      }))
    : [];
  console.log(agendas);
  console.log(isValidating);
  console.log("TANGGAL", date);

  return (
    <>
      {!isLoading &&
        agendasData &&
        agendasData.map((item) => (
          <CardListBook {...item} mutate={mutate} key={item.id_book + item.id_room} />
        ))}
      {isLoading && !agendasData && <CardsListBookSkeleton />}
    </>
  );
}
