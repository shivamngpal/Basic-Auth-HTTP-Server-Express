const express = require('express');
const app = express();

let users=[];


// ye m bhul jaata hu
// body se json ko parse krne k liye we need this middleware
app.use(express.json());

function generateToken(){
    const options = [
        'a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z',
        'A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z',
        '0','1','2','3','4','5','6','7','8','9'
    ];

    let token="";
    // creating a token of 32 charcters
    for(let i=0; i<32; i++){
        // this line of code concats a random char from options array in token string
        // math.random() gives a random no. b/w 0 and 1 and when multiplied with options.length() -> it gives a random number b/w 0 - 42
        // math.floor() gives the floor(lower) value of a random index
        token += options[Math.floor(Math.random() * options.length)];
    }
    return token;
}

app.post('/signup',(req,res)=>{
    const email = req.body.email;
    const password = req.body.password;

    users.push({
        user_email : email,
        user_password : password
    });

    res.json({
        msg : "Registered Successfully!!!"
    });

    console.log(users);
});

app.post('/signin',(req,res)=>{
    const email = req.body.email;
    const password = req.body.password;

    // find() returns actual user object if found, else returns undefined
    // find a user whose email and password matches with the user in our local database
    const foundUser = users.find(u => u.user_email===email && u.user_password===password);

    if(foundUser){
        const token = generateToken();
        foundUser.token = token;

        res.json({
            msg : `You are logged in successfully | token : ${token}`
        });
    }
    else{
        res.json({
            msg : "User not found!! Please SignUp"
        });
    }

    console.log(users);

    // let emailFlag = false;
    // let passFlag = false;
    // for(let i=0; i<users.length; i++){
    //     const user_email = users[i].user_īīemail;
    //     const user_password = users[i].user_password;

    //     if(email === user_email && password === user_password ){
    //         emailFlag=true;
    //         passFlag=true;
    //         break;
    //     }
    // }
    // if(emailFlag && passFlag)
    //     res.json("You are logged in successfully!!!");
    // else
    //     res.json("Email or password is incorrect");
});


// add token in headers and create a new key -> authorization and value = token
app.get('/me', (req,res) => {
    const userToken = req.headers.authorization;
    const user = users.find(u => u.token===userToken);

    if(user){
        const temp = user.user_email.split("@");
        const username = temp[0];

        res.json({
            msg : `Hi ${username}, You have been authenticated successfully`
        });
    }
    else{
        res.status(404).json({
            msg : "User not found"
        });
    }
});

app.listen(3000);
