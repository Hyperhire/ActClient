import React, { useContext, useEffect, useState } from 'react';
import { Accordion, AccordionDetails, AccordionSummary, Stack } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const Faq = ({ setOption }) => {
  useEffect(() => {
    setOption({ title: '', subtitle: 'FAQ', description: '', back: true, menu: true });
  }, [setOption]);
  const faqs = [
    {
      title: 'What is Zigup?',
      description: 'Zigup is a career platform that allows you to share and explore information about salary breakups, job referrals, and interviews to help you advance your career.',
    },
    {
      title: 'What exactly Zigup do?',
      description:
        'At Zigup, we help you with\n- Finding detailed salary breakup data of Startups, MNCs \n- Network with others based on your intrests \n- Employee referral opportunities\n- Explore amazing job offers from top companies',
    },
    {
      title: 'How Zigup Works?',
      description: 'Zigup is run by our amazing community members like you.',
    },
    {
      title: 'How Zigup help candidates?',
      description:
        'Zigup is helping candidates for seeking new career opportunities, giving accurate salary breakup information & interview reviews and networking with respect to their career/skillsets\nIf the candidate is seeking a new opportunity, he/she can get job opportunities from Zigup and can get referral opportunities by employees from top companies \nIf the candidate is in the negotiation stage, he/she can utilize the salary breakup information to gain negotiation power\nIf the candidate has a query, he/she can upload the questions to the group chat / DM / Forum sections',
    },
    {
      title: 'How Zigup help Businesses How Zigup help Businesses?',
      description:
        'Zigup helps you find high-quality candidates which will make your business much more efficient and fast.\nYou can get more detailed information on how we help businesses at https://hire.zigup.in/',
    },
    {
      title: 'Why should I trust Zigup?',
      description:
        'Zigup is Anonymous Professional Community which means your personal data will not be shared publicly, we will keep your information anonymous.\nIn addition, the salary breakup, jobs and referral opportunities are shared by verified employees & amazing community members.',
    },
  ];

  return (
    <div>
      <div className="bottom-2">
        {faqs.map((faq, index) => (
          <Accordion
            key={faq.title + index}
            className={`bordered-top ${faqs.length === index - 1 ? 'border-bottom' : null}`}
            disableGutters={true}
            sx={{
              boxShadow: 'none',
            }}
          >
            <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1a-content" id="panel1a-header">
              <text className="flex-auto font-size-16 font-weight-500 poppins">{faq.title}</text>
            </AccordionSummary>
            <AccordionDetails className="background-neutrals-2">
              <text className="font-size-16 font-weight-500 poppins">{faq.description}</text>
            </AccordionDetails>
          </Accordion>
        ))}
      </div>
    </div>
  );
};

export default Faq;
