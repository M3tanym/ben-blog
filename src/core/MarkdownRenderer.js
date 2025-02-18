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
import StyledLink from './StyledLink';
import getPagePath from "./PagePath";

const StyledCode = styled('code')(
    ({theme}) => `
    &.styledCode {
        font-family: ui-monospace, SFMono-Regular, SF Mono, Menlo, Consolas, Liberation Mono, monospace;
        font-size: 85%;
        line-height: 120%;
        margin: 0;
        padding: 0em .2em;
        white-space: break-spaces;
        border-radius: 3px;
        display: inline-block;
        color: ${theme.palette.mode === 'dark' ? '#ffffff' : '#000000'};
        background-color: ${theme.palette.mode === 'dark' ? '#282C34' : '#ECECEC'};
    }
`);

const StyledSyntaxHighlighter = styled(SyntaxHighlighter)(
    () => `
    font-size: 90%;
`);

const StyledBlockquote = styled('blockquote')(
    ({theme}) => `
    margin: 0;
    padding: 0em 1em;
    color: ${theme.palette.mode === 'dark' ? '#ffffff' : '#000000'};
    border-left: .28em solid ${theme.palette.mode === 'dark' ? '#282C34' : '#c7c7c7'};
`);

const StyledTable = styled('table')(
    ({theme}) => `
    border-collapse: collapse;
    color: ${theme.palette.mode === 'dark' ? '#ffffff' : '#000000'};

    & th, td {
        border: 1px solid ${theme.palette.mode === 'dark' ? '#9d9d9d' : '#3a3a3a'};
        padding: 4px;
        text-align: left;
    }
    
    & th {
        background-color: ${theme.palette.mode === 'dark' ? '#282C34' : '#b6b6b6'};
    }
    
    & tr:hover {
        background-color: ${theme.palette.mode === 'dark' ? '#333333' : '#ECECEC'};
    }
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
        padding-bottom: 14px;
    }
   
    pre > div {
        max-width: 100% !important;
        overflow-x: scroll !important;
    }
    
    blockquote > p {
        max-width: 100% !important;
    }
    
    & p, & li {
        font-family: "Source Serif 4", Georgia, Cambria, "Times New Roman", Times, serif;
        letter-spacing: -0.003em;
        line-height: 32px;
        font-size: 20px;
        text-rendering: optimizeLegibility;
        -webkit-font-smoothing: antialiased;
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
                                let src = node.properties.src;
                                let width = null;
                                let height = null;
                                let filter = '';
                                if (title?.startsWith('^')) {
                                    // auto-invert images titled with ^
                                    filter = darkMode ? 'invert(100%)' : '';
                                    title = title.substring(1);
                                }

                                if (title?.startsWith('width=')) {
                                    // width override
                                    width = title.substring(6) + ' !important';
                                    title = null;
                                }

                                if (title?.startsWith('height=')) {
                                    // height override
                                    height = title.substring(7) + ' !important';
                                    title = null;
                                }

                                if (src[0] === '/' || !src.includes('/')) {
                                    // auto-route local images
                                    if (src[0] === '/') {
                                        src = src.substring(1);
                                    }
                                    const [basePath, pageName] = getPagePath();
                                    src = basePath + pageName + '/' + src;
                                }

                                return <img alt={''} width={width} height={height}
                                            {...props} title={title}
                                            src={src} style={{filter: filter}}/>
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
