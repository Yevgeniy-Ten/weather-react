import {config} from "../config";
import {toaster} from "evergreen-ui";

export const kelvinToCelsius = (temp: number): number => {
    return Math.floor(temp - 273.15)
}
export const createLinkByCityName = (cityName: string): string => {
    return `http://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${config.apiKey}`
}
type notify = "notify" | "danger" | "success" | "closeAll" | "warning"
export const showToaster = (msg: string, notify: notify = "notify") => {
    toaster[notify](msg)
}
export const createLinkByLongitudeLatitude = (longitude: number, latitude: number): string => {
    longitude = Math.floor(longitude)
    latitude = Math.floor(latitude)
    return `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${config.apiKey}`
}