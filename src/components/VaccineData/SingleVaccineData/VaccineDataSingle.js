import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Badge from "@material-ui/core/Badge";

import HealingIcon from "@material-ui/icons/Healing";
import VerifiedUserRoundedIcon from "@material-ui/icons/VerifiedUserRounded";

import "./VaccineDataSingle.css";

const useStyles = makeStyles((theme) => ({
  paperMainDiv: {
    width: "100%",
    marginTop: 30,
    marginBottom: 60,
  },
}));

const VaccineDataSingle = (vaccine) => {
  const classes = useStyles();
  console.log(vaccine);
  console.log("helo");
  return (
    <div className={classes.paperMainDiv}>
      <Paper
        variant="outlined"
        className="wrapper"
        style={{ backgroundColor: "#333333" }}
      >
        <div className="paper-left">
          <div>
            <h1>
              {vaccine.name}{" "}
              <VerifiedUserRoundedIcon style={{ color: "#009E60" }} />
            </h1>
          </div>
          <hr />
          <br />
          <div className="paper-left_vaccine_head">
            <h3>Vaccine Name</h3>
            <p>{vaccine.vaccine}</p>
          </div>

          <div className="paper-left_content">
            <h3>Ward </h3>
            <p>
              {vaccine.block_name}, {vaccine.district_name},{" "}
              {vaccine.state_name}
            </p>
          </div>
          <div className="paper-left_content">
            <h3>Address </h3>
            <p>{vaccine.address}</p>
          </div>
          <div className="paper-left_content">
            <h3>pincode</h3>
            <p>{vaccine.pincode}</p>
          </div>
          <div className="paper-left_time">
            <div className="open-time time">Opening Time: {vaccine.from}</div>
            <div className="close-time time">Closing Time: {vaccine.to}</div>
          </div>
        </div>
        <div className="paper-right">
          <div className="paper-right_Badges">
            <div className="paper-right_capacity">
              <Badge
                color="secondary"
                badgeContent={vaccine.available_capacity}
              >
                <h5>Available Capacity</h5>{" "}
                <HealingIcon className="healing_icon" />
              </Badge>
            </div>
            <div>
              <p>
                <span>Date:</span>
                {vaccine.date}
              </p>
            </div>
          </div>
          <div className="paper-right_age">
            <div className="age_text">
              <h3>Minimum Age</h3>
            </div>
            <div className="age_content">
              <p>{vaccine.min_age_limit} years</p>
            </div>
          </div>
          <div className="paper-right_age">
            <div className="age_text">
              <h3>Fee-Type</h3>
            </div>
            <div className="age_content">
              <p>{vaccine.fee_type} </p>
            </div>
          </div>
          {vaccine.fee_type == "Paid" && (
            <div className="paper-right_age">
              <div className="age_text">
                <h3>Minimum Fare(₹)</h3>
              </div>
              <div className="age_content">
                <p>₹ {vaccine.fee} </p>
              </div>
            </div>
          )}

          <div className="paper-right_slots">
            <h3>Slots Available</h3>
            <p>{vaccine.slots.join(",")}</p>
          </div>
        </div>
      </Paper>
    </div>
  );
};

export default VaccineDataSingle;
