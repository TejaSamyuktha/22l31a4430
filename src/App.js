import { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import ShortenerForm from "./components/ShortenerForm";
import ShortStatistics from "./components/ShortStatistics";

export default function App() {
  const [shortUrls, setShortUrls] = useState([]);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("shortUrls") || "[]");
    setShortUrls(stored);
  }, []);

  const updateShortUrls = (newList) => {
    setShortUrls(newList);
    localStorage.setItem("shortUrls", JSON.stringify(newList));
  };

  const handleAddUrl = (urlData) => {
    updateShortUrls([...shortUrls, urlData]);
  };

  return (
    <Box
      minHeight="100vh"
      sx={{
        background: "#111",
        color: "#fff",
        padding: 4,
      }}
    >
      <Typography variant="h3" fontWeight="bold" mb={4}>
        React URL Shortener
      </Typography>
      <ShortenerForm onAddUrl={handleAddUrl} />
      <ShortStatistics shortUrls={shortUrls} setShortUrls={updateShortUrls} />
    </Box>
  );
}