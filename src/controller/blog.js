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

module.exports = {
  getList,
  getDetail,
};
