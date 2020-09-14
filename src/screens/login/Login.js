import React, { Component } from 'react';
import './Login.css';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import FormControl from '@material-ui/core/FormControl';
import Typography from '@material-ui/core/Typography';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import TabContainer from '@material-ui/core/TableContainer';
import FormHelperText from '@material-ui/core/FormHelperText';
const styles = theme => ({
    formControl: {
        margin: theme.spacing.unit,
        minWidth: 240
      },
    button:{
        margin: theme.spacing.unit,
        minWidth: 70
    }
})
class Login extends Component{
    constructor() {
        super();
        this.state = {
            userName: "",
            password:"",
            reqUserName:"swetha",
            reqPass:"swetha",
            userNameRequired:"dispNone",
            passwordRequired:"dispNone",
            loginValidation:"dispNone"
        }
    }
    userNameChangeHandler = event => {
        this.setState({ userName: event.target.value });
    
      }
    passwordChangeHandler = event => {
        this.setState({ password: event.target.value });
    
      }
    loginHandler = event => {
        sessionStorage.setItem('access-token'," ");
        console.log("session storage"+sessionStorage.getItem('access-token'));
        this.state.userName===""?this.setState({userNameRequired:"dispBlock"}):this.setState({userNameRequired:"dispNone"});
        this.state.password===""?this.setState({passwordRequired:"dispBlock"}):this.setState({passwordRequired:"dispNone"});
        if((this.state.userName===this.state.reqUserName)&&(this.state.password===this.state.reqPass))
        {
            console.log("Valid");
            this.setState({loginValidation:"dispNone"});
        }
        else if(this.state.userName!=="" && this.state.password!==""){
            console.log("Invalid");
            this.setState({loginValidation:"dispBlock"});
        }
        else{
            this.setState({loginValidation:"dispNone"});
        }
             
      }
    render() {
        const { classes } = this.props;
        return (
            <div>
                <div className="header">
                    Image Viewer
                </div>
                <div className="loginCard">
                    <Card id="card">
                    <CardContent>
                        <TabContainer>
                        <FormControl className={classes.formControl} id="loginText">
                            LOGIN
                        </FormControl><br/>
                        <FormControl className={classes.formControl} required>
                            <InputLabel htmlFor="userName"> Username </InputLabel>   
                            <Input id="userName" onChange={this.userNameChangeHandler} />    
                            <FormHelperText className={this.state.userNameRequired}><span className="red">required</span></FormHelperText>                 
                        </FormControl><br/>
                        <FormControl className={classes.formControl} required>
                            <InputLabel htmlFor="password"> Password </InputLabel>
                            <Input type="password" id="password"  onChange={this.passwordChangeHandler} />
                            <FormHelperText className={this.state.passwordRequired}><span className="red">required</span></FormHelperText>
                         </FormControl><br/><br/>
                        <FormControl  className={classes.button}>
                            <FormHelperText className={this.state.loginValidation}><span className="red">Incorrect username and/or password</span></FormHelperText><br/>
                            <Button variant="contained" color="primary" onClick={this.loginHandler} >
                                LOGIN
                            </Button>
                        </FormControl>
                        </TabContainer>
                    </CardContent>
                    </Card>
                </div>
            </div>
        )
    }
}
export default withStyles(styles)(Login);