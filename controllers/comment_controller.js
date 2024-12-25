const Post = require('../models').post;

module.exports = {
    addComments: (req, res) => {
        post_id = req.params['post_id']
        commentData = req.body['comment']
        user = req.user

        Post.findByPk(post_id).then((post) => {
            return post.createComment({text: commentData, userName: user.name})
        })
        .then(result => {
            console.log(`comment has been added ${result}`)
            res.redirect("/web/posts")
        })
        .catch((err) => {
            res.send(err)
        });
    }
}
