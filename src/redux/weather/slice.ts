import {createSlice} from "@reduxjs/toolkit";
import {getWeatherByCity, getWeatherByLatLongitude} from "./actions";

export interface ICity {
    coord: {
        lon: number,
        lat: number
    },
    weather: { main: string, description: string }[],
    name: string,
    main: {
        temp: number,
        temp_min: number,
        temp_max: number,
        pressure: number,
        humidity: number
    },
    wind: {
        speed: number
    }
}

export interface weatherState {
    cities: string[],
    isLoad: boolean,
    city: ICity | null,
    isAppStarted: boolean,
    isSended: boolean
}

const initialState: weatherState = {
    city: null,
    isLoad: false,
    cities: [],
    isAppStarted: false,
    isSended: false
}
const slice = createSlice({
    name: "weather",
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder.addCase(getWeatherByCity.fulfilled, (state: weatherState, {payload}) => {
            if (state.isAppStarted) {
                state.cities.push(payload.name)
            } else if (!state.isAppStarted) {
                state.isAppStarted = true
            }
            state.city = payload
            state.isSended = true
            state.isLoad = false
        })
        builder.addCase(getWeatherByCity.rejected, state => {
            state.isLoad = false
        })
        builder.addCase(getWeatherByCity.pending, state => {
            state.isLoad = true
            state.isSended = false
        })
        builder.addCase(getWeatherByLatLongitude.pending, state => {
            state.isLoad = true
        })
        builder.addCase(getWeatherByLatLongitude.fulfilled, (state, {payload}) => {
            state.city = payload
            state.isLoad = false
        })
        builder.addCase(getWeatherByLatLongitude.rejected, state => {
            state.isLoad = false
        })
    }
})

export default slice.reducer