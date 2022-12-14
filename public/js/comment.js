const post_id = document.querySelector('input[name="post-id"]').value.trim();

// newCommentHandler grabs the value of the commentContent and posts it to the json file else alerts the user that it failed to create comment
const newCommentHandler = async (event) => {
  event.preventDefault();
  const commentContent = document.querySelector('input[name="commentContent"]').value.trim()
  if (commentContent) {
    const response = await fetch('/api/comments', {
      method: 'POST',
      body: JSON.stringify({ post_id, commentContent }),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (response.ok) {
      document.location.reload();
    } else {
      alert('Failed to create comment');
    }
  }
};

document
  .querySelector('.comment-form')
  .addEventListener('submit', newCommentHandler);
