// This is just to help the exercise.
// You do not need to edit this.
import { MeterReading } from "./types";

export function generateMeterReadings(): MeterReading[] {
  let readings: number[] = [];

  for (let i = 0; i < 5; ++i) {
    const reading = Math.floor(Math.random() * 88888) + 10000;
    readings.push(reading);
  }

  readings.sort();
  readings.reverse();

  return readings.map((reading, idx) => {
    const source = idx % 2 !== 0 ? "customer" : "estimated";
    return {
      value: reading,
      source
    };
  });
}
