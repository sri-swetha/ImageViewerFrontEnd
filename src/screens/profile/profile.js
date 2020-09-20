import React, { Component } from 'react';
import './profile.css';
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
import ProfileDetails from './ProfileDetails';
import {Box, Modal, Backdrop, Fade } from '@material-ui/core';
import PostHeader from '../../common/post/PostHeader';
import PostMedia from '../../common/post/PostMedia';
import PostCaption from '../../common/post/PostCaption';
import PostLikes from '../../common/post/PostLikes';
import PostComments from '../../common/post/PostComments';
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
    },


    imageContainer: {
        marginLeft: 0,
        paddingBottom: '1%',
        height: '100%',
        width: '100%'
    },
    header: {
        /*margin: 'auto',*/
        width: '100%',
        marginLeft: '0',
        paddingTop: '1%',
        paddingRight: '1%',
        paddingBottom: '1%'
    },
    textStrong: {
        fontWeight: 750
    },
    textLite: {
        fontWeight: 500
    }


})
class Profile extends Component {
    constructor(props) {
        super(props);
        this.state = {

            uploadedImages: [],
            allImages: [{}],
            like: 0,
            likedImages: [],
            commentGlobal: "",
            profileClick: 0,
            message: "",
            img:{}
        }
        this.value = true;
        this.imageDetailHandler = this.imageDetailHandler.bind(this);
        this.allImagesHandler = this.allImagesHandler.bind(this);
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

        xhrimgUpcoming.open("GET", "https://graph.instagram.com/me/media?fields=id,caption&access_token=IGQVJXeU1WWVBTUXF1bFYwT29adGxJaVhrMXcwaE4zZAndQQzVVcWp6TmNpOUVpUW1WS1ZAUNk9nU2FqTWRIdGpzaV9DS1RyTXNDQ3FFQXl5NUtYZAmVwUEVLa1lsVmhSYkowd0FtTDIweDQ0SHMwWE85YjJWeVM4dUxuRThz");
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
                    that.setState({message: that.state.uploadedImages[0].username});
                }
            })

            xhrUpcoming.open("GET", "https://graph.instagram.com/" + id + "?fields=id,media_type,media_url,username,timestamp&access_token=IGQVJXeU1WWVBTUXF1bFYwT29adGxJaVhrMXcwaE4zZAndQQzVVcWp6TmNpOUVpUW1WS1ZAUNk9nU2FqTWRIdGpzaV9DS1RyTXNDQ3FFQXl5NUtYZAmVwUEVLa1lsVmhSYkowd0FtTDIweDQ0SHMwWE85YjJWeVM4dUxuRThz");
            xhrUpcoming.setRequestHeader("Cache-Control", "no-cache");
            xhrUpcoming.send(dataUpcoming);
            console.log("Uploaded Images " + that.state.uploadedImages);
    
        }
    }

    allImagesHandler = (event) => {
        console.log("Message ",this.state.message);
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
        //console.log("username ",username);
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

    openImgDetails = (e) => {
        this.setState({ open: true, img: this.state.uploadedImages.find((img) => img.id === e.target.id) });
    }

    // Handler to close post modal
    closePostDetails = (e) => {
        this.setState({ open: false, img: {} });
    }



    render() {
        const { classes } = this.props;
        return (
            <div>
                <header className="header">
                    Image Viewer
                        <div className="profile">
                        <Avatar src="https://i.pinimg.com/564x/09/5d/31/095d317d5d2d0918aacebc4537199233.jpg"
                          />
                    </div>

                </header>

                {
                    (this.state.uploadedImages.length > 0) ?
                <div onLoad={this.allImagesHandler}>
               
                 <Box><ProfileDetails className="profile-detail" userName={this.state.message} numPosts={this.state.uploadedImages.length}
                            fullName="Sri Swetha" follows={Math.round(500 + Math.random() * 500)}
                            followers={Math.round(1000 + Math.random() * 1000)} />
                            < Box className="image-grid">
                                <GridList cellHeight={300} cols={3}>
                                    {this.state.uploadedImages.map((img) => (
                                        <GridListTile key={img.id} >
                                            <img id={img.id} src={img.media_url} alt={img.id} onClick={this.openImgDetails} />
                                        </GridListTile>
                                    ))}
                                </GridList>
                            </Box>
                

                            <Modal className="modal" open={this.state.open}
                                onClose={this.closePostDetails} closeAfterTransition BackdropComponent={Backdrop}>
                                <Fade in={this.state.open}>
                                    <Box width="60%" display="flex" flexDirection="row" justifyContent="space-evenly" className="modal-content">
                                        <Box m="1%" width="50%" className="image-container" >
                                            {(this.state.img.media_url) ? <PostMedia media={this.state.img.media_url} mediaId={this.state.img.id} minWidth="350px" minHeight="350px" /> : ""}
                                        </Box>
                                        <Box m="2%" width="50%" display="flex" flexDirection="column" justifyContent="left" alignItems="center">
                                            <PostHeader postUser={this.state.img.username} postedTime={this.state.img.timestamp} />
                                            <PostCaption mb="auto" caption={this.state.img.caption} hashtags={this.state.img.hashtags} />
                                            <Box mt="auto" width="100%">
                                                <PostComments postUser={this.state.img.username} >
                                                    <PostLikes likes={this.state.img.like} />
                                                </PostComments>
                                            </Box>
                                        </Box>
                                    </Box>
                                </Fade>
                            </Modal>
                    </Box>

                    </div> : ""
                }






                {/* <div onLoad={this.allImagesHandler} className={classes.root1} id="cardDiv" >

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
                </div> */}


            </div>
        )
    }
}
export default withStyles(styles)(Profile);