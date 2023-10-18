import { Divider, Grid } from '@mui/material';
import LoginComponent from './login.component';

function HomeComponent() {
  return (
    <div className="Home">
      <h1 style={{ textAlign: 'center', padding: '10px' }}>Card management</h1>
      <Divider />
      <Grid container spacing={2}>
        <Grid item xs={3}>
        </Grid>
        <Grid item xs={15}>
          <LoginComponent />
        </Grid>
        <Grid item xs={10}>
        </Grid>
      </Grid>
    </div>
  );
}

export default HomeComponent;
