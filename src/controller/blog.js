const { exec } = require('../db/mysql');

const getList = (author, keyword) => {
  let sql = 'SELECT * from blogs where 1=1 ';
  if (author) {
    sql += `and author='${author}' `;
  }
  if (keyword) {
    sql += `and title like '${keyword}' `;
  }
  sql += 'order by createtime desc;';

  return exec(sql); // return promise
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
