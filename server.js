const dotenv = require("dotenv").config();

const mongoclient = require("mongodb").MongoClient;
const FacebookStrategy = require("passport-facebook").Strategy;
const ObjId = require("mongodb").ObjectId;
const url = "mongodb+srv://root:1234@cluster0.tno1pr9.mongodb.net/";
let mydb;
mongoclient
  .connect(url)
  .then((client) => {
    mydb = client.db("myboard");
    // mydb.collection('post').find().toArray().then(result =>{
    //     console.log(result);
    // })

    app.listen(3000, function () {
      console.log("포트 3000으로 서버 대기중 ... ");
    });
  })
  .catch((err) => {
    console.log(err);
  });

var mysql = require("mysql");
var conn = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "1234",
  database: "myboard",
});

conn.connect();

// conn.query("select * from post", function (err, rows, fields) {
//   if (err) throw err;
//   console.log(rows);
// });

const express = require("express");
const bodyParser = require("body-parser");
const fs = require("fs");
const path = require("path");
const app = express();
const port = 3000;
const sha = require("sha256");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
let session = require("express-session");
app.use(
  session({
    secret: "dkufe8938493j4e08349u",
    resave: false,
    saveUninitialized: true,
  })
);

app.use(passport.initialize());
app.use(passport.session());
app.use("/public", express.static("public"));

app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.engine("ejs", require("ejs").__express);
app.use(express.static("public"));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

// 사용자 데이터와 게시글 데이터를 저장할 파일
// const usersFile = path.join(__dirname, "users.json");
// const postsFile = path.join(__dirname, "posts.json");

// // 초기 사용자 데이터와 게시글 데이터가 없는 경우 생성
// if (!fs.existsSync(usersFile)) fs.writeFileSync(usersFile, "[]");
// if (!fs.existsSync(postsFile)) fs.writeFileSync(postsFile, "[]");

// // 홈 페이지
// app.get("/", (req, res) => {
//   res.sendFile(path.join(__dirname, "public", "index.html"));
// });

////

app.get("/", function (req, res) {
  //res.render("index.ejs");
  if (req.session.passport) {
    console.log("세션 유지");
    //res.send('로그인 되었습니다.');
    res.render("index.ejs", { user: req.session.passport });
  } else {
    console.log("user : null");
    res.render("index.ejs", { user: null });
  }
});

// // 회원가입 페이지
// app.get("/register", (req, res) => {
//   res.sendFile(path.join(__dirname, "public", "register.html"));
// });

// // 회원가입 처리
// app.post("/register", (req, res) => {
//   const { username, password } = req.body;
//   let users = JSON.parse(fs.readFileSync(usersFile));

//   if (users.find((user) => user.username === username)) {
//     return res.send("User already exists.");
//   }

//   users.push({ username, password });
//   fs.writeFileSync(usersFile, JSON.stringify(users));
//   res.redirect("/login");
// });

// // 로그인 처리
// app.post("/login", (req, res) => {
//   const { username, password } = req.body;
//   const users = JSON.parse(fs.readFileSync(usersFile));

//   const user = users.find(
//     (user) => user.username === username && user.password === password
//   );
//   if (user) {
//     res.redirect("/board");
//   } else {
//     res.send("Invalid username or password.");
//   }
// });

// 게시글 조회
// app.get("/posts", (req, res) => {
//   const posts = JSON.parse(fs.readFileSync(postsFile));
//   res.json(posts);
// });

// // 게시글 작성
// app.post("/posts", (req, res) => {
//   const { title, content } = req.body;
//   let posts = JSON.parse(fs.readFileSync(postsFile));

//   posts.push({ title, content, date: new Date().toLocaleString() });
//   fs.writeFileSync(postsFile, JSON.stringify(posts));
//   res.redirect("/board");
// });

// app.listen(port, () => {
//   console.log(`Server is running on http://localhost:${port}`);
// });

// app.get("/list", function (req, res) {
//   //   conn.query("select * from post", function (err, rows, fields) {
//   //     if (err) throw err;
//   //     console.log(rows);
//   //   });
//   mydb
//     .collection("post")
//     .find()
//     .toArray()
//     .then((result) => {
//       console.log(result);
//       res.render("list.ejs", { data: result });
//     });
// });

// app.get("/board", function (req, res) {
//   res.sendFile(__dirname + "/board.ejs");
// });

app.get("/book", function (req, res) {
  res.send("도서 목록 관련 페이지입니다.");
});
// app.get("/", function (req, res) {
//   res.sendFile(__dirname + "/index.html");
// });

// app.get("/list", function (req, res) {
//   //   conn.query("select * from post", function (err, rows, fields) {
//   //     if (err) throw err;
//   //     console.log(rows);
//   //   });
// // /* This code snippet is querying a MongoDB database to retrieve all documents from the "post"
// collection. It then converts the result into an array and passes it to a callback function using
// the `then()` method. Inside the callback function, it logs the result to the console and renders
// a template file named "list.ejs" with the retrieved data using the `res.render()` method. */
// mydb;
//     .collection("post")
//     .find()
//     .toArray()
//     .then((result) => {
//       console.log(result);
//       res.render("list.ejs", { data: result });
//     });
// });

// app.get("/board", function (req, res) {
//   // res.sendFile(__dirname + '/enter.html');
//   res.render("board.ejs");
// });

// //'/enter' 요청에 대한 처리 루틴
// app.get("/enter", function (req, res) {
//   // res.sendFile(__dirname + '/enter.html');
//   res.render("enter.ejs");
// });

// app.post("/save", function (req, res) {
//   console.log(req.body.title);
//   console.log(req.body.content);
//몽고DB에 데이터 저장하기
// mydb.collection('post').insertOne(
//     {title : req.body.title, content : req.body.content},
//     function(err, result){
//         console.log(err);
//         console.log(result);
//         console.log('데이터 추가 성공');
//     });

// mydb
//   .collection("post")
//   .insertOne({
//     title: req.body.title,
//     content: req.body.content,
//     date: req.body.someDate,
//   })
//   .then((result) => {
//     console.log(result);
//     console.log("데이터 추가 성공");
//   });

// let sql = "insert into post (title, content, created) values(?, ?, NOW())";
// let params = [req.body.title, req.body.content];
// conn.query(sql, params, function (err, result) {
//     if (err) throw err;
//     console.log('데이터 추가 성공');
// });
//   res.redirect("/list");
// });

// app.post("/delete", function (req, res) {
//   console.log(req.body);
//   req.body._id = new ObjId(req.body._id);
//   mydb
//     .collection("post")
//     .deleteOne(req.body)
//     .then((result) => {
//       console.log("삭제완료");
//       res.status(200).send();
//     })
//     .catch((err) => {
//       console.log(err);
//       res.status(500).send();
//     });
// });

// app.get("/content/:id", function (req, res) {
//   console.log(req.params.id);
//   req.params.id = new ObjId(req.params.id);
//   mydb
//     .collection("post")
//     .findOne({ _id: req.params.id })
//     .then((result) => {
//       console.log(result);
//       res.render("content.ejs", { data: result });
//     });
// });

//'/edit' 요청에 대한 처리 루틴
// app.get("/edit/:id", function (req, res) {
//   req.params.id = new ObjId(req.params.id);
//   mydb
//     .collection("post")
//     .findOne({ _id: req.params.id })
//     .then((result) => {
//       console.log(result);
//       res.render("edit.ejs", { data: result });
//     });
// });

// app.post("/edit", function (req, res) {
//   console.log(req.body);
//   req.body.id = new ObjId(req.body.id);
//   mydb
//     .collection("post")
//     .updateOne(
//       { _id: req.body.id },
//       {
//         $set: {
//           title: req.body.title,
//           content: req.body.content,
//           date: req.body.someDate,
//         },
//       }
//     )
//     .then((result) => {
//       console.log("수정완료");
//       res.redirect("/list");
//     })
//     .catch((err) => {
//       console.log(err);
//     });
// });

let cookieParser = require("cookie-parser");

app.use(cookieParser("ncvka0e398423kpfd"));
app.get("/cookie", function (req, res) {
  let milk = parseInt(req.signedCookies.milk) + 1000;
  if (isNaN(milk)) {
    milk = 0;
  }
  res.cookie("milk", milk, { signed: true });
  //res.clearCookie('milk');
  res.send("product : " + milk + "원");
});

app.get("/login", function (req, res) {
  console.log(req.session);
  if (req.session.user) {
    console.log("세션 유지");
    //res.send('로그인 되었습니다.');
    res.render("index.ejs", { user: req.session.user });
  } else {
    console.log("로그인 페이지");
    res.render("login.ejs");
  }
});

passport.serializeUser(function (user, done) {
  console.log("serializeUser");
  console.log(user.userid);
  done(null, user.userid);
});

passport.deserializeUser(function (puserid, done) {
  console.log("deserializeUser");
  console.log(puserid);

  mydb
    .collection("account")
    .findOne({ userid: puserid })
    .then((result) => {
      console.log(result);
      done(null, result);
    });
});

app.post(
  "/login",
  passport.authenticate("local", {
    succeessRedirect: "/",
    failureRedirect: "/login",
  }),
  function (req, res) {
    console.log(req.session);
    console.log(req.session.passport);
    res.render("index.ejs", { user: req.session.passport });
  }
);

passport.use(
  new LocalStrategy(
    {
      usernameField: "userid",
      passwordField: "userpw",
      session: true,
      passReqToCallback: false,
    },
    function (inputid, inputpw, done) {
      mydb
        .collection("account")
        .findOne({ userid: inputid })
        .then((result) => {
          if (result.userpw == sha(inputpw)) {
            console.log("새로운 로그인");
            done(null, result);
          } else {
            done(null, false, { message: "비밀번호 틀렸어요" });
          }
        });
    }
  )
);

app.post("/login", function (req, res) {
  console.log("아이디 : " + req.body.userid);
  console.log("비밀번호 : " + req.body.userpw);
  //res.send('로그인 되었습니다.');
  mydb
    .collection("account")
    .findOne({ userid: req.body.userid })
    .then((result) => {
      // console.log(result);
      // console.log(md5(req.body.userpw));
      if (result.userpw == req.body.userpw) {
        req.session.user = req.body;
        console.log("새로운 로그인");
        //res.send('로그인 되었습니다.');
        res.render("index.ejs", { user: req.session.user });
      } else {
        //res.send('비밀번호가 틀렸습니다.');
        res.render("login.ejs");
      }
    });
});

// app.get("/logout", function (req, res) {
//   console.log("로그아웃");
//   req.session.destroy();
//   res.render("index.ejs", { user: null });
// });

// app.get("/signup", function (req, res) {
//   res.render("signup.ejs");
// });

// app.post("/signup", function (req, res) {
//   console.log(req.body.userid);
//   console.log(req.body.userpw);
//   console.log(req.body.usergroup);
//   console.log(req.body.useremail);

//   mydb
//     .collection("account")
//     .insertOne({
//       userid: req.body.userid,
//       userpw: req.body.userpw,
//       usergroup: req.body.usergroup,
//       useremail: req.body.useremail,
//     })
//     .then((result) => {
//       console.log("회원가입 성공");
//     });
//   res.redirect("/");
// });

app.use("/", require("./routes/post.js"));
app.use("/", require("./routes/add.js"));
app.use("/", require("./routes/auth.js"));

app.get("/search", function (req, res) {
  console.log(req.query);
  mydb
    .collection("post")
    .find({ title: req.query.value })
    .toArray()
    .then((result) => {
      console.log(result);
      res.render("sresult.ejs", { data: result });
    });
});
// app.post("/photo", function (req, res) {
//   console.log("서버에 파일 첨부하기");
// });

let multer = require("multer");

let storage = multer.diskStorage({
  destination: function (req, file, done) {
    done(null, "./public/image");
  },
  filename: function (req, file, done) {
    done(null, file.originalname);
  },
});

let upload = multer({ storage: storage });

app.post("/photo", upload.single("picture"), function (req, res) {
  console.log(req.file.path);
});

let imagepath = "";
app.post("/photo", upload.single("picture"), function (req, res) {
  console.log(req.file.path);
  imagepath = "\\" + req.file.path;
});

app.post("/save", function (req, res) {
  //몽고DB에 데이터 저장하기
  mydb.collection("post").insertOne({
    title: req.body.title,
    content: req.body.content,
    date: req.body.someDate,
    path: imagepath,
  });
  //   .then((result) => {
  //     console.log(result);
  //     console.log("데이터 추가 성공");
  //   });

  // res.redirect("/list");
});

// app.get("/image/:imgname", function (req, res) {
//   res.sendFile(__dirname + "/public/image/" + req.params.imgname);
// });
