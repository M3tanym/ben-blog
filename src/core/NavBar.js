import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import {MicrochipIcon} from './CustomIcons';
import {Link, Tooltip} from "@mui/material";

const pages = [
    {'tooltip': 'Home', 'url': '/', 'icon': '🏡'},
    {'tooltip': 'Main Site', 'url': 'https://bengillett.com', 'icon': '👤',},
    {'tooltip': 'Comments', 'url': '/comments', 'icon': '💬',},
    {'tooltip': 'You Are Here', 'url': '/here', 'icon': '📍', },
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
    }

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
                            <MenuIcon />
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
                            sx={{
                                display: { xs: 'block', md: 'none' },
                                // height: 200,
                            }}
                        >
                            {pages.map((page) => (
                                <Tooltip title={page.tooltip} key={page.tooltip}>
                                    <MenuItem
                                        onClick={() => {
                                            handleCloseNavMenu();
                                            navigatePage(page.url);
                                        }}
                                    >
                                        <Typography sx={{ textAlign: 'center' }}>{page.icon}</Typography>
                                    </MenuItem>
                                </Tooltip>
                            ))}
                        </Menu>
                    </Box>

                    <MicrochipIcon sx={{display: 'flex', mr: 1}} />

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
                                >
                                    {page.icon}
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