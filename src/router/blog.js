const {
  getList,
  getDetail,
  newBlog,
  updateBlog,
  deleteBlog,
} = require('../controller/blog');
const { SuccessModel, ErrorModel } = require('../model/resModel');

const handleBlogRouter = (req, res) => {
  const method = req.method;
  const id = req.query.id;

  if (method === 'GET' && req.path === '/api/blog/list') {
    const author = req.query.author || '';
    const keyword = req.query.keyword || '';
    // const listData = getList(author, keyword); // return an array
    // return new SuccessModel(listData);
    const result = getList(author, keyword);
    return result.then((listData) => {
      return new SuccessModel(listData);
    });
  }

  if (method === 'GET' && req.path === '/api/blog/detail') {
    // const data = getDetail(id);
    // return new SuccessModel(data);
    const result = getDetail(id);
    return result.then((detailData) => {
      return new SuccessModel(detailData);
    });
  }

  if (method === 'POST' && req.path === '/api/blog/new') {
    // const data = newBlog(req.body);
    // return new SuccessModel(data);
    const author = 'admin'; // TODO
    req.body.author = author;

    const result = newBlog(req.body);
    return result.then((data) => {
      return new SuccessModel(data);
    });
  }

  if (method === 'POST' && req.path === '/api/blog/update') {
    const result = updateBlog(id, req.body);
    return result.then((value) => {
      if (value) {
        return new SuccessModel();
      } else {
        return new ErrorModel('Update failed');
      }
    });
  }

  if (method === 'POST' && req.path === '/api/blog/delete') {
    const author = 'admin';

    const result = deleteBlog(id, author);
    return result.then((value) => {
      if (value) {
        return new SuccessModel();
      } else {
        return new ErrorModel('Delete failed');
      }
    });
  }
};

module.exports = handleBlogRouter;
