/* eslint-disable no-console */
import fs from "fs";
import path from "path";

function createJson() {
  const appendCallback = (err: NodeJS.ErrnoException | null) => {
    if (err) {
      console.log("node file err");
    }
  };
  fs.appendFile(path.join(process.cwd(), "db.json"), "{}", appendCallback);
}
let hasJson = false;
function checkJson() {
  if (hasJson) {
    return hasJson;
  }
  fs.readdir(process.cwd(), {}, (err, files) => {
    if (!err) {
      for (const file of files) {
        if (file === "db.json") {
          hasJson = true;
          break;
        }
      }
    }
  });
  return hasJson;
}

function fileInit() {
  if (!checkJson()) {
    createJson();
  }
}
export function writeValue(key: string, value: any) {
  try {
    fileInit();
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
    fileInit();

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
    fileInit();

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
