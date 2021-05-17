const { SuccessModel, ErrorModel } = require('../model/resModel');
const { login } = require('../controller/user');

const getCookieExpires = () => {
  const d = new Date();
  d.setTime(d.getTime() + 24 * 60 * 60 * 1000);
  return d.toGMTString();
};

const handleUserRouter = (req, res) => {
  const method = req.method;

  if (method === 'GET' && req.path === '/api/user/login') {
    const { username, password } = req.query;
    const result = login(username, password);
    return result.then((data) => {
      if (data.username) {
        // Deal with cookie
        res.setHeader(
          'set-Cookie',
          `username=${
            data.username
          }; path=/; httpOnly; expires=${getCookieExpires()}`
        );

        return new SuccessModel();
      }
      return new ErrorModel('login failed');
    });
  }

  // Login test
  if (method === 'GET') {
  }
};
module.exports = handleUserRouter;
