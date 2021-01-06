import {createAsyncThunk} from "@reduxjs/toolkit";
import {createLinkByCityName, createLinkByLongitudeLatitude} from "../../assets/assets";
import axios from "axios"
import {ICity} from "./slice";
import {showToaster} from "../../assets/assets";

export const getWeatherByCity = createAsyncThunk("getWeatherByCity",
    async (cityName: string = "Almaty", thunkAPI) => {
        try {
            const link = createLinkByCityName(cityName)
            const response = await axios.get(link)
            return response.data as ICity
        } catch (e) {
            switch (e.response.status) {
                case 404:
                    showToaster("Выбранный вами город не был найден проверьте корректность запроса:)")
                    break
                case 400:
                    showToaster("Проверьте введённые вами данные:)")
                    break
            }
            return thunkAPI.rejectWithValue(e.message)
        }
    })
type coords = {
    longitude: number,
    latitude: number
}
export const getWeatherByLatLongitude = createAsyncThunk("getWeatherByLitLad", async (payload: coords, thunkAPI) => {
    try {
        const {longitude, latitude} = payload
        const link = createLinkByLongitudeLatitude(longitude, latitude)
        const response = await axios.get(link)
        return response.data as ICity
    } catch (e) {
        thunkAPI.dispatch(getWeatherByCity("almaty"))
        return thunkAPI.rejectWithValue(e.message)
    }
})
export const weatherAppInitilization = createAsyncThunk("getWeatherByLatLog",
    async (_, thunkAPI) => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((position) => {
                thunkAPI.dispatch(getWeatherByLatLongitude({
                    longitude: position.coords.longitude,
                    latitude: position.coords.latitude
                }))
            }, (error) => {
                if (error.code === 1) {
                    thunkAPI.dispatch(getWeatherByCity("almaty"))
                } else if (error.code === 3) {
                    thunkAPI.dispatch(getWeatherByCity("almaty"))
                }
            })
        } else {
            thunkAPI.dispatch(getWeatherByCity("almaty"))
        }
    })