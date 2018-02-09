// Component From apollographql/GitHunt-React
import * as React from 'react';
import TimeAgo from 'react-timeago';

const Comment = ({username, userUrl, content, createdAt}) => (
<div className="comment-box">
  <b>{content}</b>
  <br />
    Submitted <TimeAgo date={createdAt} /> by <a href={userUrl}>{username}</a>
</div>);

export default Comment;
