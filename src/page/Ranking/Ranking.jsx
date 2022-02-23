import React from 'react';

// local
import MemberGrid from './Component/MemberGrid';
import RankingTable from './Component/RankingTable';
import PageContainer from './Component/PageContainer';
import AuthUser from 'shared/AuthUser';

const Ranking = () => {
  return (
    <AuthUser>
      <div className="bg-mainWhite dark:bg-mainBlack">
        <PageContainer>
          <MemberGrid />
          <RankingTable />
        </PageContainer>
      </div>
    </AuthUser>
  );
};

export default Ranking;
