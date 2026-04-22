import morgan from "morgan";
import chalk from "chalk";

const coloredMorgan = morgan((tokens, req, res) => {
  const statusStr = tokens.status?.(req, res);
  const status = statusStr ? Number(statusStr) : 0;

  const method = tokens.method?.(req, res) || "UNKNOWN";
  const url = tokens.url?.(req, res) || "/";
  const responseTime = tokens["response-time"]?.(req, res) || "0";

  const statusColor =
    status >= 500
      ? chalk.red
      : status >= 400
        ? chalk.yellow
        : status >= 300
          ? chalk.cyan
          : chalk.green;

  return [
    chalk.gray(`[${new Date().toLocaleTimeString()}]`),
    chalk.bold.blue(method),
    chalk.white(url),
    statusColor(status),
    chalk.magenta(`${responseTime} ms`),
  ].join(" ");
});

export default coloredMorgan;
