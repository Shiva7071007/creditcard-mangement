import { Paper } from '@mui/material';

import NavigationBarComponent from './navigation.component';
import CardsGridComponent from './cardGrid.component';

function BoardComponent() {
    return (
        <Paper elevation={8} style={{
            height: '90vh',
            width: '90vw',
            alignItems: 'center',
            justifyContent: 'center',
            textAlign: 'center',
        }}>
            <div>
                <NavigationBarComponent />
            </div>
            <div>
                < CardsGridComponent />
            </div>
        </Paper>
    );
}

export default BoardComponent;
