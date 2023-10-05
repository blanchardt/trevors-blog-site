const newCommentFormHandler = async (event) => {
  event.preventDefault();

  //get the user input from the content field sections.
  const content = document.querySelector('#blog-comment').value.trim();
  const blog_id = event.target.getAttribute('data-id');

  //check if the fields are null.
  if (blog_id && content) {
    //create a post request to create a new blog.
    const response = await fetch(`/api/comments`, {
      method: 'POST',
      body: JSON.stringify({
        content,
        blog_id,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
      document.location.replace(`/all-comments/${blog_id}`);
    } else {
      alert('Failed to create project');
    }
  }
};

document
  .querySelector('.create-comment')
  .addEventListener('submit', newCommentFormHandler);

