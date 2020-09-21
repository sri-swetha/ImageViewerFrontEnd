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
import { Link } from 'react-router-dom';
import SearchIcon from '@material-ui/icons/Search';
import { fade, makeStyles } from '@material-ui/core/styles';
import InputBase from '@material-ui/core/InputBase';
import Avatar from '@material-ui/core/Avatar';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardActions from '@material-ui/core/CardActions';
import IconButton from '@material-ui/core/IconButton';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import '../../common/common.css';
const styles = theme => ({
    formControl: {
        margin: theme.spacing.unit,
        minWidth: 240
    },
    button: {
        margin: theme.spacing.unit,
        minWidth: 70
    }
})
class Login extends Component {
    constructor() {
        super();
        this.state = {
            userName: "",
            password: "",
            reqUserName: "swetha",
            reqPass: "swetha",
            userNameRequired: "dispNone",
            passwordRequired: "dispNone",
            loginValidation: "dispNone",
            loggedin: "false"
        }
    }


    componentWillMount() {
        //Get Uploaded Image of id
        let dataUpcoming = null;
        let xhrUpcoming = new XMLHttpRequest();
        let that = this;
        xhrUpcoming.addEventListener("readystatechange", function () {
            if (this.readyState === 4) {
                that.setState({ uploadedImages: JSON.parse(this.responseText) });
            }
        })

        xhrUpcoming.open("GET", "https://graph.instagram.com/17927511802426913?fields=id,media_type,media_url,username,timestamp&access_token=IGQVJYWTVDNXgxUmRDb3ROcjMwN29IWTQ3Si1Vc3JJWDA3dUFLVDlPOVJodkFKNkdCTEtnNjBleFBJM0hTc2tmWmw3TkhSdU5JdXV3cjQwRTFyYlB4NWxqZADk3X3gyRXVSVlJaOXFZAczk4bVg1RFFMTDN1TXZAlOHVPSHZAz");
        xhrUpcoming.setRequestHeader("Cache-Control", "no-cache");
        xhrUpcoming.send(dataUpcoming);
        console.log("Uploaded Images " + that.state.uploadedImages);

        //Get All Uploaded Images
        let imgUpcoming = null;
        let xhrimgUpcoming = new XMLHttpRequest();
        let thatimgUpcoming = this;
        xhrimgUpcoming.addEventListener("readystatechange", function () {
            if (this.readyState === 4) {
                thatimgUpcoming.setState({ allImages: JSON.parse(this.responseText).data });              
            }
        })

        xhrimgUpcoming.open("GET", "https://graph.instagram.com/me/media?fields=id,caption&access_token=IGQVJYWTVDNXgxUmRDb3ROcjMwN29IWTQ3Si1Vc3JJWDA3dUFLVDlPOVJodkFKNkdCTEtnNjBleFBJM0hTc2tmWmw3TkhSdU5JdXV3cjQwRTFyYlB4NWxqZADk3X3gyRXVSVlJaOXFZAczk4bVg1RFFMTDN1TXZAlOHVPSHZAz");
        xhrimgUpcoming.setRequestHeader("Cache-Control", "no-cache");
        xhrimgUpcoming.send(imgUpcoming);

    }

    

    userNameChangeHandler = event => {
        this.setState({ userName: event.target.value });

    }
    passwordChangeHandler = event => {
        this.setState({ password: event.target.value });

    }
    loginHandler = event => {
        sessionStorage.setItem('access-token', " ");
        console.log("session storage" + sessionStorage.getItem('access-token'));
        this.state.userName === "" ? this.setState({ userNameRequired: "dispBlock" }) : this.setState({ userNameRequired: "dispNone" });
        this.state.password === "" ? this.setState({ passwordRequired: "dispBlock" }) : this.setState({ passwordRequired: "dispNone" });
        if ((this.state.userName === this.state.reqUserName) && (this.state.password === this.state.reqPass)) {
            console.log("Valid");
            this.setState({ loginValidation: "dispNone" });
            this.setState({ loggedin: "true" });
            sessionStorage.setItem("accessToken","IGQVJXQ2MyZAUNiWnhPX3VMYmduSDVudjU0MmdlYkROYWtJVHdxeWdheWN0dGdybm1weDJmRnczNzd3WUkxNVhwb1lPSTFpZAVBCM202aEVpUFY0alBOdGZAqX2hVcjVLakNuY0ptVHFSa2NUMERfM0k2SFJkM0FjQ0J3QlpB")
            this.props.history.push('/home');
        }
        else if (this.state.userName !== "" && this.state.password !== "") {
            console.log("Invalid");
            this.setState({ loginValidation: "dispBlock" });
        }
        else {
            this.setState({ loginValidation: "dispNone" });
        }

    }
    render() {
        const { classes } = this.props;
        return (
            <div>
                <header className="header">
                    Image Viewer
                    
                </header>
                <div className="loginCard">
                    <Card id="card">
                        <CardContent>
                            <TabContainer>
                                <FormControl className={classes.formControl} id="loginText">
                                    LOGIN
                        </FormControl><br />
                                <FormControl className={classes.formControl} required>
                                    <InputLabel htmlFor="userName"> Username </InputLabel>
                                    <Input id="userName" onChange={this.userNameChangeHandler} />
                                    <FormHelperText className={this.state.userNameRequired}><span className="red">required</span></FormHelperText>
                                </FormControl><br />
                                <FormControl className={classes.formControl} required>
                                    <InputLabel htmlFor="password"> Password </InputLabel>
                                    <Input type="password" id="password" onChange={this.passwordChangeHandler} />
                                    <FormHelperText className={this.state.passwordRequired}><span className="red">required</span></FormHelperText>
                                </FormControl><br /><br />
                                <FormControl className={classes.button}>
                                    <FormHelperText className={this.state.loginValidation}><span className="red">Incorrect username and/or password</span></FormHelperText><br />
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