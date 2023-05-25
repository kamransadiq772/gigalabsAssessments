import { Box } from '@mui/joy'
import axios from 'axios'
import * as React from 'react'
import { useState, useEffect } from 'react'
import AddPostCard from '../../Components/AddPostCard/AddPostCard'
import PostCard from '../../Components/PostCard/PostCard'

const Home = () => {
  const [content, setcontent] = useState("")
  const [posts, setposts] = useState([])
  const [createLoading, setcreateLoading] = useState(false)
  const createPostFormHandler = async (e: any) => {
    e.preventDefault()
    if (!content) {
      alert('Add Proper Post!');
      return;
    }
    try {
      setcreateLoading(true)
      const { data } = await axios.post(`${process.env.REACT_APP_BACKEND}/post`, { content }, {
        headers: {
          //@ts-ignore
          Authorization: `Bearer ${JSON.parse(localStorage.getItem('token'))}`
        }
      })
      console.log(data);
      setcontent("")
      await getPosts()
      setcreateLoading(false)
    } catch (error) {
      setcreateLoading(false)
      console.log(error);
    }
  }
  const getPosts = async () => {
    try {
      const { data } = await axios.get(`${process.env.REACT_APP_BACKEND}/post`, {
        headers: {
          //@ts-ignore
          Authorization: `Bearer ${JSON.parse(localStorage.getItem('token'))}`
        }
      })
      setposts(data?.data)
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getPosts()
  }, [])


  return (
    <Box display='flex' gap={3} flexDirection='column' >
      <AddPostCard createLoading={createLoading} createPostFormHandler={createPostFormHandler} setcontent={setcontent} content={content} />
      {
        posts && posts?.length>0 && posts?.map((post,index)=>{
          return <PostCard key={index} post={post} />
        })
      }
    </Box>
  )
}

export default Home;
