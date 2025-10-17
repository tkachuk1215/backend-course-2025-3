const { Command } = require("commander");
const program = new Command();

program
  .requiredOption("-i, --input <path>", "input JSON file path")
  .option("-o, --output <path>", "output file path")
  .option("-d, --display", "display result in console");

program.parse(process.argv);

const options = program.opts();

console.log("Аргументи командного рядка:", options);
