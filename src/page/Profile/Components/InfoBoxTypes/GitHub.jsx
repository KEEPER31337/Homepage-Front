import React, { useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';
import axios from 'axios';

export default function GitHub(props) {
  const gitId = props.gitId;
  const [gitMd, setGitMd] = useState(null);

  useEffect(async () => {
    try {
      await axios
        .get('https://api.github.com/repos/' + gitId + '/' + gitId + '/readme')
        .then((res) => {
          const base64 = res.data.content;
          setGitMd(
            decodeURIComponent(
              escape(window.atob(base64.replace('\n', '').replace(/\s/g, '')))
            )
          );
        });
    } catch (e) {
      console.log(e);
    }
  }, []);

  if (gitMd == null) return <div />;
  else return <ReactMarkdown rehypePlugins={[rehypeRaw]} children={gitMd} />;
}
