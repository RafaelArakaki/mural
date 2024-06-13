module.exports = {
  posts: [],

  getAll() {
    return this.posts
  },

  newPost(id, title, description) {
    return this.posts.push({ id, title, description });
  }
}