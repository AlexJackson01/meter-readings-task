import { useState } from "react";
import { generateMeterReadings } from "./helpers";
import { MeterReading } from "./types";
import "./styles.css";
import Sun from "./assets/sun.svg";
import Logo from "./assets/logo.png";

export default function App() {
  const [readings, setReadings] = useState<MeterReading[]>(
    generateMeterReadings()
  );
  const [customerInput, setCustomerInput] = useState<number>(0);
  const [estimatedUsage, setEstimatedUsage] = useState<number>(0);

  const handleChange = (e: any) => {
    setCustomerInput(Number(e.target.value));
  };

  const [showError, setShowError] = useState<boolean>(false);

  const handleSubmit = (e: any) => {
    e.preventDefault();

    // filter readings to find last customer reading
    const customerReadings = readings
      .filter((reading) => reading.source === "customer")
      .splice(0, 1);
    const lastCustomerReading: number = customerReadings[0].value;

    // validation - if input reading is 5 numbers long and higher than the last customer reading > add to readings and calculate estimated usage next month
    if (
      customerInput.toString().length === 5 &&
      customerInput > lastCustomerReading
    ) {
      setShowError(false);
      let temp = [...readings];
      temp.push({ value: customerInput, source: "customer" });
      temp.sort((a, b) => b.value - a.value);
      console.log(temp);
      setReadings(temp);

      // calculate usage with last 4 readings
      // average distance
      const lastReadings = [...temp].splice(0, 4);
      console.log(lastReadings);
      let a = lastReadings[0].value - lastReadings[1].value;
      let b = lastReadings[1].value - lastReadings[2].value;
      let c = lastReadings[2].value - lastReadings[3].value;

      let avgDistance = Math.round((a + b + c) / 3);

      setEstimatedUsage(lastReadings[0].value + avgDistance);

      // estimated value then added to meter readings at bottom
      temp.push({
        value: lastReadings[0].value + avgDistance,
        source: "estimated",
      });
      temp.sort((a, b) => b.value - a.value);
      setReadings(temp);
    } else {
      // else show error
      setShowError(true);
    }
  };

  const readingListItems = readings.map((reading) => (
    <div
      className="meter-grid"
      style={{
        backgroundColor: reading.source === "customer" ? "#ff4822" : "#5e0d98",
      }}
    >
      <div className="meter-value">{reading.value}</div>
      <div className="meter-source">{reading.source}</div>
    </div>
  ));

  return (
    <div className="App">
      <img src={Logo} alt="sun" className="logo" />

      <h1>Meter Readings</h1>

      <img src={Sun} alt="sun" className="sun-image" />

      <p className="subheading">Enter a new meter reading:</p>

      <form id="customer-input" onSubmit={(e) => handleSubmit(e)}>
        <input
          className={showError ? "error" : "input"}
          name="customerInput"
          placeholder="Meter reading"
          onChange={(e) => handleChange(e)}
        />
        <button type="submit">Submit</button>
      </form>

      {showError && <p className="error">This is an invalid meter reading.</p>}

      <h2>Estimated usage next month</h2>
      {estimatedUsage > 0 ? (
        <>
          <p>Your estimated usage next month is:</p>
          <p className="estimated-usage">{estimatedUsage}</p>
        </>
      ) : (
        <>
          <p>Please Enter Reading</p>
        </>
      )}

      <h2>Historical meter readings</h2>
      <ul className="meter-readings">{readingListItems}</ul>
    </div>
  );
}
