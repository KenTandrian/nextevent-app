import { useState, useEffect, useContext } from 'react';

import CommentList from './comment-list.component';
import NewComment from './new-comment.component';
import classes from './comments.module.css';
import NotificationContext from '../../store/notification-context';

function Comments(props) {
  const { eventId } = props;
  const [ showComments, setShowComments ] = useState(false);
  const [ commentsList, setCommentsList ] = useState([]);
  const [ isFetching, setIsFetching ] = useState(false);
  const notificationCtx = useContext(NotificationContext);

  useEffect(() => {
    if (showComments) {
      setIsFetching(true);
      fetch('/api/comments/' + eventId)
        .then(resp => {
          if (resp.ok) return resp.json();
          return resp.json().then(data => {
            throw new Error(data.message || 'Something went wrong');
          })
        })
        .then(data => {
          setCommentsList(data.comments);
          setIsFetching(false);
        })
        .catch(err => {
          setIsFetching(false);
          notificationCtx.showNotification({
            title: 'Error!',
            message: err.message || 'Something went wrong!',
            status: 'error'
          });
        })
    }
  }, [showComments]);

  function toggleCommentsHandler() {
    setShowComments((prevStatus) => !prevStatus);
  }

  const addCommentHandler = (commentData, refs) => {
    // Send data to API
    notificationCtx.showNotification({
      title: 'Sending comment...',
      message: 'Your comment is currently being stored into a database.',
      status: 'pending'
    });
    
    fetch('/api/comments/' + eventId, {
      method: 'POST',
      body: JSON.stringify(commentData),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(resp => {
      if (resp.ok) {
        return resp.json();
      }
      return resp.json().then(data => {
        throw new Error(data.message || 'Something went wrong.');
      })
    })
    .then(data => {
      // Clear the form
      const { emailInputRef, nameInputRef, commentInputRef } = refs;
      emailInputRef.current.value = '';
      nameInputRef.current.value = '';
      commentInputRef.current.value = '';

      // Trigger useEffect
      setShowComments(false);
      setShowComments(true);

      notificationCtx.showNotification({
        title: 'Success!',
        message: 'Your comment was saved!',
        status: 'success'
      });
    })
    .catch(err => {
      notificationCtx.showNotification({
        title: 'Error!',
        message: err.message || 'Something went wrong!',
        status: 'error'
      });
    });
  }

  return (
    <section className={classes.comments}>
      <button onClick={toggleCommentsHandler}>
        {showComments ? 'Hide' : 'Show'} Comments
      </button>
      {showComments && <NewComment onAddComment={addCommentHandler} />}
      {showComments && !isFetching && <CommentList items={commentsList} />}
      {showComments && isFetching && <p>Loading...</p>}
    </section>
  );
}

export default Comments;