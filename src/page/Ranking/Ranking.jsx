import React from 'react';

// local
import MemberGrid from './Component/MemberGrid';
import RankingTable from './Component/RankingTable';
import PageContainer from './Component/PageContainer';

const Ranking = () => {
  return (
    <div className="bg-mainWhite dark:bg-mainBlack">
      <PageContainer>
        <MemberGrid />
        <RankingTable />
      </PageContainer>
    </div>
  );
};

export default Ranking;
