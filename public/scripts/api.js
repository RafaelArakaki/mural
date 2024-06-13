document.addEventListener('DOMContentLoaded', () => updatePosts());

const updatePosts = () => {
  const promisse = fetch('http://localhost:3000/api/all')
    .then((res) => res.json());
  
  promisse.then((res) => {
    let postElements = '';

    let posts = JSON.parse(res);

    posts.forEach(post => {
      let postElement = `<div id="${post.id}" class="card mb-3">
        <div class="card-header">${post.title}</div>
        <div class="card-body">${post.description}</div>
      </div>`;

      postElements = postElement + postElements;
    });

    document.getElementById('posts').innerHTML = postElements;
  })
}

const newPost = () => {
  const title = document.getElementById('title').value;
  const description = document.getElementById('description').value;
  const posts = { title, description };

  const options = {
    method: 'POST',
    headers: new Headers({ 'content-type': 'application/json' }),
    body: JSON.stringify(posts)
  }

  fetch('http://localhost:3000/api/new', options).then((res) => {
    console.log(res);
    updatePosts();

    document.getElementById('title').value = '';
    document.getElementById('description').value = '';
  })
}