const newBlogFormHandler = async (event) => {
  event.preventDefault();

  //get the user input from the title and content field sections.
  const title = document.querySelector('#blog-title').value.trim();
  const content = document.querySelector('#blog-content').value.trim();

  //check if the fields are null.
  if (title && content) {
    //create a post request to create a new blog.
    const response = await fetch(`/api/blogs`, {
      method: 'POST',
      body: JSON.stringify({ title: title, content: content }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
      document.location.replace('/dashboard');
    } else {
      alert('Failed to create project');
    }
  }
};

document
  .querySelector('.create-blog')
  .addEventListener('submit', newBlogFormHandler);

