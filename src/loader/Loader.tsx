import { Box, Typography, CircularProgress } from "@mui/material";

const Loader = () => {
  return (
    <Box
      sx={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        gap: 2,
        background: "linear-gradient(135deg, #1e1e2f, #3a3a5f)",
        color: "#fff",
      }}>
      <CircularProgress size={60} thickness={4} />

      <Typography
        variant="h5"
        sx={{
          fontWeight: "bold",
          letterSpacing: "1px",
          textAlign: "center",
        }}>
        Welcome in your choice world 🌍
      </Typography>
    </Box>
  );
};

export default Loader;
