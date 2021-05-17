const { SuccessModel, ErrorModel } = require('../model/resModel');
const { login } = require('../controller/user');

const handleUserRouter = (req, res) => {
  const method = req.method;

  if (method === 'GET' && req.path === '/api/user/login') {
    const { username, password } = req.query;
    const result = login(username, password);
    return result.then((data) => {
      if (data.username) {
        // Set session
        req.session.username = data.username;
        req.session.realname = data.realname;
        console.log('req.session is ', req.session);

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
