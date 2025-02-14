import React from 'react';
import {styled} from '@mui/system';
import {useTheme} from '@mui/styles';
import Markdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import remarkMath from 'remark-math'
import remarkGemoji from 'remark-gemoji'
import rehypeKatex from 'rehype-katex'
import rehypeRaw from 'rehype-raw'
import {Prism as SyntaxHighlighter} from 'react-syntax-highlighter'
import {oneDark as darkCode, oneLight as lightCode} from 'react-syntax-highlighter/dist/esm/styles/prism'
import 'katex/dist/katex.min.css'
import StyledLink from "./StyledLink";

const StyledCode = styled('code')(
    ({theme}) => `
    &.styledCode {
        font-family: ui-monospace, SFMono-Regular, SF Mono, Menlo, Consolas, Liberation Mono, monospace;
        font-size: 85%;
        margin: 0;
        padding: .2em .4em;
        white-space: break-spaces;
        border-radius: 6px;
        display: inline-block;
        color: ${theme.palette.mode === 'dark' ? '#ffffff' : '#000000'};
        background-color: ${theme.palette.mode === 'dark' ? '#282C34' : '#ECECEC'};
    }
`);

const StyledBlockquote = styled('blockquote')(
    ({theme}) => `
    margin: 0;
    padding: 0 1em;
    color: ${theme.palette.mode === 'dark' ? '#ffffff' : '#000000'};
    border-left: .28em solid ${theme.palette.mode === 'dark' ? '#282C34' : '#ECECEC'};
`);

const StyledSyntaxHighlighter = styled(SyntaxHighlighter)(
    () => `
    font-size: 90%;
`);

const StyledMarkdown = styled(Markdown)(
    () => `
    .katex-display > .katex {
        max-width: 100% !important;
        white-space: normal !important;
        text-wrap-mode: nowrap !important;
    }
    
    .katex-display {
        max-width: 100% !important;
        overflow-x: scroll !important;
        overflow-y: hidden !important;
        padding-bottom: 12px;
    }
   
    pre > div {
        max-width: 100% !important;
        overflow-x: scroll !important;
    }
    
    blockquote > p {
        max-width: 100% !important;
    }
`);

const StyledTable = styled('table')(
    ({theme}) => `
    border-collapse: collapse;
    color: ${theme.palette.mode === 'dark' ? '#ffffff' : '#000000'};

    & th, td {
        border: 1px solid ${theme.palette.mode === 'dark' ? '#9d9d9d' : '#000000'};
        padding: 4px;
        text-align: left;
    }
    
    & th {
        background-color: ${theme.palette.mode === 'dark' ? '#282C34' : '#a9a9a9'};
    }
    
    & tr:hover {
        background-color: ${theme.palette.mode === 'dark' ? '#333333' : '#ECECEC'};
    }
`);

const MarkdownRenderer = (props) => {
    const theme = useTheme();
    const darkMode = theme.palette.mode === 'dark';
    return (
        <StyledMarkdown children={props.markdown}
              remarkPlugins={[remarkGfm, remarkMath, remarkGemoji]}
              rehypePlugins={[rehypeKatex, rehypeRaw]}
              components={{
                  code({node, inline, className, children, ...props}) {
                      const match = /language-(\w+)/.exec(className || '')
                      return !inline && match ? (
                          <StyledSyntaxHighlighter
                              children={String(children).replace(/\n$/, '')}
                              style={darkMode ? darkCode : lightCode}
                              language={match[1]}
                              PreTag={'div'}
                              {...props}
                          />
                      ) : (
                          <StyledCode className={((className || '') + ' styledCode')} {...props}>
                              {children}
                          </StyledCode>
                      )
                  },
                  img({node, ...props}) {
                      let title = node.properties.title;
                      let width = null;
                      let filter ='';
                      if (title && title[0] === '!') {
                          const isSvg = node.properties.src.split('.').slice(-1)[0] === 'svg'
                          filter = (darkMode && isSvg) ? 'invert(100%)' : '';
                          width = title.substring(1) + ' !important';
                          title = null;
                      }
                      return <img alt={''} {...props} title={title} width={width}
                                  style={{filter: filter}}/>
                  },
                  blockquote({...props}) {
                      return <StyledBlockquote {...props} />
                  },
                  a({...props}) {
                      return <StyledLink {...props} />
                  },
                  table({...props}) {
                      return <StyledTable {...props} />
                  }
              }}
    />);
}

export default MarkdownRenderer;
