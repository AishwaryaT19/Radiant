/* eslint-disable no-console */
import fs from "fs";
import path from "path";

export function writeValue(key: string, value: any) {
  try {
    const rawData = fs.readFileSync(path.join(process.cwd(), "db.json"));
    const obj = JSON.parse(Buffer.from(rawData).toString());
    obj[key] = value;
    fs.writeFileSync(path.join(process.cwd(), "db.json"), JSON.stringify(obj));
  } catch {
    console.log("file System Error");
  }
}

export function readValue(key: string) {
  try {
    const rawData = fs.readFileSync(path.join(process.cwd(), "db.json"));
    const obj = JSON.parse(Buffer.from(rawData).toString());
    return obj[key];
  } catch {
    console.log("file System Error");
    return undefined;
  }
}

export function deleteValue(key: string) {
  try {
    if (readValue(key)) {
      const rawData = fs.readFileSync(path.join(process.cwd(), "db.json"));
      const obj = JSON.parse(Buffer.from(rawData).toString());
      delete obj[key];
      fs.writeFileSync(path.join(process.cwd(), "db.json"), JSON.stringify(obj));
    }
  } catch {
    console.log("file System Error");
  }
}
