import { Badge, Box, Button, Typography } from "@mui/material";
import { CheckBadgeIcon } from "@heroicons/react/24/outline";
import { createRef } from "react";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import PlaceIcon from "@mui/icons-material/Place";
import useSWR from "swr";
import Slider from "react-slick";
import { CardsBookSkeleton } from "@/common/skeletons/CardSkeleton";
import Image from "next/image";

interface RoomInfo {
  id: string;
  name: string;
  capacity: number;
  location: string;
  facility: Array<string>;
  image: string;
}

interface RoomData {
  id: string;
  id_ruangan: string;
  nama: string;
  kapasitas: string;
  lokasi: string;
  image: string;
  fasilitas: Array<string>;
}

interface CardProp {
  roomInfo: RoomInfo;
  selectedId: string;
  clickCard: (id: string) => void;
  error: boolean;
}

const settings = {
  speed: 500,
  slidesToShow: 2.1,
  slidesToScroll: 1,
  arrows: false,
  variableWidth: false,
  infinite: false,
};

export const CardRoom = ({ roomInfo, selectedId, clickCard, error }: CardProp) => {
  function onClickCard(id: string) {
    clickCard(id);
  }
  return (
    <Badge
      badgeContent={<CheckBadgeIcon className="h-8 w-8 p-0" />}
      color="primary"
      invisible={!(roomInfo.id === selectedId)}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      sx={{
        width: "100%",
        "& .MuiBadge-badge": {
          border: `4px solid #202020`,
          right: 10,
          top: 10,
          height: 40,
          width: 40,
        },
      }}
    >
      <Button
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "start",
          justifyContent: "start",
          width: "100%",
          p: 0,
          ...(roomInfo.id === selectedId && {
            borderWidth: "4px",
            borderStyle: "solid",
            borderColor: "primary.main",
          }),
          ...(error && {
            borderWidth: "4px",
            borderStyle: "solid",
            borderColor: "error.main",
          }),
        }}
        onClick={() => onClickCard(roomInfo.id)}
        variant="contained"
        color="warning"
      >
        <Image
          src={roomInfo.image}
          alt="Image"
          style={{
            width: "100%",
            height: "40%",
            objectFit: "cover",
            borderRadius: "0.75rem 0.75rem 0 0",
          }}
          width={100}
          height={50}
        />
        <Box sx={{ px: 16, py: 8, textAlign: "left" }}>
          <Typography variant="h3" sx={{ fontWeight: "bold", mb: 2 }}>
            {roomInfo.name}
          </Typography>
          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <PeopleAltIcon />
            <Typography>{roomInfo.capacity} people</Typography>
          </Box>
          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <PlaceIcon />
            <Typography>{roomInfo.location}</Typography>
          </Box>
          <Box sx={{ display: "flex", flexWrap: "wrap", gap: 4, pt: 6 }}>
            {roomInfo.facility.map((item, idx) => (
              <Box
                sx={{
                  backgroundColor: "grey.900",
                  color: "#fafafa",
                  px: 6,
                  py: 2,
                  borderRadius: 1,
                }}
                key={idx + item}
              >
                {item}
              </Box>
            ))}
          </Box>
        </Box>
      </Button>
    </Badge>
  );
};

export const CardRooms = ({
  selectedId,
  clickCard,
  filterId,
  errorData,
}: {
  selectedId: string;
  clickCard: (id: string) => void;
  filterId?: any;
  errorData: boolean;
}) => {
  const {
    data: rooms,
    error,
    isLoading,
  } = useSWR("/room/fas", { suspense: true, fallback: { "/room/fas": [] } });
  console.log(filterId);

  const roomData: Array<RoomInfo> = rooms?.data
    ?.sort((a: any, b: any) => a.kapasitas - b.kapasitas)
    .filter((item: RoomData) =>
      filterId ? filterId.some((fid: any) => fid.id_ruangan === item.id_ruangan) : true
    )
    .slice(0, 3)
    .map((item: RoomData) => {
      return {
        id: item.id_ruangan,
        name: item.nama,
        capacity: item.kapasitas,
        location: item.lokasi,
        facility: item.fasilitas,
        image: item.image,
      };
    });

  return (
    <>
      {!isLoading && (
        <Slider {...settings}>
          {roomData?.map((item) => (
            <Box key={item.id} sx={{ pt: 18, pb: 32, pr: 16 }}>
              <CardRoom
                roomInfo={item}
                selectedId={selectedId}
                clickCard={clickCard}
                error={errorData}
              />
            </Box>
          ))}
        </Slider>
      )}
      {isLoading && <CardsBookSkeleton />}
    </>
  );
};
