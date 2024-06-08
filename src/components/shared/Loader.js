import React from "react";
import { Grid } from "react-loader-spinner";

function Loader() {
  return (
    <div
      style={{
        width: "100%",
        height: "1000px",
        display: "flex",
        justifyContent: "center",
        paddingTop: "30px",
      }}
    >
      <Grid
        height="30"
        width="30"
        color="grey"
        ariaLabel="grid-loading"
        radius="12.5"
      />
    </div>
  );
}

export default Loader;
