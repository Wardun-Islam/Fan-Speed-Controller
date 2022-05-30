import * as React from "react";
import FanSpeedSlider from "./components/FanSpeedSlider";
import Box from "@mui/material/Box";

function App() {
  const [bgColor, setBgColor] = React.useState("#007000");

  const handleChangeBgColor = (color) => {
    console.log("color");
    console.log(color);
    setBgColor(color);
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        backgroundColor: bgColor,
      }}
    >
      <FanSpeedSlider
        handleChangeBgColor={(color) => handleChangeBgColor(color)}
      />
    </Box>
  );
}

export default App;
