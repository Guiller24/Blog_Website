import React, { useEffect, useState } from 'react';
import postService from '../api/js-api/postService';
import { useCustomNavigate } from '../navigation/CustomNavigate';
import { Header } from '../common/Header';

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
      <div className="header-container">
      <Header />
      </div>
      <div className='cardContainer'>
        {postList.map((post) => {
          return (
            <div class="card" key={post.postId}>
              <div class="image"></div>
                <div class="content">
                  <span class="title">{post.title}</span>
                  <p class="headline">{post.headline}</p>
                  <div className="bottom">
                  <a class="action" onClick={() => viewPage(post.postId)}>
                    Find out more
                    <span aria-hidden="true">  →</span>
                  </a>
                  </div>
                </div>
              </div>
          );
        })}
        </div>
    </div>
  )
}


export default Home