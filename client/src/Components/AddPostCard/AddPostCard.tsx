/* eslint-disable jsx-a11y/anchor-is-valid */
import * as React from 'react';
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
import { Button, Container, Divider } from '@mui/joy';
import FmdGoodIcon from '@mui/icons-material/FmdGood';
import TextareaAutosize from '@mui/base/TextareaAutosize';
import { BrowseGalleryOutlined } from '@mui/icons-material';

interface IProps{
    createLoading:boolean;
    createPostFormHandler:React.MouseEventHandler<HTMLAnchorElement>;
    setcontent:Function;
    content:string;
}
export default function AddPostCard({createLoading,createPostFormHandler,setcontent,content}:IProps) {
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
                <textarea value={content} onChange={(e:any)=>{setcontent(e?.target?.value)}} placeholder='What is on your mind?' style={{flexGrow:1, padding:"10px", border:'none', outline:'none', fontSize:'larg', fontWeight:'bold', margin:'20px'}} >

                </textarea>
            </Box>
            <Divider />
            <Box sx={{ display: 'flex', alignItems: 'center', my: 1 }}>
                <Box sx={{ display: 'flex', gap: 2, alignItems:'center', justifyContent:'space-between', flexGrow:1 }}>
                    <IconButton variant="plain" color="neutral" size="sm" sx={{ display: 'flex', alignItems: 'center', gap: 1, backgroundColor:'black', px:2, borderRadius:'30px', py:0.8 }} >
                        <BrowseGalleryOutlined sx={{color:"white"}} /><Typography fontWeight='lg' textColor="white" fontSize='sm' >Photo/Video</Typography>
                    </IconButton>
                    <Button loading={createLoading} onClick={createPostFormHandler}>Post It</Button>
                    {/* <IconButton variant="plain" color="neutral" size="sm" style={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                        <ModeCommentOutlined /> <Typography fontWeight='lg' fontSize='lg' >Comment</Typography>
                    </IconButton> */}
                </Box>
            </Box>
        </Card>
    );
}