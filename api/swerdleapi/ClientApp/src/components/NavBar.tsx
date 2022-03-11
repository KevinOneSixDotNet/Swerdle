import HelpIcon from '@mui/icons-material/Help';
import SettingsIcon from '@mui/icons-material/Settings';
import AppBar from '@mui/material/AppBar/AppBar';
import Toolbar from '@mui/material/Toolbar/Toolbar';
import Typography from '@mui/material/Typography/Typography';

export interface NavProps {
    clickHandler: Function;
}

export default function NavBar(props: NavProps) {
    return( 
        <div>
        <AppBar position="relative" sx={{backgroundColor: "#787c7e"}}>
            <Toolbar sx={{justifyContent:"space-between"}} >
                <HelpIcon/>
                <Typography color="inherit" variant="h4">
                    SWERDLE
                </Typography>
                <SettingsIcon onClick={() => { props.clickHandler();}}/>
            </Toolbar>
        </AppBar>
        </div>
    )
}