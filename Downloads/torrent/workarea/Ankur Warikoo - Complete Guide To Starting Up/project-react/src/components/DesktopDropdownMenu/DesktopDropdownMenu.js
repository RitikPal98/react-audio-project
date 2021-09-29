import React from "react";
import Menu from "./Menu";
import Grid from '@material-ui/core/Grid'

import categoryStrcture from "../../data/category-strcture";

export default function SimpleMenu() {
  return (
    <Grid container style={{ display: "flex" }}>
      {categoryStrcture.map((category, key) => (
          <Grid item>
            <Menu key={key} category={category} />
          </Grid>
      ))}
    </Grid>
  );
}
