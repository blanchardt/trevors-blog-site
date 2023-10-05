const newBlogHandler = async (event) => {
  //redirect user to the page with the create blog form
  document.location.replace('/dashboard/create');
};

document
  .querySelector('#new-blog')
  .addEventListener('click', newBlogHandler);

