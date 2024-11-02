import { Logger, ILogObj } from "tslog";

const log: Logger<ILogObj> = new Logger({ minLevel: 3 });

export function getEnvironmentVariable(key: string): string | undefined {
  if (process.env[key] == undefined) {
    log.warn("No environment variable found for key=[" + key + "]");
    return undefined;
  } else if (process.env[key] == "") {
    log.warn("Empty environment variable found for key=[" + key + "]");
    return undefined;
  } else {
    const value = process.env[key];
    log.debug(
      "Environment Variable key[" + key + "] has value=[" + value + "]"
    );
    return value;
  }
}

export function getEnvironmentVariableThrowingException(key: string): string  {
  if (process.env[key] == undefined) {
    log.warn("No environment variable found for key=[" + key + "]");
    throw new Error("No environment variable found for key=[" + key + "]");
  } else if (process.env[key] == "") {
    log.warn("Empty environment variable found for key=[" + key + "]");
    throw new Error("Empty environment variable found for key=[" + key + "]");
  } else {
    const value = process.env[key];
    log.debug(
      "Environment Variable key[" + key + "] has value=[" + value + "]"
    );
    return value;
  }
}

export function getEnvironmentVariableThrowingExceptionForNextJs(key: string): string  {
  const nextphase = process.env["NEXT_PHASE"]

  if (nextphase == "phase-production-build") {
    const value = process.env[key];
    log.debug("Environment Variable key[" + key + "] has value=[" + value + "] in Next_Phase=[" + nextphase + "]");
    return value == undefined ?  "" : value;    
  } else if (process.env[key] == undefined) {
    log.warn("No environment variable found for key=[" + key + "]")
    throw new Error("No environment variable found for key=[" + key + "]");
  } else if (process.env[key] == "") {
    log.warn("Empty environment variable found for key=[" + key + "]");
    throw new Error("Empty environment variable found for key=[" + key + "]");
  } else {
    const value = process.env[key];
    log.debug(
      "Environment Variable key[" + key + "] has value=[" + value + "]"
    );
    return value;
  }
}