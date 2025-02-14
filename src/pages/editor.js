import React, {useState} from 'react';
import {Container, Typography} from '@mui/material'
import {styled} from '@mui/system';
import {TextareaAutosize} from '@mui/base';
import {useTheme} from '@mui/styles';
import Markdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import remarkMath from 'remark-math'
import rehypeKatex from 'rehype-katex'
import rehypeRaw from 'rehype-raw'
import {Prism as SyntaxHighlighter} from 'react-syntax-highlighter'
import {oneDark as darkCode, oneLight as lightCode} from 'react-syntax-highlighter/dist/esm/styles/prism'
import 'katex/dist/katex.min.css'

const StyledTextarea = styled(TextareaAutosize)(
    ({theme}) => `
    width: 100%;
    font-family: monospace;
    font-size: 0.875rem;
    font-weight: 400;
    line-height: 0.95;
    padding: 8px 12px;
    border-radius: 8px;
    color: ${theme.palette.mode === 'dark' ? '#C7D0DD' : '#1C2025'};
    background: ${theme.palette.mode === 'dark' ? '#1C2025' : '#fff'};
    border: 1px solid ${theme.palette.mode === 'dark' ? '#434D5B' : '#DAE2ED'};
    box-shadow: 0 2px 2px ${theme.palette.mode === 'dark' ? '#1C2025' : '#F3F6F9'};

    &:hover {
      border-color: #3399FF};
    }

    &:focus {
      border-color: #3399FF};
      box-shadow: 0 0 0 3px ${theme.palette.mode === 'dark' ? '#6B7A90' : '#b6daff'};
    }

    &:focus-visible {
      outline: 0;
    }
`);

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

const StyledContainer = styled(Container)(
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
    }
   
    pre > div {
        max-width: 100% !important;
        overflow-x: scroll !important;
    }
    
    blockquote > p {
        max-width: 100% !important;
    }
`);

const StyledLink = styled('a')(
    ({theme}) => `
    color: ${theme.palette.mode === 'dark' ? '#ffffff' : '#000000'};
    
    &:hover {
        font-weight: bold;
        text-decoration: none;
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

const text = `
# big heading

### little heading

_italic_ text

**bold** text

~strikethrough~ text

emoji:  🏙️🏕🛫🥏🚲

blockquote text:
> “This is the real secret of life — to be completely engaged with what you are doing 
> in the here and now. And instead of calling it work, realize it is play.”
> ― Alan Watts

lists and links:
- [standard link](https://blog.bengillett.com) 
- quick link: https://bengillett.com
- [x] this one has a checkbox
- [ ] add something here

math inline: $y = \\tan\\left(\\frac{\\theta}{\\pi}\\right)$

math block:
\`\`\`math
\\vec{\\nabla} \\times \\vec{F} = \\left(\\frac{\\partial F_z}{\\partial y} - \\frac{\\partial F_y}{\\partial 
z}\\right) \\hat{i} + \\left(\\frac{\\partial F_x}{\\partial z} - \\frac{\\partial F_z}{\\partial x}\\right) 
\\hat{j} + \\left(\\frac{\\partial F_y}{\\partial x} - \\frac{\\partial F_x}{\\partial y}\\right) \\hat{k}
\`\`\`

code inline: \`hello-world\`

code block:
\`\`\`
{
   "markdown": 100.0,
    "code": true
}
\`\`\`

code block with syntax highlighting:
\`\`\`python
def socket_send(self, message: str) -> str:
    return self._send(message)
\`\`\`

table:
| City | Average Annual Precipitation |
| ---------: | :------------------- |
| Seattle | 39.3 in |
| San Diego | 10.2 inches |
| Denver | 15.6 in |
| Dallas | 37.1 in |
| Minneapolis | 30.4 in |
| New York City  | 44.7 in |

images:


![mountains](https://www.svgrepo.com/show/272275/mountain-mountains.svg "!100px")
<img alt="train" src="https://www.svgrepo.com/show/375916/train.svg" height="100px"/>
<img alt="city" src="https://www.svgrepo.com/show/286065/city-river.svg" height="100px"/>
`;

const Editor = () => {
    const [markdownContent, setMarkdownContent] = useState(text);
    const theme = useTheme();
    const darkMode = theme.palette.mode === 'dark';
    return (
        <StyledContainer maxWidth={'md'}>
            <title>Markdown Editor</title>
            <br/>
            <Typography variant={'h5'}>
                Enter some Markdown:
            </Typography>
            <br/>
            <StyledTextarea value={markdownContent} onChange={event => setMarkdownContent(event.target.value)}/>
            <br/>
            <Markdown children={markdownContent}
                      remarkPlugins={[remarkGfm, remarkMath]}
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
            />
        </StyledContainer>
    )
};

export default Editor;
