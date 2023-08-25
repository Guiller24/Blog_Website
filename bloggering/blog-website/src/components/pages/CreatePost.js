import React, { useEffect, useState, useRef } from 'react';
import { useCustomNavigate } from "../navigation/CustomNavigate";
import postService from '../api/js-api/postService';
import jwtDecode from 'jwt-decode';
import { Toast } from 'primereact/toast';
import { Card } from 'primereact/card';
import { Divider } from 'primereact/divider';
import { InputText } from 'primereact/inputtext';
import { InputTextarea } from 'primereact/inputtextarea';
import { Button } from 'primereact/button';
const CreatePost = ({ isAuth }) => {
  const [ title, setTitle ] = useState("");
  const [ post, setPost ] = useState("");
  const [ headline, setHeadline ] = useState("");
  const { navToHome, navToLogin } = useCustomNavigate();
  const toast = useRef(null);
  const createPost = async (event) => {
    event.preventDefault();
    const decodedToken = jwtDecode(localStorage.getItem("token"));
    console.log(decodedToken);
    const postInfo = {
        userId: decodedToken.userId,
        title, 
        headline,
        post,
        author: `${decodedToken.firstName} ${decodedToken.lastName}`,
    };
    

    console.log(postInfo);
      try{
        await postService.createPost(postInfo);
        <Toast ref={
          toast.current.show({ severity: 'success', summary: 'Sucess', detail: 'Post Created Successfully', life: 3000 })
        } />
        setTitle("");
        setHeadline("");
        setPost("");

        navToHome();
      }catch(err){
        console.error(err)
      }
  }

  useEffect(() => {
    document.title = "Create a post";
    if(!isAuth){
      navToLogin();
    }
  }, []);

  return (
    <div className="createPostPage">
      <Card className='cpContainer'>
      <div className='topComp'>
        <InputText className='cTitle' placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} />
        <Button label="Publish" onClick={createPost} />
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

export default CreatePost;