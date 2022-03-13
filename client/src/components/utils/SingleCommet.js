import React, {useState} from 'react';
import {useSelector} from 'react-redux';
import axios from 'axios';
import {Comment, Avatar, Button, Input} from 'antd';

const {TextArea} = Input;

function SingleCommet(props) {
    const user = useSelector(state => state.user);
    const [openReply, setOpenReply] = useState(false)
    const [commentVal, setCommentVal] = useState();
    const submitComment = (e) =>{
        e.preventDefault();

        let body = {
            content: commentVal,
            writer: user.userData._id,
            productId: props.productId,
            responseTo: ''
        }

        axios.post(`http://localhost:5000/api/comment/saveComment`, body)
        .then(res => {
            console.log( res.data)
        })
    }
    const actions = [<span onClick={() => setOpenReply(!openReply)} key="comment-nested-reply-to">Reply to</span>]
    return (
        <div>
            <Comment
            actions={actions}
            author
            avatar={<Avatar src alt="" />}
            content={
                <p>
                </p>
            }
            />
            {openReply && <form onSubmit={submitComment}>
                <TextArea rows={2} placeholder="Please input comment" onChange={(e) => setCommentVal(e.target.value)} value={commentVal} />
                <Button htmlType="submit" type="primary">Add Comment</Button>
            </form>}
        </div>
    );
}

export default SingleCommet;