import { PUBLIC_ENV } from "$env/static/public"

interface logInter {
    message: string,
    level: number,
    timestamp?: boolean | undefined,
    apiRoute?: string | undefined
}

/**
 * @description A logger wrapper for prettier logs.
 * 
 * @param logInfo
 * @param {string} logInfo.message The message to be logged to the console.
 * @param {number} logInfo.level The level of the log. If the level provided is 0, the logs won't be displayed when process.ENV.PUBLIC_ENV isn't "dev". (0 - DEBUG, 1 - INFO, 2 - WARN, 3 - ERROR, 4 - CRITICAL ERROR)
 * @param {boolean} logInfo.timestamp Whether or not to include a timestamp in the log (default - true).
 * @param {string} logInfo.apiRoute The api route of the log.
 */
function log({ message: message, level: level, timestamp: timestamp, apiRoute: apiRoute }: logInter) {
    // ['Sun Feb 11 2024 18:01:01 GMT+0100'] [/api/start_game] [INFO]: message
    let str = ""
    const infoLevels = ["DEBUG", "INFO", 'WARN', "ERROR", "CRITICAL ERROR"]

    if (PUBLIC_ENV != "dev" && level == 0) return
    str += `[${infoLevels[level]}]`
    if (timestamp == undefined) {
        str += ` [${new Date().toString().split(" (")[0]}]`
    } else if (timestamp) {
        str += ` [${new Date().toString().split(" (")[0]}]`
    }

    if (apiRoute !== undefined) {
        str += ` [${apiRoute}]`
    }

    str += `: ${message}`

    console.log(str)

    if (level == 4) process.exit(1)
}
export { log }
