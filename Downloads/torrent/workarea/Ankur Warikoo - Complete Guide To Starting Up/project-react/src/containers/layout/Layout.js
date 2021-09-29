import React from "react";
import TopBar from "../topBar";
import Player from "../player";

export default function Layout({ children }) {
    return (
        <div>
            <TopBar />
            <div id="app-main-content">
                {children}
                <Player />
            </div>
        </div>
    );
}
