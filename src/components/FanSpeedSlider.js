import * as React from "react";
import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";
import Typography from "@mui/material/Typography";
import CircularProgress from "@mui/material/CircularProgress";
import { initializeApp } from "firebase/app";
import { getDatabase, ref, set } from "firebase/database";
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBEEad_fHXV4EwnCVpI9Hz5woX94zx9N78",
  authDomain: "fan-speed-controller-f4265.firebaseapp.com",
  databaseURL: "https://fan-speed-controller-f4265-default-rtdb.firebaseio.com",
  projectId: "fan-speed-controller-f4265",
  storageBucket: "fan-speed-controller-f4265.appspot.com",
  messagingSenderId: "644139789903",
  appId: "1:644139789903:web:a4cb0dbe30d00c3344c43a",
};

// Initialize Firebase
const firebase = initializeApp(firebaseConfig);
const database = getDatabase(firebase);

function writeFanSpeed(fanSpeed) {
  return set(ref(database, "/"), {
    fanSpeed: fanSpeed,
  });
}

const speeds = [
  {
    value: 0,
    label: "OFF",
    bgColor: "#D2222D",
  },
  {
    value: 1,
    label: "1",
    bgColor: "#ECA035",
  },
  {
    value: 2,
    label: "2",
    bgColor: "#FFBF00",
  },
  {
    value: 3,
    label: "3",
    bgColor: "#97E47E",
  },
  {
    value: 4,
    label: "FULL",
    bgColor: "#007000",
  },
];

function valuetext(value) {
  return `${speeds[value].label}`;
}

export default function FanSpeedSlider({ handleChangeBgColor }) {
  const [value, setValue] = React.useState(4);
  const [loading, setLoading] = React.useState(false);

  React.useEffect(() => {
    handleChangeBgColor(speeds[value].bgColor);
  }, []);

  const handleSliderChange = (event, newValue) => {
    setValue(newValue);
    console.log(newValue);
    handleChangeBgColor(speeds[newValue].bgColor);
    setLoading(true);
    writeFanSpeed(newValue)
      .then((data) => {
        console.log(data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  };

  return loading ? (
    <CircularProgress />
  ) : (
    <Box sx={{ width: 300 }}>
      <Typography sx={{ fontWeight: "bold", textAlign:"center" }} gutterBottom>
        Fan Speed
      </Typography>
      <Slider
        aria-label="Fan Speed"
        value={typeof value === "number" ? value : 4}
        onChange={handleSliderChange}
        getAriaValueText={valuetext}
        step={1}
        valueLabelDisplay="auto"
        marks={speeds}
        min={0}
        max={4}
      />
    </Box>
  );
}
