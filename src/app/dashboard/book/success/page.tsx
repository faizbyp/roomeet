import { CheckCircleIcon } from "@heroicons/react/24/outline";
import { Box, Button } from "@mui/material";
import Link from "next/link";

const SuccessPage = () => {
  return (
    <>
      <Box
        sx={{
          height: "80svh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <CheckCircleIcon className="size-36" />
        <Box sx={{ marginBottom: 4 }}>Success book meeting</Box>
        <Link href="/dashboard" passHref>
          <Button variant="contained">Back to dashboard</Button>
        </Link>
      </Box>
    </>
  );
};
export default SuccessPage;
