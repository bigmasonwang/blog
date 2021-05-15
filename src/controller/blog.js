const { exec } = require('../db/mysql');

const getList = (author, keyword) => {
  let sql = 'SELECT * from blogs where 1=1 ';
  if (author) {
    sql += `and author='${author}' `;
  }
  if (keyword) {
    sql += `and title like '%${keyword}%' `;
  }
  sql += 'order by createtime desc;';
  console.log(sql);
  return exec(sql); // return promise
};

const getDetail = (id) => {
  const sql = `SELECT * FROM blogs where id="${id}";`;
  return exec(sql).then((rows) => {
    return rows[0];
  });
};

const newBlog = (blogData = {}) => {
  // blogData: title content author createtime..
  const title = blogData.title;
  const content = blogData.content;
  const author = blogData.author;
  const createtime = Date.now();
  const sql = `
    insert into blogs (title, content, author, createtime)
    values ('${title}', '${content}', '${author}', ${createtime});
  `;
  return exec(sql).then((insertData) => {
    // console.log(insertData);
    return {
      id: insertData.insertId,
    };
  });
};

const updateBlog = (id, blogData = {}) => {
  const title = blogData.title;
  const content = blogData.content;
  const sql = `update blogs set title='${title}', content='${content}' where id=${id};`;
  return exec(sql).then((updateData) => {
    // console.log(updateData);
    if (updateData.affectedRows > 0) {
      return true;
    }
    return false;
  });
};

const deleteBlog = (id, author) => {
  // const sql = `update blogs set state=0 where id=${id}`;
  const sql = `delete from blogs where id='${id}' and author='${author}';`;
  return exec(sql).then((deleteData) => {
    if (deleteData.affectedRows > 0) {
      return true;
    }
    return false;
  });
};

module.exports = {
  getList,
  getDetail,
  newBlog,
  updateBlog,
  deleteBlog,
};
