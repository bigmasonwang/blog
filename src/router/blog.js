const handleBlogRouter = (req, res) => {
  const method = req.method;
  const url = req.url;
  const path = url.split('?')[0];

  if (method === 'GET' && path === '/api/blog/list') {
    return {
      msg: 'get blog list api',
    };
  }

  if (method === 'GET' && path === '/api/blog/detail') {
    return {
      msg: 'get blog detial api',
    };
  }

  if (method === 'POST' && path === '/api/blog/new') {
    return {
      msg: 'new blog api',
    };
  }

  if (method === 'POST' && path === '/api/blog/update') {
    return {
      msg: 'update blog api',
    };
  }

  if (method === 'POST' && path === '/api/blog/delete') {
    return {
      msg: 'delete blog api',
    };
  }
};

module.exports = handleBlogRouter;
