import React, { Component} from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import {authenticateLogin} from '../actions/loginActions';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {withRouter} from 'react-router';
import Image from '../image.png';
import Chest from '../chest.png';

const styles =theme => ({
  main: {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh',
    height: '1px',
    alignItems: 'center',
    justifyContent: 'flex-start',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    backgroundImage: `url(${Image})`
    //backgroundImage:
        //'radial-gradient(circle at 50% 14em, #313264 0%, #00023b 60%, #00023b 100%)',
},

  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  paper: {
    marginTop: theme.spacing(18),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor:'white',
    padding: 15,
    borderRadius: 20,
  },
  avatar: {
    margin: theme.spacing(1),
    maxWidth: 50
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
    backgroundColor:"#00C187",
    outline:0 ,
    '&:hover': {
      backgroundColor: '#01AC79',
    },
    '&:active': {
      backgroundColor: '#01AC79',
    },
    '&:focus': {
      outline:0 
    },
  },
});


class SignIn extends Component {

  constructor(props){
      super(props);
      this.state = {
          username:'',
          password:'',
          role:'',
      }
  }

  componentWillReceiveProps(nextProps) {
    console.log(nextProps)
    if(nextProps.loginSuccess){
      console.log("Login Successful")  
      this.props.history.push('/users');
    }
    else{
      alert('Login fail');
    }

  }
    handleChange =  e => {
      this.setState({[e.target.name]: e.target.value});
      (console.log(this.state));
    };
    
    handleSubmit = e =>{
      e.preventDefault();
      this.props.authenticateLogin(this.state)
    }

    render(){
      const { username, password, role} = this.state;
      const { classes } = this.props;
       return (
        <div
        className={classes.main}>
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <img src= {Chest} className= {classes.avatar} />
        <form className={classes.form} noValidate>
          <TextField
            onChange={this.handleChange}
            defaultValue={username}
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="username"
            label="Username"
            name="username"
            autoComplete="username"
            autoFocus
          />
          <TextField
            onChange={this.handleChange}
            defaultValue={password}
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
          />
          <FormControl className={classes.formControl}>
        <InputLabel id="demo-simple-select-autowidth-label">Role</InputLabel>
        <Select
          labelId="select-autowidth-label"
          id="select-autowidth"
          value={role}
          name = "role"
          onChange={this.handleChange}
          autoWidth
        >
          <MenuItem value={"STUDENT"}>Student</MenuItem>
          <MenuItem value={"TEACHER"}>Teacher</MenuItem>
          <MenuItem value={"ADMIN"}>Admin</MenuItem>
        </Select>
      </FormControl>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick = {this.handleSubmit}
          >
            Sign In
          </Button>

        </form>
      </div>
    </Container>
    </div>
  );
    }
 
}

SignIn.propTypes = {
  authenticateLogin: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
  user:PropTypes.object,
  loginSuccess: PropTypes.bool
};

const mapStateToProps = state => ({
    user: state.loginReducer.user,
    loginSuccess: state.loginReducer.loginSuccess
  });

export default withRouter(connect(mapStateToProps,{authenticateLogin})(withStyles(styles)(SignIn)));