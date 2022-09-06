import React, { useEffect, useState } from 'react';

import memberAPI from 'API/v1/member';

const GetContentData = ({ member, gen }) => {
  const [GenList, setGenList] = useState([]);
  const [list, setList] = useState([]);

  useEffect(() => {
    memberAPI
      .getAllMembers({
        token: member.token,
      })
      .then((data) => {
        if (data.success) {
          setList(data.list);
        }
      });
  }, []);

  useEffect(() => {
    setGenList(list.filter((data) => data.generation === gen));
  }, [gen, list]);

  return GenList;
};

export default GetContentData;
