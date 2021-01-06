import {configureStore} from "@reduxjs/toolkit";
import weatherReducer from "../weather/slice"

export const store = configureStore({
    reducer: {
        weather: weatherReducer
    },
});

export type RootState = ReturnType<typeof store.getState>;
