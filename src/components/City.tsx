import React from 'react';
import {ICity} from "../redux/weather/slice";
import {majorScale, Pane, Text, Heading} from "evergreen-ui";
import {kelvinToCelsius} from "../assets/assets"

const City: React.FC<{ city: ICity | null, isLoad: boolean }> = ({city}) => {
    return (
        <>
            {
                city !== null ?
                    <Pane width={280} minHeight={200} display={"flex"}
                          flexDirection={"column"}
                          justifyContent={"space-around"}
                          padding={majorScale(2)}
                          elevation={3}>
                        <Heading size={600}>Город : {city.name}</Heading>
                        <Text size={500}>Температура : {kelvinToCelsius(city.main.temp)}C</Text>
                        <Text size={500}>Варируется от
                            : {kelvinToCelsius(city.main.temp_min)}C до {kelvinToCelsius(city.main.temp_max)}C</Text>
                        <Text>
                            Скорость ветра {city.wind.speed}м.c
                        </Text>
                        <Text>
                            Влажность воздуха {city.main.humidity}%
                        </Text>
                    </Pane>
                    : <Text size={400}>Вы не выбрали города для поиска погоды:)</Text>
            }
        </>
    );
};

export default City;
