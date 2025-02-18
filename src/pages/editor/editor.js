import React, {useState} from 'react';
import {Container, Typography} from '@mui/material';
import {styled} from '@mui/system';
import {TextareaAutosize} from '@mui/base';
import MarkdownRenderer from '../../core/MarkdownRenderer';

const StyledTextarea = styled(TextareaAutosize)(
    ({theme}) => `
    width: 100%;
    font-family: monospace;
    font-size: 1rem;
    font-weight: 400;
    line-height: 1;
    padding: 8px 12px;
    border-radius: 8px;
    color: ${theme.palette.mode === 'dark' ? '#C7D0DD' : '#1C2025'};
    background: ${theme.palette.mode === 'dark' ? '#1C2025' : '#ffffff'};
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

const text = `## sample markdown :pencil:`;
const Editor = () => {
    const [markdownContent, setMarkdownContent] = useState(text);
    return (
        <Container maxWidth={'md'}>
            <title>Markdown Editor</title>
            <br/>
            <Typography variant={'h5'}>
                Enter some Markdown:
            </Typography>
            <br/>
            <StyledTextarea value={markdownContent} onChange={event => setMarkdownContent(event.target.value)}/>
            <br/>
            <MarkdownRenderer markdown={markdownContent}/>
        </Container>
    )
};

export default Editor;