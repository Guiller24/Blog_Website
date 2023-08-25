import React, { useRef } from 'react';
import { Button } from 'primereact/button';
import { Menu } from 'primereact/menu';
import { Toast } from 'primereact/toast';
import { BsThreeDots } from 'react-icons/bs';
import { useCustomNavigate } from "../navigation/CustomNavigate";
import postService from '../api/js-api/postService';
const PostMenu = ({ postId }) => {
    const menu = useRef(null);
    const toast = useRef(null);
    const { navToEditPost, navToHome } = useCustomNavigate();
    const items = [
        {
          label: 'Options',
          items: [
              {
                  label: 'Update',
                  icon: 'pi pi-refresh',
                  command: () => {
                    navToEditPost(postId);
                  }
              },
              {
                  label: 'Delete',
                  icon: 'pi pi-times',
                  command: () => {
                    postService.deletePostById(postId);
                    toast.current.show({
                      severity: 'success',
                      summary: 'Sucess',
                      detail: 'Post Deleted Successfully',
                      life: 3000
                    })
                    navToHome();
                  }
              }
          ]
        }
    ];

    return (
        <div className="card flex justify-content-center">
            <Toast ref={toast}></Toast>
            <Menu model={items} popup ref={menu} id="popup_menu_right" popupAlignment="right" />
            <Button label={<BsThreeDots />} rounded text severity="secondary" aria-label="Menu" onClick={(event) => menu.current.toggle(event)} aria-controls="popup_menu_right" aria-haspopup />
        </div>
    )
}

export default PostMenu;