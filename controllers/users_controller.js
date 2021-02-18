const User = require('../models/user');

module.exports.profile = function(req,res){
console.log(req.cookies.user_id);
// return res.redirect('back');
//cookie ki jagah cookies aayega? its wrking now?
//at that time i had tried with cookies but not working
    if (req.cookies.user_id){
        User.findById(req.cookies.user_id,function(err,user){ // here also i can write User.findOne() yeS BUT U NEED TO GIVE {_id:req.cookies.id} here it will be cookies?yes ok ANything Else dear?no
        
            if(user){
                return res.render('user_profile',{
                    title: "user profile",
                    user: user
                })
            }
            return res.redirect('/users/profile');
        });
    } else {
        return res.redirect('/users/sign-in');
    }
    //return res.end('<h1>User Profile</h1>');
    //return res.render('user_profile',{
    //    title: "profile" 
    //});
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
    //this way or u can use user.findbyid ?ok
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
    User.findOne({email: req.body.email},function(err,user){ // here what this user refer to?user refer to User.findone by email ?? got it Anything how User.findOne() works? its a default function using mongoose we have to learn default function like findby id , findone , delete many ?
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