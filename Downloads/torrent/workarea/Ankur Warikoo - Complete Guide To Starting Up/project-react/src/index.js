import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { Provider } from "react-redux";
import * as serviceWorkerRegistration from "./serviceWorkerRegistration";
import { PersistGate } from "redux-persist/integration/react";
import { store, persistor } from "./store";

ReactDOM.render(
    <React.StrictMode>
        <PersistGate loading={null} persistor={persistor}>
            <Provider store={store}>
                <App />
            </Provider>
        </PersistGate>
    </React.StrictMode>,
    document.getElementById("root")
);
serviceWorkerRegistration.register();
