import React from 'react';

// local
import Member from './Component/Member';
import RankingTable from './Component/RankingTable';
import PageContainer from './Component/PageContainer';

const Ranking = () => {
  return (
    <div className="bg-mainWhite dark:bg-mainBlack">
      <PageContainer>
        <Member />
        <RankingTable />
      </PageContainer>
    </div>
  );
};

export default Ranking;
