import React, { useState } from 'react';
import SingleCommet from './SingleCommet';

function ReplyComment(props) {
    const [showReply, setShowReply] = useState(false)
    return (
        <>
            {props.commentList.filter(comment => comment.responseTo === props.parentCommentId).length > 0 && 
                <div style={{marginLeft: '44px'}} onClick={()=>setShowReply(!showReply)}>View {props.commentList.filter(comment => comment.responseTo === props.parentCommentId).length} more Comments</div>
            }
            {showReply && props.commentList.filter(comment => comment.responseTo === props.parentCommentId).map((comment, index) => 
                <div key={index} style={{marginLeft: '44px'}}>
                    <SingleCommet productId={props.productId} comment={comment} refreshComments={props.refreshComments} user={props.user} />
                    <ReplyComment commentList={props.commentList} parentCommentId={comment._id} refreshComments={props.refreshComments} user={props.user} />
                </div>
            )}
        </>
    );
}

export default ReplyComment;