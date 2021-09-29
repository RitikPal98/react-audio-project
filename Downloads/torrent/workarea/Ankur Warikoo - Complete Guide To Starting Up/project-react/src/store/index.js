import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import playerReducer from "../store/slices/playerSlice";
import downloadReducer from "./slices/downloadSlice";
import { persistStore, persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { combineReducers } from "redux";

const rootPersistConfig = {
    key: "root",
    storage: storage,
    blacklist: ["player", "download"],
};

const playerPersistConfig = {
    key: "player",
    storage: storage,
    whitelist: ["recentlyPlayed", "topChart"],
};

const downalodPersistConfig = {
    key: "download",
    storage: storage,
    whitelist: ["offlineMode"],
};

const rootReducer = combineReducers({
    player: persistReducer(playerPersistConfig, playerReducer),
    download: persistReducer(downalodPersistConfig, downloadReducer),
});

export const store = configureStore({
    reducer: persistReducer(rootPersistConfig, rootReducer),
    middleware: getDefaultMiddleware({
        serializableCheck: {
            ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        },
    }),
});

export const persistor = persistStore(store);
