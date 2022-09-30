import React from 'react';

import useStyles from "./PostStyles"
import {Button, Card, CardActions, CardMedia, CardContent, Typography, ButtonBase} from "@material-ui/core";
import moment from "moment";
import {Delete, MoreHoriz, ThumbUpAlt, ThumbUpAltOutlined} from "@material-ui/icons";
import {useDispatch} from "react-redux";
import {deletePost, likePost} from "../../../redux/features/post/thunks/postThunk";
import {useNavigate} from "react-router-dom";

function Post({post, setCurrentId}) {
   const dispatch = useDispatch()
   const classes = useStyles()
   const user = JSON.parse(localStorage.getItem('profile'))
   const navigate = useNavigate()

   const Likes = () => {
      if (post.likes.length > 0) {
         return post.likes.find((like) => like === (user?.result?.googleId || user?.result?._id))
             ? (
                 <>
                    <ThumbUpAlt fontSize="small"/>&nbsp;{post.likes.length > 2 ? `You and ${post.likes.length - 1} others` : `${post.likes.length} like${post.likes.length > 1 ? 's' : ''}`}
                 </>
             ) : (
                 <>
                    <ThumbUpAltOutlined fontSize="small"/>&nbsp;{post.likes.length} {post.likes.length === 1 ? 'Like' : 'Likes'}
                 </>
             );
      }
   }

   function openPost() {
      navigate(`/posts/${post._id}`)
   }

   //  *******************  JSX Code ********************
   return (
       <Card className={classes.card} raised elevation={6}>
          <ButtonBase
              className={classes.cardAction}
              onClick={openPost}
          >
             <CardMedia className={classes.media} image={post.selectedFile} title={post.title}/>
             <div className={classes.overlay}>
                <Typography variant="h6">{post.name}</Typography>
                <Typography variant="body2">{moment(post.createdAt).format()}</Typography>
             </div>
             <div className={classes.overlay2}>
                {(user?.result?.googleId === post?.creator || user?.result?._id === post?.creator) && (
                    <Button
                        style={{color: "white"}}
                        size="small"
                        onClick={() => {
                           setCurrentId(post._id)
                        }}
                    >
                       <MoreHoriz fontSize="medium"/>
                    </Button>
                )}
             </div>
             <div className={classes.details}>
                <Typography variant="body2" color="textSecondary">{post.tags.map(tag => `#${tag} `)}</Typography>
             </div>
             <Typography className={classes.title} variant="h5" color="textSecondary" gutterBottom>{post.title}</Typography>
             <CardContent>
                <Typography variant="body2" color="textSecondary" component="p">{post.message}</Typography>
             </CardContent>
          </ButtonBase>
          <CardActions className={classes.cardActions}>
             <Button size="small" color="primary" disabled={!user?.result} onClick={() => {
                dispatch(likePost(post._id))
             }}>
                <Likes/>
             </Button>
             {(user?.result?.googleId === post?.creator || user?.result?._id === post?.creator) && (
                 <Button size="small" color="primary" onClick={() => {
                    dispatch(deletePost(post._id))
                 }}>
                    <Delete fontSize="small"/>
                    Delete
                 </Button>
             )}

          </CardActions>
       </Card>
   );
}

export default Post;