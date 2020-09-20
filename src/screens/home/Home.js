import React, { Component } from 'react';
import './Home.css';
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
import { TextField } from '@material-ui/core';
import FavoriteIcon from '@material-ui/icons/Favorite';
import { RichText, Date } from 'prismic-reactjs';
import moment from 'moment';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import PostLikes from '../../common/post/PostLikes';

const styles = theme => ({

    inputRoot: {
        color: 'inherit',
    },
    root: {
        flexGrow: 1,
    },
    searchIcon: {
        padding: theme.spacing(0, 1),
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'black',
        size: 'large'
    },
    search: {
        position: 'relative',
        borderRadius: '4px',
        backgroundColor: '#c0c0c0',
        marginLeft: 0,
        [theme.breakpoints.up('sm')]: {
            marginLeft: theme.spacing(1),
            width: '300px',
        },
        float: 'right'
    },
    inputBase: {
        padding: theme.spacing(0, 5),
    },
    media: {
        height: 0,
        paddingTop: '56.25%', // 16:9
    },
    commentwidth: {
        width: '25ch'
    },
    favIcon: {
        color: 'red'
    },
    root1: {
        display: 'flex',
        flexWrap: 'wrap',
        overflow: 'hidden',
    },
    gridList: {
        width: "35%",
        height: "40%",
        transform: 'translateZ(0)',
        padding: "15px"
    }
})
class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {

            uploadedImages: [],
            allImages: [{}],
            like: 0,
            likedImages: [],
            commentGlobal: "",
            profileClick: 0,
            message: "Enterd to Profile"
        }
        this.value = true;
        this.imageDetailHandler = this.imageDetailHandler.bind(this);
    }


    componentWillMount() {

        console.log("Image State " + this.state.allImages);
        //Get All Uploaded Images
        let imgUpcoming = null;
        let xhrimgUpcoming = new XMLHttpRequest();
        let thatimgUpcoming = this;
        xhrimgUpcoming.addEventListener("readystatechange", function () {
            if (this.readyState === 4) {
                thatimgUpcoming.setState({ allImages: JSON.parse(this.responseText).data });
            }
        })

        xhrimgUpcoming.open("GET", "https://graph.instagram.com/me/media?fields=id,caption&access_token=IGQVJWVm5kSEh4N0tDYlFtREZAoQVo5d3ZAPOGdwRWx5NjZAMVllucU9XMVFWTU40a19SeHVmbnZARZA3V5RzlpWWpCLW1Bc3dLb2l3TDdHSENsNGNkZAjhpUnoxQVVlQmRvLUtSWG9JLWgwQ0FrcllJMW9UOTJTaEJoTlE3WDhN");
        xhrimgUpcoming.setRequestHeader("Cache-Control", "no-cache");
        xhrimgUpcoming.send(imgUpcoming);
    }


    componentDidMount() {

        this.imageDetailHandler();
        setTimeout(this.imageDetailHandler, 5000);

    }
    imageDetailHandler = () => {

        console.log("Images ", this.state.allImages);
        for (var i = 0; i < this.state.allImages.length; i++) {
            console.log("Id For ", this.state.allImages[i].id);
            let dataUpcoming = null;
            let xhrUpcoming = new XMLHttpRequest();
            let that = this;
            let id = this.state.allImages[i].id;
            xhrUpcoming.addEventListener("readystatechange", function () {
                if (this.readyState === 4) {
                    that.setState({ uploadedImages: that.state.uploadedImages.concat(JSON.parse(this.responseText)) });
                }
            })

            xhrUpcoming.open("GET", "https://graph.instagram.com/" + id + "?fields=id,media_type,media_url,username,timestamp&access_token=IGQVJWVm5kSEh4N0tDYlFtREZAoQVo5d3ZAPOGdwRWx5NjZAMVllucU9XMVFWTU40a19SeHVmbnZARZA3V5RzlpWWpCLW1Bc3dLb2l3TDdHSENsNGNkZAjhpUnoxQVVlQmRvLUtSWG9JLWgwQ0FrcllJMW9UOTJTaEJoTlE3WDhN");
            xhrUpcoming.setRequestHeader("Cache-Control", "no-cache");
            xhrUpcoming.send(dataUpcoming);
            console.log("Uploaded Images " + that.state.uploadedImages);
        }
    }

    allImagesHandler = (event) => {
        console.log("All Img Details ", this.state.uploadedImages);

        let i = 0;
        let caption = "";
        let index = "";
        let like = 0;
        let data = this.state.uploadedImages.map((e, i) => {
            e.like = like;
            i = this.state.allImages.findIndex((c) => (
                c.id === e.id
            ));
            // console.log("i ",i);
            caption = this.state.allImages[i].caption;
            index = caption.indexOf("#");
            e.caption = caption.substr(0, index);
            e.hashtags = caption.substr(index).replaceAll("#", " #").replace(" #", "#");
            e.comment = "";
            return e;
        });
        this.setState({ uploadedImages: data });
        //console.log("data ",this.state.uploadedImages[0].caption);
    }

    likeHandler = (img) => {
        let index = this.state.uploadedImages.findIndex((c) => (
            c.id === img.id
        ));
        let newArray = [...this.state.uploadedImages];
        newArray[index] = { ...newArray[index], like: newArray[index].like + 1 };
        this.setState({ uploadedImages: newArray, })
        /*         console.log("Image Obj ",img);
                console.log("LikeImages ",this.state.likedImages);
                let imgLike= this.state.likedImages[index].like;
                let data = this.state.likedImages.filter((img) => {
                    index=this.state.likedImages.findIndex((c) => (
                        c.id === img.id
                    ));
                    imgLike= this.state.likedImages[index].like;
                    imgLike+=1;
                    img.like=imgLike;
                    return imgLike;
                }); 
                this.setState({likedImages : data}); */
        /*         console.log("Like ", this.state.likedImages); 
                let currImg=this.state.likedImages[index];
                this.setState({uploadedImages: this.state.likedImages}); */
    }

    onCommentChangeHandler = event => {
        console.log("Event ", event.target.value);
        this.setState({ commentGlobal: event.target.value });
        console.log("On Change " + this.state.commentGlobal);
    }

    commentHandler = (img) => {
        let addComment = this.state.commentGlobal;
        let index = this.state.uploadedImages.findIndex((c) => (
            c.id === img.id
        ));
        let newArray = [...this.state.uploadedImages];
        newArray[index] = { ...newArray[index], comment: newArray[index].comment + addComment };
        this.setState({ uploadedImages: newArray, })
        this.setState({ commentGlobal: "", });
        console.log("Comment Global ", this.state.commentGlobal);
        console.log("Comments ", this.state.uploadedImages);
    }
    profileClickHandler = ()=>{
        this.state.profileClick=1;
        this.props.history.push("/profile");
    }


    render() {
        const { classes } = this.props;
        return (
            <div>
                <header className="header">
                    Image Viewer
                        <div className="profile">
                        <Avatar src="https://i.pinimg.com/564x/09/5d/31/095d317d5d2d0918aacebc4537199233.jpg"
                         onClick={this.profileClickHandler} />
                    </div>
                    <div className={classes.search} >
                        <div className={classes.searchIcon}>

                            <SearchIcon />
                        </div>
                        <InputBase className={classes.inputBase}
                            placeholder="Search…"
                            classes={{
                                root: classes.inputRoot,
                                input: classes.inputInput,
                            }}
                            inputProps={{ 'aria-label': 'search' }}
                        />
                    </div>
                </header>
                {/*                 <div>
                    <Button onClick={this.allImagesHandler}>Click Me</Button>
                </div> */}

                <div onLoad={this.allImagesHandler} className={classes.root1} id="cardDiv" >

                    {this.state.uploadedImages.map(img => (
                        <GridList cellHeight={500} className={classes.gridList}>
                            <GridListTile key={img.id} cols={2} >
                                <Card key={img.id} variant="outlined">
                                    <CardHeader
                                        avatar={
                                            <Avatar src="https://i.pinimg.com/564x/09/5d/31/095d317d5d2d0918aacebc4537199233.jpg" />

                                        }

                                        title={img.username}
                                        subheader={moment(Date(img.timestamp)).format('L HH:mm:ss')}

                                    />
                                    <CardContent>
                                        <CardMedia
                                            className={classes.media}
                                            image={img.media_url}
                                            title={img.caption}
                                        />
                                        <Typography variant="body2" color="textPrimary" component="h1">
                                            {img.caption}
                                        </Typography>
                                        <Typography variant="body2" color="primary" component="h2">
                                            {img.hashtags}
                                        </Typography>
                                    </CardContent>
                                    <CardActions disableSpacing>
                                        {
                                            img.like > 0 ?
                                                <div>
                                                    <IconButton aria-label="add to favorites" onClick={() => this.likeHandler(img)}><FavoriteIcon className={classes.favIcon} /></IconButton>
                                                    <span> {img.like} Likes </span> </div> :
                                                <div>
                                                    <IconButton aria-label="add to favorites" onClick={() => this.likeHandler(img)}><FavoriteBorderIcon /></IconButton>
                                                </div>
                                        }
                                    </CardActions>
                                    <CardContent>
                                        {
                                            img.comment !== "" ?

                                                <Typography variant="body2" color="textPrimary" component="h2" id="addcomment">
                                                    <span id="username">{img.username} </span>:{img.comment}
                                                </Typography> : img.comment

                                        }
                                        {
                                            this.state.commentGlobal === "" ?
                                                <TextField onChange={this.onCommentChangeHandler} className={classes.commentwidth} label="Add a Comment" placeholder="Add a Comment" value={this.state.commentGlobal} multiline />
                                                :
                                                <TextField onChange={this.onCommentChangeHandler} className={classes.commentwidth} label="Add a Comment" placeholder="Add a Comment" multiline />

                                        }
                                        <Button id="addbtn" onClick={() => this.commentHandler(img)} variant="contained" color="primary" >ADD</Button>
                                    </CardContent>
                                </Card>
                            </GridListTile>
                        </GridList>
                    ))}
                </div>

            </div>
        )
    }
}
export default withStyles(styles)(Home);