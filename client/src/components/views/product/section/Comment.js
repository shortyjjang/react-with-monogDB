import React, { useState } from 'react';
import axios from 'axios';
import {useSelector} from 'react-redux'
import SingleCommet from '../../../utils/SingleCommet';
import {Button, Input} from 'antd';
import ReplyComment from '../../../utils/ReplyComment';

const {TextArea} = Input;

function Comment(props) {
    const user = useSelector(state => state.user);
    const [commentVal, setCommentVal] = useState();
    const submitComment = (e) =>{
        e.preventDefault();

        let body = {
            content: commentVal,
            writer: user.userData._id,
            productId: props.productId
        }

        axios.post(`http://localhost:5000/api/comment/saveComment`, body)
        .then(res => {
            props.refreshComments(res.data.result)
            setCommentVal("")
        })
    }
    return (
        <div>
            <h2>댓글</h2>
            {props.commentList && 
            props.commentList.filter(comment => !comment.responseTo).map((comment, index) => 
            <div key={index}>
                <SingleCommet productId={props.productId} comment={comment} refreshComments={props.refreshComments}  user={user} />
                <ReplyComment commentList={props.commentList} refreshComments={props.refreshComments} parentCommentId={comment._id} user={user}/>
            </div>
            )
            }
            <hr />
            <form onSubmit={submitComment}>
                <TextArea rows={4} placeholder="Please input comment" onChange={(e) => setCommentVal(e.target.value)} value={commentVal} />
                <Button htmlType="submit" type="primary">Add Comment</Button>
            </form>
        </div>
    );
}

export default Comment;