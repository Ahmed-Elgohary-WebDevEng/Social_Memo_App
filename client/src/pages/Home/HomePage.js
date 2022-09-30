import React, {useState} from 'react';
import {AppBar, Button, Container, Grid, Grow, Paper, TextField} from "@material-ui/core";
import Posts from "../../components/Posts/Posts";
import Form from "../../components/Form/Form";
import {useDispatch} from "react-redux";
import useStyles from "../../AppStyles";
import { getPostsBySearch} from "../../redux/features/post/thunks/postThunk";
import Paginate from "../../components/Pagination";
import {useLocation, useNavigate} from "react-router-dom";
import ChipInput from 'material-ui-chip-input';

function useQuery() {
   return new URLSearchParams(useLocation().search)
}

function HomePage(props) {
   const [currentId, setCurrentId] = useState(0);
   const dispatch = useDispatch()
   const classes = useStyles()
   const [search, setSearch] = useState('');
   const [tags, setTags] = useState([]);

   const query = useQuery()
   const navigate = useNavigate()
   const page = query.get('page') || 1
   const searchQuery = query.get('searchQuery')


   function handleKeyPress(event) {
      if (event.key === "Enter") {
         // Search for the post
         searchPost()
      }
   }

   function handleAdd(tag) {
      setTags([...tags, tag])
   }

   function handleDelete(tagToDelete) {
      setTags(tags.filter(tag => tag !== tagToDelete))
   }

   function searchPost() {
      if (search.trim() || tags) {
         // dispatch fetch search post
         dispatch(getPostsBySearch({search: search, tags: tags.join(',')}))
         // navigate user
         navigate(`/posts/search?searchQuery=${search || 'none'}&tags=${tags.join(',')}`)
      } else {
         navigate('/')
      }
   }

   return (
       <Grow in>
          <Container maxWidth="xl">
             <Grid className={classes.gridContainer} container justifyContent="space-between" alignItems="stretch" spacing={3}>
                <Grid item xs={12} sm={6} md={9}>
                   <Posts setCurrentId={setCurrentId}/>
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                   <AppBar className={classes.appBarSearch} position="static" color="inherit">
                      <TextField
                          name="search"
                          variant="outlined"
                          label="Search Memories"
                          onKeyPress={handleKeyPress}
                          fullWidth
                          value={search}
                          onChange={(event) => {
                             setSearch(event.target.value)
                          }}
                      />
                      <ChipInput
                          style={{margin: "10px 0"}}
                          value={tags}
                          onAdd={handleAdd}
                          onDelete={handleDelete}
                          label="Search Tags"
                          variant="outlined"
                      />
                      <Button className={classes.searchButton} onClick={searchPost} variant="contained" color="primary">Search</Button>
                   </AppBar>
                   <Form currentId={currentId} setCurrentId={setCurrentId}/>
                   {(!searchQuery && !tags.length) && (
                       <Paper className={classes.pagination} elevation={6}>
                          <Paginate page={page}/>
                       </Paper>
                   )}
                </Grid>
             </Grid>
          </Container>
       </Grow>
   )
       ;
}

export default HomePage;