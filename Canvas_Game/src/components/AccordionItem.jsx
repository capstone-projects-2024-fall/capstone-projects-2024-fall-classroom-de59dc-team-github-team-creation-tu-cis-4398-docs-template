/* eslint-disable react/prop-types */
import { useTheme } from "@emotion/react";
import { tokens } from "../theme";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Typography,
} from "@mui/material";
import { ExpandMore } from "@mui/icons-material";
import React from 'react';
const AccordionItem = ({ question, details }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  return (
    <Accordion defaultExpanded sx={{ bgcolor: `${colors.primary[200]}` }}>
      <AccordionSummary expandIcon={<ExpandMore />}>
        <Typography color={colors.greenAccent[900]}  fontWeight="bold"  variant="h5">
          {question}
        </Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Typography fontWeight="bold" color={colors.gray[700]} style={{ whiteSpace: "pre-line" }} >{details}</Typography>
      </AccordionDetails>
    </Accordion>
  );
};

export default AccordionItem;
