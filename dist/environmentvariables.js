"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getEnvironmentVariable = getEnvironmentVariable;
const tslog_1 = require("tslog");
const log = new tslog_1.Logger({ minLevel: 3 });
function getEnvironmentVariable(key) {
    if (process.env[key] == undefined) {
        log.warn("No environment variable found for key=[" + key + "]");
        return undefined;
    }
    else if (process.env[key] == "") {
        log.warn("Empty environment variable found for key=[" + key + "]");
        return undefined;
    }
    else {
        const value = process.env[key];
        log.debug("Environment Variable key[" + key + "] has value=[" + value + "]");
        return value;
    }
}
