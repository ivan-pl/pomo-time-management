import React, { FC } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

const Timer: FC = () => {
  return (
    <Card
      sx={{ backgroundColor: "#c96d6d", width: "80%", alignSelf: "center" }}
    >
      <CardContent sx={{ textAlign: "center" }}>
        <Typography
          variant="h2"
          sx={{ fontSize: 24, color: "white" }}
          gutterBottom
        >
          Time to work
        </Typography>
        <Typography
          variant="h2"
          component="div"
          sx={{ fontSize: 100, color: "white" }}
        >
          13:04
        </Typography>
        <Button
          sx={{
            backgroundColor: "white",
            width: "35%",
            fontSize: "24px",
            ":hover": { color: "white", bgcolor: "#db6b63" },
          }}
        >
          Start
        </Button>
      </CardContent>
    </Card>
  );
};

export default Timer;
