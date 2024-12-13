import {
    Box,
    useMediaQuery,
    useTheme,
  } from "@mui/material";
  import { Header, AccordionItem } from "../../components";
  import { tokens } from "../../theme";
  import React from 'react';
  import { mockAccordionData } from "../../data/mockAccordionData";
  
  function HelpPage() {
    // const theme = useTheme();
    // const colors = tokens(theme.palette.mode);
    // const isXlDevices = useMediaQuery("(min-width: 1260px)");
    // const isMdDevices = useMediaQuery("(min-width: 724px)");
    // const isXsDevices = useMediaQuery("(max-width: 436px)");
    return (
      <Box m="20px">
      <Header title="Help" subtitle="Welcome to the help page" />
      {mockAccordionData.map((accordion, index) => (
        <AccordionItem key={index} {...accordion} />
      ))}
    </Box>
  );
};

export default HelpPage;