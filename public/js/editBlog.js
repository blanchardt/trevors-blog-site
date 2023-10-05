const editFormHandler = async (event) => {
  event.preventDefault();

  //get the user input from the title and content field sections.
  const title = document.querySelector('#blog-title').value.trim();
  const content = document.querySelector('#blog-content').value.trim();

  //get the id of the current blog post.
  const id = event.target.getAttribute('data-id');

  //check if the fields are null.
  if (title && content) {
    //create a post request to create a new blog.
    const response = await fetch(`/api/blogs/${id}`, {
      method: 'PUT',
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

const deleteFormHandler = async (event) => {
  //get the id of the current blog post.
  const id = event.target.getAttribute('data-id');;

  //send the delete request.
  const response = await fetch(`/api/blogs/${id}`, {
    method: 'DELETE',
  });

  if (response.ok) {
    document.location.replace('/dashboard');
  } else {
    alert('Failed to delete project');
  }
};

document
  .querySelector('#update')
  .addEventListener('click', editFormHandler);

  document
  .querySelector('#delete')
  .addEventListener('click', deleteFormHandler);