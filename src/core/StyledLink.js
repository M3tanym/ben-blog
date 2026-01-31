import {styled} from '@mui/system';

const StyledLink = styled('a')(
    ({theme}) => `
    color: inherit;
    text-decoration: underline;
    text-decoration-thickness: 1px;
    
    &:hover {
        text-decoration: underline;
        text-decoration-thickness: 2px;
    }
`);

export default StyledLink;
