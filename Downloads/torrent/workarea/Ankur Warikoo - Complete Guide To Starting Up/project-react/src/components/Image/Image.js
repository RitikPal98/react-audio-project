import Cover from "../../assets/image.png";

import React, { useState } from "react";

export default function Image({ src, ...rest }) {
    const [status, setStatus] = useState("loading");

    const onLoad = () => {
        setStatus("success");
    };

    const onError = () => {
        setStatus("error");
    };

    return (
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
            <img
                style={status === "success" ? { display: "flex" } : { display: "none" }}
                onLoad={onLoad}
                onError={onError}
                src={src}
                alt="cover_image"
                {...rest}
            />

            {status === "loading" && <div style={{ backgroundColor: "#f2f2f2" }} {...rest} />}

            {status === "error" && <img src={Cover} alt="cover_image" {...rest} />}
        </div>
    );
}
