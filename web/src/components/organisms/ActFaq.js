import React from 'react';
import { Accordion, AccordionDetails, AccordionSummary } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const ActFaq = ({ faqs, bgColor, contentColor }) => {
  return (
    <div className="acr-faq-wrapper">
      {faqs.map((faq, index) => (
        <Accordion
          key={faq.title + index}
          className={`bordered-top ${faqs.length === index - 1 ? 'border-bottom' : null}`}
          disableGutters={true}
          sx={{
            boxShadow: 'none',
            backgroundColor: bgColor,
          }}
        >
          <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1a-content" id="panel1a-header">
            <div className="acr-faq-title">{faq.title}</div>
          </AccordionSummary>
          <AccordionDetails sx={{ backgroundColor: contentColor }} className="background-box">
            <div className="acr-faq-description">{faq.description}</div>
          </AccordionDetails>
        </Accordion>
      ))}
    </div>
  );
};
export default ActFaq;
