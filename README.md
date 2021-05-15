## API design

| Description     | api              | method | url parameter   | Comment                            |
| --------------- | ---------------- | ------ | --------------- | ---------------------------------- |
| Fetch blog list | /api/blog/list   | get    | author, keyword | not filter if parameter is null    |
| Fetch blog      | /api/blog/detail | get    | id              |                                    |
| Create new blog | /api/blog/new    |        |                 | post has new infomation            |
| Update blog     | /api/blog/update |        | id              | postData has updated content       |
| Delete blog     | /api/blog/del    |        | id              |                                    |
| Log in          | /api/user/login  |        |                 | postData has username and password |
