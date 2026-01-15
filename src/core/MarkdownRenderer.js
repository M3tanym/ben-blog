import React from 'react';
import {styled} from '@mui/system';
import {useTheme} from '@mui/material/styles'
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
import {IconButton} from "@mui/material";
import ContentCopyIcon from '@mui/icons-material/ContentCopy';

const StyledCode = styled('code')(
    ({theme}) => `
    &.styled-code {
        font-family: ui-monospace, SFMono-Regular, SF Mono, Menlo, Consolas, Liberation Mono, monospace;
        font-size: 85%;
        line-height: 120%;
        margin: 0;
        padding: 0em .2em;
        white-space: break-spaces;
        border-radius: 3px;
        display: inline-block;
        color: ${theme.palette.mode === 'dark' ? '#abb2bf' : '#1f2328'};
        background-color: ${theme.palette.mode === 'dark' ? '#282c34' : '#f6f8fa'};
    }
    
    &.block {
        padding: 1em;
        margin: 0.5em 0px;
        width: 100%;
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
    color: ${theme.palette.mode === 'dark' ? '#9198a1' : '#59636e'};
    border-left: .28em solid ${theme.palette.mode === 'dark' ? '#3d444d' : '#c7c7c7'};
`);

const StyledTable = styled('table')(
    ({theme}) => `
    border-collapse: collapse;
    color: ${theme.palette.mode === 'dark' ? '#ffffff' : '#000000'};

    & th, td {
        border: 1px solid ${theme.palette.mode === 'dark' ? '#3d444d' : '#d1d9e0'};
        padding: 6px 13px;
        text-align: left;
    }
    
    & tr:nth-of-type(even) {
        background-color: ${theme.palette.mode === 'dark' ? '#151b23' : '#f6f8fa'};
    }
    
    & tr:hover {
        background-color: ${theme.palette.mode === 'dark' ? '#313234' : '#dee2ea'};
    }
`);

const StyledMarkdown = styled(Markdown)(
    ({theme}) => `
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
    
    & p, & li, & table, & h1, & h2, & h3, & h4, & h5, & h6 {
        font-family: "Source Serif 4", Georgia, Cambria, "Times New Roman", Times, serif;
        text-rendering: optimizeLegibility;
        -webkit-font-smoothing: antialiased;
    }
    
    & h1 {
        font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
        font-size: 46px;
        font-style: bold;
        letter-spacing: -0.6px;
        line-height: 50px;
    }
    
    & h2 {
        font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
        font-size: 32px;
        font-style: normal;
        font-weight: 300;
        letter-spacing: -0.5px;
        line-height: 38px;
    }
    
    & p, & li {
        letter-spacing: -0.003em;
        line-height: 30px;
        font-size: 20px;
    }
    
    & img {
        max-width: 90%;
        margin-left: 5%;
        margin-right: 5%;
    }
    
    .copy-icon {
        position: absolute;
        top: 0.35em;
        right: 0.05em;
        opacity: 0.6;    
        &:hover {
            opacity: 1;
        }
    }
    
    .sy-container {
        position: relative;
        width: 100%;
        background-color: ${theme.palette.mode === 'dark' ? '#282c34' : '#f6f8fa'};
    }
    
    .h-container {
        width: 88%;
    }
    
    .b-container {
        width: 12%;
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
                                const match = /language-(\w+)/.exec(className || '');
                                const isBlock = node?.position?.start?.line !== node?.position?.end?.line;
                                const highlighter = !inline && match ? (
                                    <StyledSyntaxHighlighter
                                        children={String(children).replace(/\n$/, '')}
                                        style={darkMode ? darkCode : lightCode}
                                        language={match[1]}
                                        PreTag={'div'}
                                        className={'highlighter-elem'}
                                        {...props}
                                    />
                                ) : (
                                    <StyledCode className={((className || '') + 'styled-code' + (isBlock ? ' block highlighter-elem' : ''))} {...props}>
                                        {children}
                                    </StyledCode>
                                );

                                const copyButton = (
                                    <IconButton className={'copy-icon'} onClick={(e) => {
                                        const elem = e.target.parentElement;
                                        console.log(elem);
                                        navigator.clipboard.writeText(String(children)).then(() => {
                                            elem.classList.add('copied');
                                            setTimeout(() => {
                                                elem.classList.remove('copied');
                                            }, 2000);
                                        });
                                    }}>
                                        <ContentCopyIcon />
                                    </IconButton>
                                );

                                return (
                                    isBlock ? (
                                    <div className={'sy-container'}>
                                        <div className={'h-container'}>{highlighter}</div>
                                        <div className={'b-container'}>{copyButton}</div>
                                    </div>
                                    ) : <>{highlighter}</>
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
                                    height = title?.substring(7) + ' !important';
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
