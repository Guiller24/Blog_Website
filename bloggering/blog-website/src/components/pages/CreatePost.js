import jwtDecode from 'jwt-decode';
import { Button } from 'primereact/button';
import { Card } from 'primereact/card';
import { Divider } from 'primereact/divider';
import { InputText } from 'primereact/inputtext';
import { InputTextarea } from 'primereact/inputtextarea';
import { Toast } from 'primereact/toast';
import React, { useEffect, useRef, useState } from 'react';
import postService from '../api/js-api/postService';
import { useCustomNavigate } from "../navigation/CustomNavigate";

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

      try{
        await postService.createPost(postInfo);
        toast.current.show({ severity: 'success', summary: 'Sucess', detail: 'Post Created Successfully', life: 3000 })
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
      <Toast ref={toast} />
      <Card className='cpContainer'>
      <div className='topComp'>
        <InputText className='cTitle' placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} required/>
        <InputText className='cHeadline' placeholder="Headline" value={headline} onChange={(e) => setHeadline(e.target.value)} required/>
        <Button label="Publish" onClick={createPost} className='publishButton'/>
      </div>
      <Divider />
        <div className="card flex justify-content-center postTextArea">
            <InputTextarea
              inputid="description" name="description"
              rows={4} cols={30}
              value={post}
              onChange={(e) => { setPost(e.target.value); }} required/>
        </div>  
      </Card>
    </div>
  )
}

export default CreatePost;