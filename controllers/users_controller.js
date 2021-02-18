const User = require('../models/user');

module.exports.profile = function(req,res){
    //return res.end('<h1>User Profile</h1>');
    return res.render('user_profile',{
        title: "profile" 
    });
}

// action
// rendering the sign up page
module.exports.signUp = function(req,res){
    return res.render('user_sign_up',{
        title: 'Social Media | Sign Up'
    });
}

//rendering the sign in page
module.exports.signIn = function(req,res){
    return res.render('user_sign_in',{
        title: 'Social Media | Sign In'
    });
}

// get the sign up data
module.exports.create = function(req,res){
    if (req.body.password != req.body.confirm_password){
        return res.redirect('back');
    }
    
    User.findOne({email: req.body.email},function(err,user){
        if(err){ console.log("Error in finding user in signing up"); return; }

        if(!user){
            User.create(req.body,function(err,user){
                if(err){
                    console.log("Error in creating user while signing up"); 
                    return; }
                return res.redirect('/users/sign-in');
            })
        }
        else{
            return res.redirect('back');
        }
    });

}

// sign in and create a session for the user
module.exports.createSession = function(req,res){

    //steps to auntheticate
    
    // find the user
    User.findOne({email: req.body.email},function(err,user){
        if(err){ console.log("Error in finding user in signing in"); return; }

        //handle user found
        if(user){

            //handle password which doesn't match
            if (user.password != req.body.password){
                return res.redirect('back');
            }
            // handle session creation
            res.cookie('user_id',user.id);
            return res.redirect('/users/profile')
        }
        // handle user not found
        else{
            return res.redirect('back');
        }
    })

}