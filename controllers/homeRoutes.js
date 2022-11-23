const router = require('express').Router();
const withAuth = require('../utils/auth');

const { Comment, Post, User } = require('../models');
const { userInfo } = require('os');

router.get ('/', async (req, res) => {
    try {
        const postData = await Post.findAll({
            include: [
                {
                    model: userInfo, 
                    attributes: ['name']
                }
            ]
        });
        const posts = postData.map((post) => post.get ({ plain: true })  )

        res.render('homepage', {
            posts, 
            logged_in: req.session.logged_in 
        });

    }
    catch (err) {
        res.status(500).json(err);
    }
});


router.get ('/dashboard', withAuth, async (req, res) => {

    try {
        const postData = await Post.findAll ({
            where: { user_id: req.session.user_id }

        } )
        const posts = postData.map((post) => post.get ({ plain: true }))

        res.render('dashboard', {
            posts,
            logged_in: req.session.logged_in

        }       
        )
    }
    catch (err) {
        res.status(500).json(err);
    }

    router.get('/login', (req, res) => {
        if (req.session.logged_in) {
            res.redirect('/');
            return;
        }
        res.render('login');

    }
    
    
    )

}






)

