const Post = require('../models').post;
const Comment = require('../models').comment;
const fileHelper = require('../helpers/file_helper')

module.exports = {
    getPosts: async (req, res) => {
        const posts = await Post.findAll({
            where: {
                userId: req.user.id
            },
            include: [{
                model: Comment,
            }]
        })
        return res.render('photo', {posts: posts});
    },
    addPosts: (req, res) => {
        //req.file.name = req.file.fieldname + '-' + Date.now() + path.extname(req.file.originalname)
        fileHelper.uploadFile(req, res, async (err) => {
            
            if (err) {
              console.error(err);
              return res.status(500).json({ error: err });
            }
            
            if (!req.file) {
               return res.status(400).json({ error: 'Please send file' });
            }

            //  let uuid = crypto.randomBytes(20).toString('hex');
            //  image_path = path.join(root_dir, 'public', uuid)
            //  fs.writeFile(image, )
     
            post = req.body
            post['imageUrl'] = req.file.filename
            let result = await req.user.createPost(post)
            
            res.send(`post has been added: ${result}`)
         })
        
    }
}
