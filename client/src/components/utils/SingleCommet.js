import React, {useState} from 'react';
import axios from 'axios';
import {Comment, Avatar, Button, Input} from 'antd';

const {TextArea} = Input;

function SingleCommet(props) {
    const [openReply, setOpenReply] = useState(false)
    const [commentVal, setCommentVal] = useState();
    const submitComment = (e) =>{
        e.preventDefault();

        let body = {
            content: commentVal,
            writer: props.user.userData._id,
            productId: props.productId,
            responseTo: props.comment._id
        }

        axios.post(`http://localhost:5000/api/comment/saveComment`, body)
        .then(res => {
            props.refreshComments(res.data.result)
            setCommentVal("")
        })
    }
    const actions = [<span onClick={() => setOpenReply(!openReply)} key="comment-nested-reply-to">Reply to</span>]
    return (
        <>
            <Comment
            actions={actions}
            author={props.comment.writer.name}
            avatar={<Avatar src={props.comment.writer.image} alt={props.comment.writer.name} />}
            content={props.comment.content}
            />
            {openReply && <form onSubmit={submitComment} style={{marginLeft: "44px"}}>
                <TextArea rows={2} placeholder="Please input comment" onChange={(e) => setCommentVal(e.target.value)} value={commentVal} />
                <Button htmlType="submit" type="primary">Add Comment</Button>
            </form>}
        </>
    );
}

export default SingleCommet;