import { CheckCircleIcon } from "@heroicons/react/24/outline";
import { Box, Button } from "@mui/material";
import Link from "next/link";

const SuccessPage = ({ params }: { params: { id_book: string } }) => {
  return (
    <>
      <Box
        sx={{
          height: "80svh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          textAlign: "center",
        }}
      >
        <CheckCircleIcon className="size-36" />
        <Box sx={{ marginBottom: 4 }}>
          <h1>Success!</h1>
          <p>
            ID Ticket:
            <br />
            {params.id_book}
          </p>
        </Box>
        <Link href="/dashboard" passHref>
          <Button variant="contained">Back to dashboard</Button>
        </Link>
      </Box>
    </>
  );
};
export default SuccessPage;
