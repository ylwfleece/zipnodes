import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, Link, useHistory } from "react-router-dom";

function MainFeed() {
    const dispatch = useDispatch()
    const user = useSelector((state) => state.session.user)
    const orders = useSelector((state) => state.orders)
    const applications = useSelector((state) => state.applications)
    const reivews = useSelector((state) => state.reivews)

    const applications_display = [];
    if (applications) {
        applications_display = applications.filter(app => app.node_id === user.id);
    }

    if (posts && comments) {
        commentsArr = posts.map((post) => {
            let unfiltered = comments.filter(comment => comment.postId == post.id)
            return unfiltered.slice(0, 3)
        })
    }

    return (<>
        {orders &&
            <div className='homepage'>
                <div className='page-container homepage-container'>
                    <div className='homepage-feed'>
                        {orders.map((order) =>
                            <div key={order.id} className='container posts' style={{ paddingTop: '0', marginBottom: '5vh' }}>
                                <div className='post-user-info'>
                                    <div className='rounded-img-container comments-profile-pictures' style={{ alignSelf: 'flex-start' }}>
                                    </div>
                                    <div className='username-comments-container'>
                                    </div>
                                </div>
                                <div className='post-image-container'>
            
                                </div>
                                <div className='flex-left-container' style={{ width: '100%', height: '40px' }}>
                                    <div className='icons-container'>
                                    
                                    </div>
                                </div>
                                <div className='caption-section'>
                                    <div className='username-comments-container'>
                                       
                                    </div>
                                    <div className='post-caption-container'>
                                        <p className='normalize-text caption'></p>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        }
    </>)
}

export default MainFeed
