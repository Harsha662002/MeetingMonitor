import React from "react";
import { Bar } from "react-chartjs-2";
import "chart.js/auto";
import styles from "./Date.module.scss";
import { useState } from "react";
import { TextField } from "@mui/material";
import data from "../data/data.json";
const Date = () => {
  const [tfValue, setTFValue] = useState("2021-05-19");
  const [timeDate, updatedTimeDate] = useState("");
  //console.log(tfValue);

  //DATE SECTION
  const filterDataBySelectedDate = (date: string) => {
    return data.date.filter(
      (schedule) => schedule.schedule_time.substring(0, 10) === date
    );
  };

  const dataForSelectedDate = filterDataBySelectedDate(tfValue);
  console.log(dataForSelectedDate);
  const selectedDateLength = dataForSelectedDate.length;

  const currentDate = new window.Date(tfValue);

  const ppprevDate = new window.Date(
    currentDate.getTime() - 3 * 24 * 60 * 60 * 1000
  );
  const ppprevDateStr = ppprevDate.toISOString().substring(0, 10);
  const dataForppprevDate = filterDataBySelectedDate(ppprevDateStr);
  const ppprevDateStrLength = dataForppprevDate.length;

  const pprevDate = new window.Date(
    currentDate.getTime() - 2 * 24 * 60 * 60 * 1000
  );
  const pprevDateStr = pprevDate.toISOString().substring(0, 10);
  const dataForpprevDate = filterDataBySelectedDate(pprevDateStr);
  const pprevDateStrLength = dataForpprevDate.length;

  const prevDate = new window.Date(currentDate.getTime() - 24 * 60 * 60 * 1000);
  const prevDateStr = prevDate.toISOString().substring(0, 10);
  const dataForprevDate = filterDataBySelectedDate(prevDateStr);
  const prevDateStrLength = dataForprevDate.length;

  // TIME SECTION
  const barGraphHandler = () => {
    updatedTimeDate(tfValue);
  };

  const barGraphTime = filterDataBySelectedDate(timeDate);

  const updatedTime = {
    date: barGraphTime.map((item) => {
      return {
        schedule_time: item.schedule_time.substring(11, 16),
        slot: item.slot,
        item_date: item.item_date,
      };
    }),
  };
  //console.log("Hi", updatedTime);

  let a = 0,
    b = 0,
    c = 0,
    d = 0;

  const times0to12 = updatedTime.date.filter((time) => {
    const hour = parseInt(time.schedule_time.split(":")[0]);
    if (hour >= 0 && hour < 12) {
      a++;
    }
    return a;
  });

  const times12to15 = updatedTime.date.filter((time) => {
    const hour = parseInt(time.schedule_time.split(":")[0]);
    if (hour >= 12 && hour < 15) {
      b++;
    }
    return b;
  });

  const times15to18 = updatedTime.date.filter((time) => {
    const hour = parseInt(time.schedule_time.split(":")[0]);
    if (hour >= 15 && hour < 18) {
      c++;
    }
    return c;
  });

  const times18to24 = updatedTime.date.filter((time) => {
    const hour = parseInt(time.schedule_time.split(":")[0]);
    if (hour >= 18 && hour < 24) {
      d++;
    }
    return d;
  });
  console.log(a, b, c, d);

  // timeCount();

  return (
    <div>
      <h3 className={styles.dateHeading}>Enter the Delivery Date</h3>
      <TextField
        className={styles.dateTextField}
        onChange={(newValue) => setTFValue(newValue.target.value)}
        id="date"
        label=""
        type="date"
        InputLabelProps={{
          shrink: true,
        }}
        value={tfValue}
      ></TextField>
      <div className={styles.barChart1}>
        <div className={styles.barChart11}>
          <Bar
            onClick={barGraphHandler}
            data={{
              // Name of the variables on x-axies for each bar
              labels: [ppprevDateStr, pprevDateStr, prevDateStr, tfValue],
              datasets: [
                {
                  // Label for bars
                  label: "Number of Scheduling done by Customer",
                  // Data or value of your each variable
                  data: [
                    ppprevDateStrLength,
                    pprevDateStrLength,
                    prevDateStrLength,
                    selectedDateLength,
                  ],
                  // Color of each bar
                  backgroundColor: ["aqua", "green", "red", "orange"],
                  // Border color of each bar
                  borderColor: ["aqua", "green", "red", "orange"],
                  borderWidth: 0.5,
                },
              ],
            }}
            // Height of graph
            height={200}
          />
        </div>
      </div>
      <h3>
        Click on the above bargraph to view the each hour breakdown of {tfValue}
      </h3>
      <div className={styles.barChart1}>
        <div className={styles.barChart11}>
          <Bar
            data={{
              // Name of the variables on x-axies for each bar
              labels: [
                "0am to 12noon",
                "12noon to 15:00",
                "15:00 to 18:00",
                "18:00 to 24:00",
              ],
              datasets: [
                {
                  // Label for bars
                  label: `Hour Wise Breakdown of Scheduling of ${tfValue}`,
                  // Data or value of your each variable
                  data: [a, b, c, d],
                  // Color of each bar
                  backgroundColor: ["aqua", "green", "red", "orange"],
                  // Border color of each bar
                  borderColor: ["aqua", "green", "red", "orange"],
                  borderWidth: 0.5,
                },
              ],
            }}
            // Height of graph
            height={200}
          />
        </div>
      </div>
    </div>
  );
};

export default Date;
