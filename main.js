#!/usr/bin/env node
const { Command } = require("commander");
const fs = require("fs");

const program = new Command();

// --- визначаємо спільні параметри командного рядка ---
program
  .requiredOption("-i, --input <path>", "input JSON file path") // обов'язковий
  .option("-o, --output <path>", "output file path")            // необов'язковий
  .option("-d, --display", "display result in console");        // необов'язковий

program.parse(process.argv);
const options = program.opts();

// --- перевірка обов'язкового параметра ---
if (!options.input) {
  console.error("Please, specify input file");
  process.exit(1);
}

// --- перевірка існування файлу ---
if (!fs.existsSync(options.input)) {
  console.error("Cannot find input file");
  process.exit(1);
}

// --- читання JSON файлу ---
let data;
try {
  const content = fs.readFileSync(options.input, "utf8");
  data = JSON.parse(content);
} catch (err) {
  console.error("Error reading or parsing file:", err.message);
  process.exit(1);
}

// --- формування результату ---
// для Частини 1 просто виводимо всі записи як JSON-рядки
const result = data.map(item => JSON.stringify(item));

// --- вивід або запис у файл ---
if (options.display) console.log(result.join("\n"));
if (options.output) fs.writeFileSync(options.output, result.join("\n"));

// --- якщо не вказано ні -d, ні -o --- нічого не виводимо
