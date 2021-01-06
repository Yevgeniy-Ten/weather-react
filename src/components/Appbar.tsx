import React, {useState, useEffect} from "react";
import {Pane, Heading, majorScale, TextInput, Button} from "evergreen-ui";

const Appbar: React.FC<{ onSearch(city: string): void, isLoad: boolean, isSended: boolean }> =
    ({onSearch, isLoad, isSended}) => {
    const [cityValue, setCityValue] = useState<string>("")
    const onClickHandler = () => {
        onSearch(cityValue)
    }
    const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        setCityValue(e.target.value)
    }
    useEffect(() => {
        if (isSended) {
            setCityValue("")
        }
    }, [isSended])
    return (
        <Pane display={"flex"}
              flexWrap={"wrap"}
              alignItems={"center"}
              paddingX={majorScale(4)}
              height={majorScale(10)}
              justifyContent={"space-between"}
              background={"tint2"}>
            <Pane>
                <Heading size={700}>Погода</Heading>
            </Pane>
            <Pane display="flex">
                <TextInput height={48}
                           onChange={onChangeHandler}
                           value={cityValue} placeholder="Введите имя города"/>
                <Button height={48}
                        disabled={isLoad}
                        onClick={onClickHandler}
                        appearance="primary"
                        marginLeft={16}>Узнать погоду</Button>
            </Pane>
        </Pane>
    );
};

export default Appbar;
