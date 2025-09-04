import { useState } from "react";
import { TextField, Button, Box } from "@mui/material";

export default function ShortenerForm({ onAddUrl }) {
  const [longUrl, setLongUrl] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!longUrl) return;

    const newUrl = {
      shortUrl: "https://short.ly/" + Math.random().toString(36).substring(2, 8),
      longUrl,
      createdAt: new Date().toLocaleString(),
      expiresAt: "7 days",
      clickCount: 0,
      clicks: []
    };

    onAddUrl(newUrl);
    setLongUrl("");
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        mb: 4,
        display: "flex",
        alignItems: "center",
        gap: 2
      }}
    >
      <TextField
        type="url"
        placeholder="Enter long URL"
        value={longUrl}
        onChange={e => setLongUrl(e.target.value)}
        variant="outlined"
        fullWidth
        InputProps={{
          sx: { background: "#222", color: "#fff" }
        }}
      />
      <Button
        type="submit"
        variant="contained"
        sx={{
          backgroundColor: "#e91e63",
          color: "#fff",
          fontWeight: "bold",
          padding: "10px 20px",
          borderRadius: "8px",
          opacity: 0.85,
          transition: "opacity 0.3s ease, transform 0.2s ease",
          "&:hover": {
            backgroundColor: "#ad1457",
            opacity: 1,
            transform: "scale(1.05)"
          }
        }}
      >
        Shorten URL
      </Button>
    </Box>
  );
}
