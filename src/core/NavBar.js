import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import {Link, Tooltip} from "@mui/material";
import {MicrochipIcon} from './CustomIcons';
import MenuIcon from '@mui/icons-material/Menu';
import TocIcon from '@mui/icons-material/Toc';
import HomeIcon from '@mui/icons-material/Home';
import ChatBubbleIcon from '@mui/icons-material/ChatBubble';
import PlaceIcon from '@mui/icons-material/Place';

const pages = [
    {'tooltip': 'Table of Contents', 'url': '/', 'icon': 'toc'},
    {'tooltip': 'Main Site', 'url': 'https://bengillett.com', 'icon': 'home'},
    {'tooltip': 'Comments', 'url': '/comments', 'icon': 'comment'},
    {'tooltip': 'You are Here', 'url': '/here', 'icon': 'place'},
];

function NavBar() {
    const [anchorElNav, setAnchorElNav] = React.useState(null);

    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const navigatePage = (url) => {
        window.location = url;
    };

    const pickIcon = (icon) => {
        switch (icon) {
            case 'toc':
                return <TocIcon />;
            case 'home':
                return <HomeIcon />;
            case 'comment':
                return <ChatBubbleIcon />;
            case 'place':
                return <PlaceIcon />;
            default:
            return <MenuIcon />;
        }
    };

    return (
        <AppBar position="static">
            <Container maxWidth="md">
                <Toolbar disableGutters>
                    <Box sx={{ flexGrow: 0, display: { xs: 'flex', md: 'none' } }}>
                        <IconButton
                            size="large"
                            aria-label="page menu"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={handleOpenNavMenu}
                            color="inherit"
                        >
                            <MenuIcon/>
                        </IconButton>
                        <Menu
                            id="menu-appbar"
                            anchorEl={anchorElNav}
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'left',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'left',
                            }}
                            open={Boolean(anchorElNav)}
                            onClose={handleCloseNavMenu}
                            sx={{ display: { xs: 'block', md: 'none' } }}
                        >
                            {pages.map((page) => (
                                <Tooltip title={page.tooltip} key={page.tooltip}>
                                    <MenuItem
                                        onClick={() => {
                                            handleCloseNavMenu();
                                            navigatePage(page.url);
                                        }}
                                    >
                                        <Typography sx={{ textAlign: 'center', mr: 1, mt: 0.7 }}>{pickIcon(page.icon)}</Typography>
                                        <Typography>{page.tooltip}</Typography>
                                    </MenuItem>
                                </Tooltip>
                            ))}
                        </Menu>
                    </Box>

                    <MicrochipIcon sx={{ mr: 1.2, display: { xs: 'none', md: 'flex' }  }}/>
                    <Typography
                        variant="h6"
                        noWrap
                        sx={{
                            mr: 2,
                            display: 'flex',
                            fontFamily: 'monospace',
                            fontWeight: 700,
                            letterSpacing: '.03rem',
                            color: 'inherit',
                            textDecoration: 'none',
                        }}
                        component={Link}
                        href="/"
                    >Ben's Blog</Typography>

                    <MicrochipIcon sx={{ display: { xs: 'flex', md: 'none' }  }}/>

                    <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                        {pages.map((page) => (
                            <Tooltip title={page.tooltip} key={page.tooltip}>
                                <Button
                                    onClick={() => {
                                        handleCloseNavMenu();
                                        navigatePage(page.url);
                                    }}
                                    sx={{
                                        my: 2,
                                        display: 'block',
                                        color: 'inherit',
                                    }}
                                >{pickIcon(page.icon)}
                                </Button>
                            </Tooltip>
                        ))}
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    );
}
export default NavBar;