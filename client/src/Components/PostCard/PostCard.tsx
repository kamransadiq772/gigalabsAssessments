/* eslint-disable jsx-a11y/anchor-is-valid */
import * as React from 'react';
import { useState } from 'react';
import AspectRatio from '@mui/joy/AspectRatio';
import Avatar from '@mui/joy/Avatar';
import Box from '@mui/joy/Box';
import Card from '@mui/joy/Card';
import CardOverflow from '@mui/joy/CardOverflow';
import Link from '@mui/joy/Link';
import IconButton from '@mui/joy/IconButton';
import Input from '@mui/joy/Input';
import Typography from '@mui/joy/Typography';
import MoreHoriz from '@mui/icons-material/MoreHoriz';
import FavoriteBorder from '@mui/icons-material/FavoriteBorder';
import ModeCommentOutlined from '@mui/icons-material/ModeCommentOutlined';
import SendOutlined from '@mui/icons-material/SendOutlined';
import Face from '@mui/icons-material/Face';
import BookmarkBorderRoundedIcon from '@mui/icons-material/BookmarkBorderRounded';
import { Container, Divider } from '@mui/joy';
import FmdGoodIcon from '@mui/icons-material/FmdGood';
import axios from 'axios';
import FavoriteIcon from '@mui/icons-material/Favorite';

interface IProps {
    post: any
}
export default function PostCard({ post }: IProps) {
     //@ts-ignore
     const user = JSON.parse(localStorage.getItem('user'))
     const userId = user?.data?._id
     const liked = post?.likedBy?.some((i:any)=>i===userId)
    const [showComment, setshowComment] = useState<boolean>(false)
    const [likedCount, setlikedCount] = useState(post?.likedBy?.length ?? 0)
    const [loading, setloading] = useState(false)
    const [comment, setcomment] = useState([])
    const [myComment, setmyComment] = useState("")
    const [likedPost, setlikedPost] = useState(post?.likedBy?.some((i:any)=>i===userId))

    const getComments = async () => {
        try {
            setloading(true)
            const { data } = await axios.get(`${process.env.REACT_APP_BACKEND}/comment/${post?._id}`, {
                headers: {
                    //@ts-ignore
                    Authorization: `Bearer ${JSON.parse(localStorage.getItem('token'))}`
                }
            })
            console.log(data?.data);

            setcomment(data?.data)
            setloading(false)
        } catch (error) {
            setloading(false)
            console.log(error);
        }
    }

    const createComments = async (e: any) => {
        e.preventDefault()
        try {
            setloading(true)
            const { data } = await axios.post(`${process.env.REACT_APP_BACKEND}/comment`, { content: myComment, post: post?._id }, {
                headers: {
                    //@ts-ignore
                    Authorization: `Bearer ${JSON.parse(localStorage.getItem('token'))}`
                }
            })
            console.log(data?.data);

            getComments()
            setcomment(data?.data)
            setloading(false)
        } catch (error) {
            setloading(false)
            console.log(error);
        }
    }

   

    //@ts-ignore
    const likeDislikePost = async() => {
        try {
            if(!likedPost){
                setlikedCount((ps:any)=>ps+1);
                const { data } = await axios.put(`${process.env.REACT_APP_BACKEND}/post/like/${post?._id}`, null, {
                    headers: {
                        //@ts-ignore
                        Authorization: `Bearer ${JSON.parse(localStorage.getItem('token'))}`
                    }
                })
            }else{
                setlikedCount((ps:any)=>ps-1);
                const { data } = await axios.put(`${process.env.REACT_APP_BACKEND}/post/unlike/${post?._id}`, null, {
                    headers: {
                        //@ts-ignore
                        Authorization: `Bearer ${JSON.parse(localStorage.getItem('token'))}`
                    }
                })
            }
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <Card
            variant="outlined"
            sx={{
                minWidth: 300,
                '--Card-radius': (theme) => theme.vars.radius.xs,
            }}
        >
            <Box sx={{ display: 'flex', alignItems: 'center', pb: 1.5, gap: 1 }}>
                <Box
                    sx={{
                        position: 'relative',
                        '&:before': {
                            content: '""',
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            bottom: 0,
                            right: 0,
                            m: '-2px',
                            borderRadius: '50%',
                            background:
                                'linear-gradient(45deg, #f09433 0%,#e6683c 25%,#dc2743 50%,#cc2366 75%,#bc1888 100%)',
                        },
                    }}
                >
                    <Avatar
                        size="sm"
                        src="/static/logo.png"
                        sx={{ p: 0.5, border: '2px solid', borderColor: 'background.body' }}
                    />
                </Box>
                <Box pl={1} >
                    <Typography fontWeight="lg" fontSize='sm' >{post?.user?.userName}</Typography>
                    <Box display='flex' alignItems='center'  ><FmdGoodIcon sx={{ fontSize: "20px", marginRight: "5px", color: 'blueviolet' }} /><Typography fontWeight="lg" sx={{ color: 'blueviolet' }} fontSize='sm'>OH, US</Typography></Box>
                    <Typography fontWeight="sm" fontSize='sm'>{((new Date().getTime()-new Date(post?.createdAt).getTime())/60000).toFixed()} minute ago</Typography>
                </Box>
                <IconButton variant="plain" color="neutral" size="sm" sx={{ ml: 'auto' }}>
                    <MoreHoriz />
                </IconButton>
            </Box>
            <CardOverflow>

                <Typography fontWeight='lg' textColor='text.secondary' >
                    {post?.content}
                </Typography>

            </CardOverflow>
            <Box py={2} sx={{ display: 'flex', gap: 1, alignItems: 'center' }}  >
                <Link
                    component="button"
                    underline="none"
                    fontSize="sm"
                    fontWeight="lg"
                    textColor="text.tertiary"
                >
                    {likedCount} Likes
                </Link>
                <Typography fontWeight='xl' >.</Typography>
                <Link
                    component="button"
                    underline="none"
                    fontSize="sm"
                    fontWeight="lg"
                    textColor='text.secondary'
                >
                    0 Comments
                </Link>
            </Box>
            <Divider />
            <Box sx={{ display: 'flex', alignItems: 'center', my: 1 }}>
                <Box sx={{ display: 'flex', gap: 2 }}>
                    <IconButton onClick={()=>{setlikedPost(!likedPost);likeDislikePost();}} variant="plain" color="neutral" size="sm" style={{ display: 'flex', alignItems: 'center', gap: 2 }} >
                       {(likedPost===true) ? <FavoriteIcon />:<FavoriteBorder />}<Typography fontWeight='lg' fontSize='lg' >Like</Typography>
                    </IconButton>
                    <IconButton onClick={() => { setshowComment(!showComment);getComments() }} variant="plain" color="neutral" size="sm" style={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                        <ModeCommentOutlined /> <Typography fontWeight='lg' fontSize='lg' >Comment</Typography>
                    </IconButton>
                </Box>
            </Box>
            {(showComment && loading) ? <div>Loading...</div> : (showComment && !loading) ?
                <>
                    <Box sx={{ display: 'flex', alignItems: 'center', my: 1, gap: 2 }}>
                        <Avatar size="sm"
                            src="/static/logo.png"
                            sx={{ p: 0.5, border: '2px solid', borderColor: 'background.body' }}
                        />
                        <Box sx={{ flexGrow: 1 }} component='form' onSubmit={createComments} >
                            <Input
                                onChange={(e: any) => { setmyComment(e?.target?.value) }}
                                variant="plain"
                                size="sm"
                                placeholder="Add a comment…"
                                sx={{ flexGrow: 1, mr: 1, border: '2px solid lightGray', padding: "15px", borderRadius: '30px' }}
                            />
                        </Box>
                    </Box>

                    {comment && comment?.length > 0 &&
                        comment?.map((com:any, ind:number) => {
                            return <Box key={ind} sx={{ display: 'flex', alignItems: 'center', my: 1, gap: 2 }}>
                                <Avatar size="sm"
                                    src="/static/logo.png"
                                    sx={{ p: 0.5, border: '2px solid', borderColor: 'background.body' }}
                                />
                                <Box sx={{ flexGrow: 1, mr: 1, padding: "20px", borderRadius: '10px', backgroundColor: "#ced9da" }}>
                                    <Box display='flex' alignItems='center' justifyContent='space-between' >
                                        <Typography fontWeight='lg' >{com?.user?.userName}</Typography>
                                        <Typography fontWeight='sm' fontSize='sm'>{((new Date().getTime()-new Date(com?.createdAt).getTime())/60000).toFixed()} minute ago</Typography>
                                    </Box>
                                    <Typography fontWeight='lg' fontSize='sm' sx={{ color: 'blueviolet' }} >Professional-Student</Typography>
                                    <Typography fontWeight='lg' fontSize='sm' textColor='text.secondary' >{com?.content}</Typography>
                                    <Box sx={{ flexGrow: 1, mr: 1, padding: "20px", borderRadius: '10px', display: 'flex', gap: 2, alignItems: 'center' }}>
                                        <Typography>0 Likes</Typography>
                                        <Typography>|</Typography>
                                        <Box display='flex' alignItems='center'  ><FavoriteBorder sx={{ fontSize: "20px", marginRight: "5px" }} /><Typography fontWeight="lg" sx={{}} fontSize='sm'>Like</Typography></Box>
                                    </Box>
                                </Box>
                            </Box>
                        })
                    }
                </> : <></>}
        </Card>
    );
}