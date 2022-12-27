import React from 'react'
import './ContactUs.css'
import { Grid, TextField, Button, Card, CardContent, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core';

const useStyles=makeStyles((theme)=>({
    div:{
        marginTop:100
    }
}))

const ContactUs = () => {
    const classes=useStyles();
  return (
    <div className={classes.div}> 
      <Grid>
        <Card style={{ maxWidth: 550, padding: "20px 5px", margin: "0 auto" }}>
          <CardContent>
            <Typography gutterBottom variant="h5">
              Contact Us
          </Typography> 
            <Typography variant="body2" color="textSecondary" component="p" gutterBottom>
              Fill up the form and our team will get back to you within 24 hours.
          </Typography> 
            <form>
              <Grid container spacing={1}>
                <Grid xs={12} sm={6} item>
                  <TextField placeholder="Enter first name" label="First Name" variant="outlined" fullWidth required />
                </Grid>
                <Grid xs={12} sm={6} item>
                  <TextField placeholder="Enter last name" label="Last Name" variant="outlined" fullWidth required />
                </Grid>
                <Grid item xs={12}>
                  <TextField type="email" placeholder="Enter email" label="Email" variant="outlined" fullWidth required />
                </Grid>
                <Grid item xs={12}>
                  <TextField type="number" placeholder="Enter phone number" label="Phone" variant="outlined" fullWidth required />
                </Grid>
                <Grid item xs={12}>
                  <TextField label="Message" multiline rows={4} placeholder="Type your message here" variant="outlined" fullWidth required />
                </Grid>
                <Grid item xs={12}>
                  <Button type="submit" variant="contained" color="secondary" fullWidth>Submit</Button>
                </Grid>
              </Grid>
            </form>
          </CardContent>
        </Card>
      </Grid>
    </div>
  )
}

export default ContactUs