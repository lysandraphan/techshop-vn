// mui
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";

interface LoadingFallbackProps {
  message?: string;
}

export default function LoadingFallback({ message }: LoadingFallbackProps) {
  const renderSpinner = () => (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        p: 5,
      }}
    >
      <CircularProgress />
    </Box>
  );

  const renderFallBack = () => (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: "auto",
        p: 5,
      }}
    >
      {message ? message : "Something went wrong."}
    </Box>
  );

  return message ? renderFallBack() : renderSpinner();
}
