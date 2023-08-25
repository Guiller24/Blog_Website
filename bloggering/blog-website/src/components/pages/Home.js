import React, { useEffect, useState } from 'react';
import postService from '../api/js-api/postService';
import formatDate from '../utils/formatDate';
import Header from '../common/Header';
import jwtDecode from 'jwt-decode';
import { Card } from 'primereact/card';
import { Divider } from 'primereact/divider';
import { Button } from 'primereact/button';
import { useCustomNavigate } from '../navigation/CustomNavigate';

function Home({ isAuth }) {
  const [ postList, setPostList ] = useState([]);
  const { navToViewPost } = useCustomNavigate();

  const fetchPost = async () => {
    try{
      const response = await postService.retrievePosts();
      setPostList(response.data.reverse());
    }catch(err){
      console.error(err);
    }
  };

  const viewPage = (postId) =>{
    navToViewPost(postId);
  }
  useEffect(() => {
    document.title = "Homepage";
    fetchPost();
  }, []);
  
  return (
    
    <div className="homepage">
      <Header/>
      <div className='cardContainer'>
        {postList.map((post) => {
          
          
          return (
            <Card key={post.postId}
                  title={<>{post.title}<Divider className='divMargin'/></>}
                  subTitle={post.headline}
                  className="postCard">
            <div className='cardFooter'>
              <Button label="See Post"
                      severity="secondary"
                      icon="pi pi-arrow-right"
                      iconPos="right"
                      text onClick={() =>viewPage(post.postId)}/> 
            </div>
            </Card>
          );
        })}
        </div>
    </div>
  )
}


export default Home