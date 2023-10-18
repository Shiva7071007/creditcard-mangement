import { Box, AppBar, Toolbar, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useCookies } from 'react-cookie';
import { logout } from "../api/authentication";

export default function NavigationBarComponent() {
    const navigate = useNavigate();
    const [userEmail, , removeUserEmail] = useCookies(['UserEmail']);

    const navigateToHome = () => {
        logout()
            .then(() => {
                removeUserEmail('UserEmail');
                navigate(`/`);
            })
            .catch(() => navigate(`/`))
    }

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        {userEmail['UserEmail']}
                    </Typography>
                    <Button color="inherit" onClick={navigateToHome}>LogOut</Button>
                </Toolbar>
            </AppBar>
        </Box>
    );
}