import {styled} from "@mui/system";

const StyledLink = styled('a')(
    ({theme}) => `
    color: ${theme.palette.mode === 'dark' ? '#ffffff' : '#000000'};
    
    &:hover {
        font-weight: bold;
        text-decoration: none;
    }
`);

export default StyledLink;
