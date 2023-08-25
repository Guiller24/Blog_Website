import React, { useState, useEffect } from 'react'
import postService from '../api/js-api/postService';
import { useParams } from 'react-router-dom';
import formatDate from '../utils/formatDate';
import PostMenu from '../common/PostMenu';
import jwtDecode from 'jwt-decode';
const PostViewPage = ({ isAuth }) => {
  const { postId } = useParams();
  const [ post, setPost ] = useState("");
  const formattedDate = formatDate(post.createdAt);
  useEffect(() => {
    const fetchPost = async () => {
      try{
        const response = await postService.getPostById(postId);
        setPost(response.data);
        console.log(post);
      }catch(err){
        console.error(err);
      }
    };
    fetchPost();
  }, []);
  const token = localStorage.getItem('token');
  const decodedToken = token ? jwtDecode(token) : null;
  const isCurrentUser = decodedToken && decodedToken.userId === post.userId;

  return (
    <div className='viewPostPage'>
      <div className='sidebar'>
        <h3>Writted By:</h3>
        <h2>{post.author}</h2>
        <p>{formattedDate}</p>
      </div>
      <div className='postContainer'>
        <div className='postHeader'>
          <h1>{post.title}</h1>
          <span className='spacer'></span>
          <span className='postMenu'>{isAuth && isCurrentUser && (<PostMenu postId={post.postId}/>)}</span>
        </div>
        
        <h3>{post.headline}</h3>
        <p>{post.post}</p>
      </div>
    </div>
  )
}

export default PostViewPage;