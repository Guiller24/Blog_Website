import React, { useEffect, useState, useRef } from 'react';
import { useCustomNavigate } from "../navigation/CustomNavigate";
import { useParams } from 'react-router-dom';
import postService from '../api/js-api/postService';
import jwtDecode from 'jwt-decode';
import { Toast } from 'primereact/toast';
import { Card } from 'primereact/card';
import { Divider } from 'primereact/divider';
import { InputText } from 'primereact/inputtext';
import { InputTextarea } from 'primereact/inputtextarea';
import { Button } from 'primereact/button';
const EditPost = ({ isAuth }) => {
  const { postId } = useParams();
  const [ title, setTitle ] = useState("");
  const [ post, setPost ] = useState("");
  const [ headline, setHeadline ] = useState("");
  const { navToHome, navToLogin } = useCustomNavigate();
  const toast = useRef(null);
  
  const editPost = async (event) => {
    event.preventDefault();
    const decodedToken = jwtDecode(localStorage.getItem("token"));
    const postInfo = {
        userId: decodedToken.userId,
        title, 
        headline,
        post,
        author: `${decodedToken.firstName} ${decodedToken.lastName}`,
    };
    

    console.log(postInfo);
      try{
        await postService.updatePost(postId, postInfo);
        toast.current.show({ severity: 'success', summary: 'Sucess', detail: 'Post Editted Successfully', life: 3000 })
        setTitle("");
        setHeadline("");
        setPost("");
        navToHome();
      }catch(err){
        console.error(err)
      }
  }
  const fetchPost = async () => {
    try {
      const response = await postService.getPostById(postId);
      const postData = response.data;
      setTitle(postData.title);
      setHeadline(postData.headline);
      setPost(postData.post);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    document.title = "Edit Post";
    if(!isAuth){
      navToLogin();
    }else{
      fetchPost();
    }
  }, [isAuth]);

  return (
    <div className="createPostPage">
      <Toast ref={toast} position='top-right' />
      <Card className='cpContainer'>
      <div className='topComp'>
        <InputText className='cTitle' placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} />
        <Button label="Publish" onClick={editPost} />
        <InputText className='cHeadline' placeholder="Headline" value={headline} onChange={(e) => setHeadline(e.target.value)} />
      </div>
      <Divider />
        <div className="card flex justify-content-center">
            
            <InputTextarea
              inputid="description" name="description"
              rows={4} cols={30}
              value={post}
              onChange={(e) => { setPost(e.target.value); }}/>
        </div>  
      </Card>
      
    </div>
  )
}

export default EditPost;