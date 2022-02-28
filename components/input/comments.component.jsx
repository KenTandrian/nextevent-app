import { useState, useEffect } from 'react';

import CommentList from './comment-list.component';
import NewComment from './new-comment.component';
import classes from './comments.module.css';

function Comments(props) {
  const { eventId } = props;
  const [ showComments, setShowComments ] = useState(false);
  const [ commentsList, setCommentsList ] = useState([]);

  useEffect(() => {
    if (showComments) {
      fetch('/api/comments/' + eventId)
        .then(resp => resp.json())
        .then(data => {
          setCommentsList(data.comments);
        })
    }
  }, [showComments])

  function toggleCommentsHandler() {
    setShowComments((prevStatus) => !prevStatus);
  }

  const addCommentHandler = async (commentData, refs) => {
    // Send data to API
    const resp = await fetch('/api/comments/' + eventId, {
      method: 'POST',
      body: JSON.stringify(commentData),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    const data = await resp.json();
    console.log(data);

    // GIVE ALERT WHEN THE RESPONSE IS NOT SUCCESS
    if (resp.status === 422 || resp.status === 500) {
      alert(data.message);
    } else {
      const { emailInputRef, nameInputRef, commentInputRef } = refs;
      emailInputRef.current.value = '';
      nameInputRef.current.value = '';
      commentInputRef.current.value = '';
      setShowComments(false); // Trigger useEffect
      setShowComments(true);
    }
  }

  return (
    <section className={classes.comments}>
      <button onClick={toggleCommentsHandler}>
        {showComments ? 'Hide' : 'Show'} Comments
      </button>
      {showComments && <NewComment onAddComment={addCommentHandler} />}
      {showComments && <CommentList items={commentsList} />}
    </section>
  );
}

export default Comments;