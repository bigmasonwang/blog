const getList = (author, keyword) => {
  // TODO: return data
  return [
    {
      id: 1,
      title: 'title1',
      content: 'content1',
      createTime: 1621047648435,
      author: 'Jhon Doe',
    },
    {
      id: 2,
      title: 'title2',
      content: 'content2',
      createTime: 1621047705214,
      author: 'Jhon Doe',
    },
  ];
};

const getDetail = (id) => {
  return {
    id: 1,
    title: 'title1',
    content: 'content1',
    createTime: 1621047648435,
    author: 'Jhon Doe',
  };
};

const newBlog = (blogData = {}) => {
  // blogData: title content..
  console.log('newBlog blog data: ', blogData);
  return {
    id: 3, // new blog id
  };
};

const updateBlog = (id, blogData = {}) => {
  console.log('updateBlog blog ', id, blogData);
  return true;
};

const deleteBlog = (id) => {
  return true;
};

module.exports = {
  getList,
  getDetail,
  newBlog,
  updateBlog,
  deleteBlog,
};
