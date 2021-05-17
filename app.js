const querystring = require('querystring');
const handleBlogRouter = require('./src/router/blog');
const handleUserRouter = require('./src/router/user');

// Get cookie expires
const getCookieExpires = () => {
  const d = new Date();
  d.setTime(d.getTime() + 24 * 60 * 60 * 1000);
  return d.toGMTString();
};

// session data
const SESSION_DATA = {};

const getPostData = (req) => {
  const promise = new Promise((resolve, reject) => {
    if (req.method !== 'POST') {
      resolve({});
      return;
    }
    if (req.headers['content-type'] !== 'application/json') {
      resolve({});
      return;
    }
    let postData = '';
    req.on('data', (chunk) => {
      postData += chunk.toString();
    });
    req.on('end', () => {
      if (!postData) {
        resolve({});
        return;
      }
      resolve(JSON.parse(postData));
    });
  });
  return promise;
};

const serverHandle = (req, res) => {
  res.setHeader('Content-type', 'application/json');

  // Get Path
  const url = req.url;
  req.path = url.split('?')[0];

  // Parse query
  req.query = querystring.parse(url.split('?')[1]);

  // Parse cookie
  req.cookie = {};
  const cookieStr = req.headers.cookie || ''; // k1=v1; k2=v2;
  cookieStr.split(';').forEach((item) => {
    if (!item) {
      return;
    }
    const arr = item.split('=');
    const key = arr[0].trim();
    const value = arr[1].trim();
    req.cookie[key] = value;
  });
  console.log('req.cookie: ', req.cookie);

  // Parse session
  let needSetCookie = false;
  var userId = req.cookie.userid;
  if (userId) {
    if (!SESSION_DATA[userId]) {
      SESSION_DATA[userId] = {};
    }
  } else {
    needSetCookie = true;
    userId = `${Date.now()}_${Math.random()}`; // be uniqe
    SESSION_DATA[userId] = {};
  }
  req.session = SESSION_DATA[userId];

  // handle post data
  getPostData(req).then((postData) => {
    req.body = postData;

    // handle blog router
    const blogResult = handleBlogRouter(req, res);
    if (blogResult) {
      blogResult.then((blogData) => {
        if (needSetCookie) {
          res.setHeader(
            'set-Cookie',
            `userid=${userId}; path=/; httpOnly; expires=${getCookieExpires()}`
          );
        }
        res.end(JSON.stringify(blogData));
      });
      return;
    }

    // handle user router
    const userResult = handleUserRouter(req, res);
    if (userResult) {
      userResult.then((blogData) => {
        if (needSetCookie) {
          res.setHeader(
            'set-Cookie',
            `userid=${userId}; path=/; httpOnly; expires=${getCookieExpires()}`
          );
        }
        res.end(JSON.stringify(blogData));
      });
      return;
    }

    // 404
    res.writeHead(404, { 'Content-type': 'text/plain' });
    res.write('404 Not Found\n');
    res.end();
  });
};
module.exports = serverHandle;
//env: process.env.NODE_ENV,
