import React, {useEffect} from 'react';
import {shallowEqual, useDispatch, useSelector} from "react-redux";
import {getWeatherByCity, weatherAppInitilization} from "../redux/weather/actions";
import {getWeatherState} from "../redux/weather/getters";
import {majorScale, Pane, Spinner, Text} from "evergreen-ui";
import Appbar from "../components/Appbar";
import Cities from "../components/Cities";
import City from '../components/City';

function App() {
    const dispatch = useDispatch()
    const {isLoad, city, cities, isSended} = useSelector(getWeatherState, shallowEqual)
    const onSearch = (city: string) => {
        dispatch(getWeatherByCity(city))
    }
    useEffect(() => {
        dispatch(weatherAppInitilization())
    }, [dispatch])
    return (
        <>
            <Appbar onSearch={onSearch} isSended={isSended} isLoad={isLoad}/>
            <Pane maxWidth={1140} display={"flex"} flexWrap={"wrap"} marginX={"auto"}>
                <Pane flex={1}
                      padding={majorScale(3)}
                      display={"flex"}
                      justifyContent={"center"}
                      alignItems={"center"}>
                    {
                        isLoad ? <Spinner size={48}/> :
                            <City city={city} isLoad={isLoad}/>
                    }
                </Pane>
                <Pane flex={1} minWidth={280} padding={majorScale(3)}>
                    {
                        cities.length ? <Cities onSearch={onSearch} cities={cities}/> :
                            <Text size={500}>История поиска погоды пока пуста.</Text>
                    }
                </Pane>
            </Pane>
        </>
    );
}

export default App;
