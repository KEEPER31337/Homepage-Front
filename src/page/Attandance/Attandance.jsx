import React from 'react';

// shared
import PageContainer from 'shared/PageContainer';
import LayoutContainer from 'shared/LayoutContainer';

// local
import Calendar from './Calendar';
import Box from './Box';
import AttandanceTable from './AttandanceTable';

const Attandance = () => {
  return (
    <PageContainer>
      <LayoutContainer>
        <div className="container">
          <Calendar />
        </div>
        <div className="container grid grid-flow-col justify-center content-center gap-10 py-6">
          <Box />
          <Box />
          <Box />
          <Box />
        </div>
        <div className="container py-6">
          <AttandanceTable />
        </div>
      </LayoutContainer>
    </PageContainer>
  );
};

export default Attandance;
