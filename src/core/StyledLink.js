import {styled} from '@mui/system';

const StyledLink = styled('a')(
    ({theme}) => `    
    color: ${theme.palette.mode === 'dark' ? '#ffffff' : '#000000'};
    text-decoration: underline;
    text-decoration-thickness: 1px;
    
    &:hover {
        text-decoration: underline;
        text-decoration-thickness: 2px;
    }
`);

export default StyledLink;
