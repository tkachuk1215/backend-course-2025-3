#!/usr/bin/env node
const { Command } = require("commander");
const fs = require("fs");

const program = new Command();

program
  .requiredOption("-i, --input <path>", "input JSON file path")
  .option("-o, --output <path>", "output file path")
  .option("-d, --display", "display result in console")
  .option("-s, --survived", "show only passengers who survived")
  .option("-a, --age", "display passenger age");

program.parse(process.argv);
const options = program.opts();

// --- Перевірка обов'язкового параметра ---
if (!options.input) {
  console.error("Please, specify input file");
  process.exit(1);
}

// --- Перевірка існування файлу ---
if (!fs.existsSync(options.input)) {
  console.error("Cannot find input file");
  process.exit(1);
}

// --- Читання файлу рядок за рядком ---
const content = fs.readFileSync(options.input, "utf8");
const lines = content.split('\n').filter(line => line.trim() !== '');

let data = [];
for (const line of lines) {
  try {
    data.push(JSON.parse(line));
  } catch (err) {
    console.error("Error parsing line:", line);
    process.exit(1);
  }
}

// --- Фільтрація ---
if (options.survived) {
  data = data.filter(item => item.Survived === "1" || item.Survived === 1);
}

// --- Формування результату ---
const result = data.map(item => {
  let line = item.Name ?? "N/A";
  if (options.age) line += ` ${item.Age ?? "N/A"}`;
  line += ` ${item.Ticket ?? "N/A"}`;
  return line;
});

// --- Вивід / запис ---
if (options.display) console.log(result.join("\n"));
if (options.output) fs.writeFileSync(options.output, result.join("\n"));
