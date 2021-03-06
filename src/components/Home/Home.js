import "date-fns";
import React, { useEffect, useState } from "react";
import {
  Grid,
  Typography,
  Container,
  MenuItem,
  FormControl,
  Select,
  Paper,
  TextField,
  Button,
} from "@material-ui/core";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import { makeStyles } from "@material-ui/core/styles";
import DateFnsUtils from "@date-io/date-fns";

import VaccineDataMain from "../VaccineData/VaccineDataMain";

import "./Home.css";

const useStyles = makeStyles((theme) => ({
  input: {
    color: "#bb86fc",
  },
  textfield: {
    color: "#bb86fc",
    height: "50px",
    width: "248px",
    padding: "0px 0px 0px 0px",
    margin: "-5px 0px 0px 0px",
  },
  paper: {
    height: 70,
    width: 250,
    backgroundColor: "#31333F",
    padding: "0px 10px 0px 10px",
  },
}));

const Home = () => {
  const [state, setState] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedDate2, setSelectedDate2] = useState(new Date());
  const [stateCode, setStateCode] = useState("States");
  const [district, setDistricts] = useState([]);
  const [districtCode, setDistrictCode] = useState("Districts");
  const [vaccineData, setVaccineData] = useState([]);
  const [formattedDate, setFormattedDate] = useState("");
  const [formattedDate2, setFormattedDate2] = useState("");

  const [pincode, setPincode] = useState(0);
  const classes = useStyles();

  const GetFormattedDate = () => {
    var month = selectedDate.getMonth() + 1;
    var day = selectedDate.getDate();
    var year = selectedDate.getFullYear();
    var finalDate = day + "-" + month + "-" + year;

    setFormattedDate(finalDate);
  };

  useEffect(() => {
    GetFormattedDate();
    // eslint-disable-next-line
  }, [selectedDate, formattedDate]);

  const GetFormattedDate2 = () => {
    var month = selectedDate.getMonth() + 1;
    var day = selectedDate.getDate();
    var year = selectedDate.getFullYear();
    var finalDate = day + "-" + month + "-" + year;

    setFormattedDate2(finalDate);
  };

  useEffect(() => {
    GetFormattedDate2();
    // eslint-disable-next-line
  }, [selectedDate2, formattedDate2]);

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };
  const handleDateChange2 = (date) => {
    setSelectedDate2(date);
  };

  useEffect(() => {
    fetch("https://cdn-api.co-vin.in/api/v2/admin/location/states")
      .then((res) => res.json())
      .then((data) => {
        setState(data.states);
      });
  }, [setState]);

  const onStateChange = async (e) => {
    const stateCode = e.target.value;
    const url =
      stateCode === "States"
        ? "https://cdn-api.co-vin.in/api/v2/admin/location/districts/9"
        : `https://cdn-api.co-vin.in/api/v2/admin/location/districts/${stateCode}`;
    await fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setStateCode(stateCode);
        setDistricts(data.districts);
      });
  };

  const onDistrictChange = async (e) => {
    setVaccineData([]);
    const districtCode = e.target.value;
    const url =
      stateCode === "Districts"
        ? null
        : `https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/findByDistrict?district_id=${districtCode}&date=${formattedDate}
        `;
    await fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setDistrictCode(districtCode);
        setVaccineData(data.sessions);
        console.log(data.sessions);
      });
  };
  const handelPincode = async (e) => {
    e.preventDefault();
    setVaccineData([]);
    console.log(selectedDate2);
    console.log(pincode);
    const url = `https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/findByPin?pincode=${pincode}&date=${formattedDate2}`;
    await fetch(url)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        // setDistrictCode(districtCode);
        setVaccineData(data.sessions);
        // console.log(data.sessions);
      });
  };

  return (
    <Container>
      <div className="home">
        <center>
          {" "}
          <h1>CoWIN Vaccination Slot Availability</h1>
        </center>

        <div className="home__info">
          <p>
            The CoWIN APIs are geo fenced, so sometimes you may not see an
            output! Please try after sometime
          </p>
        </div>

        <div className="home__option">
          <div className="home__optionRight">
            <div className="text">
              <Typography>Select State</Typography>
              <FormControl>
                <Select
                  variant="outlined"
                  value={stateCode}
                  onChange={onStateChange}
                >
                  <MenuItem value="States">States</MenuItem>
                  {state.map((state) => (
                    <MenuItem key={state?.state_id} value={state?.state_id}>
                      {state?.state_name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </div>
            <div className="text">
              <Typography>Select District</Typography>
              <FormControl>
                <Select
                  variant="outlined"
                  value={districtCode}
                  onChange={onDistrictChange}
                >
                  <MenuItem value="States" disabled={true}>
                    Select State First
                  </MenuItem>
                  {district.map((district) => (
                    <MenuItem
                      key={district?.district_id}
                      value={district?.district_id}
                    >
                      {district?.district_name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </div>
            <div style={{ padding: "10px" }}>
              <Grid item xs={12} className="date__picker">
                <Grid item>
                  <Paper className={classes.paper} elevation={3}>
                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                      <KeyboardDatePicker
                        margin="normal"
                        id="date-picker-dialog"
                        label="Date picker dialog"
                        format="dd-MM-yyyy"
                        value={selectedDate}
                        onChange={handleDateChange}
                        InputProps={{ className: classes.input }}
                        disablePast
                      />
                    </MuiPickersUtilsProvider>
                  </Paper>
                </Grid>
              </Grid>
            </div>
          </div>
        </div>
        <div>
          <center>
            <h2>OR</h2>
          </center>
          <div className="home__pincode">
            <center>
              {" "}
              <Grid item xs={12}>
                <form className="home__pincode__form">
                  <Grid item>
                    <Paper className={classes.paper} elevation={3}>
                      <TextField
                        id="outlined-number"
                        margin="normal"
                        label="Pin Code"
                        type="number"
                        variant="outlined"
                        value={pincode}
                        onChange={(e) => setPincode(e.target.value)}
                        InputProps={{
                          className: classes.textfield,
                        }}
                      />
                    </Paper>
                  </Grid>
                  <div style={{ padding: "10px" }}>
                    <Grid item xs={12} className="date__picker">
                      <Grid item>
                        <Paper className={classes.paper} elevation={3}>
                          <MuiPickersUtilsProvider utils={DateFnsUtils}>
                            <KeyboardDatePicker
                              margin="normal"
                              id="date-picker-dialog"
                              label="Date picker dialog"
                              format="dd-MM-yyyy"
                              value={selectedDate2}
                              onChange={handleDateChange2}
                              InputProps={{ className: classes.input }}
                              disablePast
                            />
                          </MuiPickersUtilsProvider>
                        </Paper>
                      </Grid>
                    </Grid>
                  </div>
                  <Button onClick={handelPincode}>Submit</Button>
                </form>
              </Grid>
            </center>
          </div>
        </div>
        <VaccineDataMain vaccineData={vaccineData} />
        <div
          style={{
            padding: "10px 10px 0px 10px",

            // marginTop: "25vh",
          }}
        >
          <div className="home__info">
            <center> &copy; Cowin Vaccination Tracker</center>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default Home;
