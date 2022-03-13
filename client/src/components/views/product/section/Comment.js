import React, { useState } from 'react';
import axios from 'axios';
import {useSelector} from 'react-redux'
import SingleCommet from '../../../utils/SingleCommet';
import {Button, Input} from 'antd';

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
            console.log( res.data)
        })
    }
    return (
        <div>
            <h2>댓글</h2>
            {props.commentList && props.commentList.map((comment, index) => <SingleCommet productId={props.productId} key={index} comment={comment} />)}
            <hr />
            <form onSubmit={submitComment}>
                <TextArea rows={4} placeholder="Please input comment" onChange={(e) => setCommentVal(e.target.value)} value={commentVal} />
                <Button htmlType="submit" type="primary">Add Comment</Button>
            </form>
        </div>
    );
}

export default Comment;