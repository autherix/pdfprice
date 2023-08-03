import React from "react";
import { Grid } from "@material-ui/core";

// styles
import useStyles from "./styles";

// components
import PageTitle from "../../components/PageTitle/PageTitle";
import Widget from "../../components/Widget/Widget";
import { Typography } from "../../components/Wrappers/Wrappers";

export default function TypographyPage() {
  const classes = useStyles();

  return (
    <>
      <PageTitle title="Typography" />
      <Grid container spacing={4}>
      hey
      </Grid>
    </>
  );
}
