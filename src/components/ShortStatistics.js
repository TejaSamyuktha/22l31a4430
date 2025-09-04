import React from "react";
import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Box,
  Link
} from "@mui/material";

export default function ShortStatistics({ shortUrls, setShortUrls }) {
  const handleClick = (idx, longUrl) => {
    const now = new Date().toLocaleString();
    const updatedUrls = shortUrls.map((row, i) => {
      if (i === idx) {
        return {
          ...row,
          clickCount: row.clickCount + 1,
          clicks: [
            ...row.clicks,
            {
              timestamp: now,
              source: navigator.userAgent,
              location: "Unknown"
            }
          ]
        };
      }
      return row;
    });

    setShortUrls(updatedUrls);
    localStorage.setItem("shortUrls", JSON.stringify(updatedUrls));
    window.open(longUrl, "_blank", "noopener,noreferrer");
  };

  return (
    <Box sx={{ mt: 4 }}>
      <Table sx={{ background: "#222", color: "#fff", borderRadius: 2 }}>
        <TableHead>
          <TableRow>
            <TableCell sx={{ color: "#e91e63" }}>Short URL</TableCell>
            <TableCell sx={{ color: "#fff" }}>Created</TableCell>
            <TableCell sx={{ color: "#fff" }}>Expires</TableCell>
            <TableCell sx={{ color: "#fff" }}>Clicks</TableCell>
            <TableCell sx={{ color: "#fff" }}>Click Details</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {shortUrls.map((row, idx) => (
            <TableRow key={idx}>
              <TableCell>
                <Link
                  href="#"
                  underline="hover"
                  onClick={e => {
                    e.preventDefault();
                    handleClick(idx, row.longUrl);
                  }}
                  sx={{ color: "#e91e63" }}
                >
                  {row.shortUrl}
                </Link>
              </TableCell>
              <TableCell sx={{ color: "#fff" }}>{row.createdAt}</TableCell>
              <TableCell sx={{ color: "#fff" }}>{row.expiresAt}</TableCell>
              <TableCell sx={{ color: "#fff" }}>{row.clickCount}</TableCell>
              <TableCell sx={{ color: "#fff" }}>
                {row.clicks.map((c, i) => (
                  <div key={i}>
                    Time: {c.timestamp}, Source: {c.source}, Location: {c.location || "Unknown"}
                  </div>
                ))}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Box>
  );
}