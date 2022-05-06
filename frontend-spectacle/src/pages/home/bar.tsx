import React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { useAuth } from '../../hooks/auth';
const Bar: React.FC = () => {
    const { signOut } = useAuth()

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        Espetáculos
                    </Typography>
                    <Button color="inherit" onClick={signOut}>SAIR</Button>
                </Toolbar>
            </AppBar>
        </Box>
    );
}

export default Bar;