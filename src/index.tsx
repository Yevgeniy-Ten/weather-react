import React from 'react';
import ReactDOM from 'react-dom';
import {ThemeProvider, defaultTheme} from "evergreen-ui"
import {Provider} from 'react-redux';
import { store } from './redux/store/store';
import App from './containers/App';
import "./index.css"
ReactDOM.render(
    <React.StrictMode>
        <Provider store={store}>
            <ThemeProvider value={defaultTheme}>
                <App/>
            </ThemeProvider>
        </Provider>
    </React.StrictMode>,
    document.getElementById('root')
);
