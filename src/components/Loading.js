import { Backdrop, CircularProgress } from "@mui/material";

export default function Loading({ isLoading, handleStop }) {
  return (
    <Backdrop
      sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
      open={isLoading}
      onClick={handleStop}
    >
      <CircularProgress color="inherit" />
    </Backdrop>
  );
}
