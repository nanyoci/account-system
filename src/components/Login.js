import React, { Component} from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import { withStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import {authenticateLogin, fetchMe} from '../actions/loginActions';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {withRouter} from 'react-router';
import LoginBackground from '../image/loginBackground.png';
import PokemonIcon from '../image/pokemonIcon.png';

const styles =theme => ({
  main: {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh',
    height: '1px',
    alignItems: 'center',
    justifyContent: 'flex-start',
    backgroundRepeat: 'no-repeat',
    backgroundSize: '100% 120%' ,
    backgroundImage: `url(${LoginBackground})`,
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

/**
 * This component displays the loginpage for user.
 */
class Login extends Component {

  constructor(props){
      super(props);
      this.state = {
          username:'',
          password:'',
          role:'',
      }
  }

  componentWillMount(){
    if(localStorage.getItem('access_token')){
      this.props.history.push('/');
    }
  }

  componentWillReceiveProps(nextProps) {
    console.log(nextProps)
    if(nextProps.loginSuccess && Object.keys(this.props.currentUser).length === 0){
      this.props.fetchMe(nextProps.access_token)
    }
    if(nextProps.loginSuccess && nextProps.currentUser.email){
      console.log("Login Successful")  
      this.props.history.push('/')
    }
    else if(!nextProps.loginSuccess){
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
        <img src= {PokemonIcon} className= {classes.avatar} alt="Pokemon Icon"/>
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
          <MenuItem value={"ROLE_STUDENT"}>Student</MenuItem>
          <MenuItem value={"ROLE_TEACHER"}>Teacher</MenuItem>
          <MenuItem value={"ROLE_ADMIN"}>Admin</MenuItem>
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
            Login
          </Button>

        </form>
      </div>
    </Container>
    </div>
  );
    }
 
}

Login.propTypes = {
  /** An action creator for authenticating login */
  authenticateLogin: PropTypes.func.isRequired,
  /** An action creator for fetching current user */
  fetchMe: PropTypes.func.isRequired,
  /** An object used for styling */
  classes: PropTypes.object.isRequired,
  /** The currently logged in user */
  currentUser:PropTypes.object,
  /** Access token of the currently logged in user */
  access_token:PropTypes.string,
  /** Refresh token of the currently logged in user */
  refresh_token:PropTypes.string,
  /** A boolean indicating if login is successful */
  loginSuccess: PropTypes.bool
};

const mapStateToProps = state => ({
    currentUser: state.authReducer.currentUser,
    access_token: state.authReducer.access_token,
    refresh_token: state.authReducer.refresh_token,
    loginSuccess: state.authReducer.loginSuccess
  });

export default withRouter(connect(mapStateToProps,{authenticateLogin, fetchMe})(withStyles(styles)(Login)));