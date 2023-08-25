import { useNavigate } from "react-router-dom";

export function useCustomNavigate(){
    const navigate = useNavigate();

    const navToHome = () =>{
        navigate("/");
    }

    const navToLogin = () =>{
        navigate("/login");
    }

    const navToCreatePost = () =>{
        navigate("/createpost");
    }
    const navToCreateAccount = () =>{
        navigate("/createaccount");
    }

    const navToViewPost  = (postId) =>{
        navigate(`/viewPost/${ postId }`, );
    }

    const navToEditPost = (postId) =>{
        navigate(`/editPost/${ postId }`, );
    }

    return {
        navToHome,
        navToLogin,
        navToCreatePost,
        navToCreateAccount,
        navToViewPost,
        navToEditPost
    };
}
   
  
    





