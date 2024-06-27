import { Typography } from "@mui/material";

export default function MiniBadge({ color, text }: { color: string; text: string }) {
  return (
    <Typography
      paragraph
      sx={{ fontSize: "0.5rem" }}
      className={`text-neutral-50 p-2 m-0 rounded-full ${color}`}
    >
      {text}
    </Typography>
  );
}
