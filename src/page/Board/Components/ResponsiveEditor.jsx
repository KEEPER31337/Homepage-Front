import React, { useState, useEffect } from 'react';
import resolveConfig from 'tailwindcss/resolveConfig';

//마크다운 편집기 에디터
import '@toast-ui/editor/dist/toastui-editor.css';
import { Editor } from '@toast-ui/react-editor';

//마크다운 편집기 플러그인
import '@toast-ui/editor/dist/theme/toastui-editor-dark.css';
import chart from '@toast-ui/editor-plugin-chart';
import 'highlight.js/styles/github.css';
import codeSyntaxHighlight from '@toast-ui/editor-plugin-code-syntax-highlight';
import 'tui-color-picker/dist/tui-color-picker.css';
import colorSyntax from '@toast-ui/editor-plugin-color-syntax';
import tableMergedCell from '@toast-ui/editor-plugin-table-merged-cell';
import uml from '@toast-ui/editor-plugin-uml';

const ResponsiveEditor = (props) => {
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  const [width, setWidth] = useState(window.innerWidth);
  const smWidth = resolveConfig().theme.screens.sm;
  const handleResize = () => {
    setWindowSize({
      width: window.innerWidth,
      height: window.innerHeight,
    });
  };

  useEffect(() => {
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <Editor
      initialValue={props.content}
      usageStatistics={false}
      plugins={[chart, codeSyntaxHighlight, colorSyntax, tableMergedCell, uml]}
      theme={props.isDark ? 'dark' : 'light'}
      previewStyle={
        window.innerWidth < parseInt(smWidth, 10) ? 'tab' : 'vertical'
      }
      height="100%"
      onChange={props.updateContent}
      ref={props.editorRef}
    />
  );
};

export default ResponsiveEditor;
