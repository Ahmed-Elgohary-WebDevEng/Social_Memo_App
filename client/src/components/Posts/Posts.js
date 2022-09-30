import React, {useEffect} from 'react';

import useStyles from "./PostsStyles"
import {useDispatch, useSelector} from "react-redux";
import {CircularProgress, Grid} from "@material-ui/core";
import Post from "./Post/Post";
import {getPosts} from "../../redux/features/post/thunks/postThunk";

function Posts({setCurrentId}) {
   const {posts, loading} = useSelector((state) => state.post)
   const classes = useStyles()
   const dispatch = useDispatch()
   // console.log(posts)
   // console.log(typeof posts)

   if (!posts?.length && !loading) {
      return "No posts"
   }

   //  *******************  JSX Code ********************
   return (
       loading ? <CircularProgress/> : (
           <Grid className={classes.mainContainer} container alignItems="stretch" spacing={3}>
              {
                 posts?.map((post) => (
                     <Grid key={post._id} item xs={12} sm={12} md={6} lg={3}>
                        <Post post={post} setCurrentId={setCurrentId}/>
                     </Grid>
                 ))
              }
           </Grid>
       )
   );
}

export default Posts;