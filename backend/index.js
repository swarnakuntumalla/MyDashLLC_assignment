const cors = require("cors");

const express = require("express");
const app = express();

const port = process.env.PORT || 3001;

const { open } = require("sqlite");
const sqlite3 = require("sqlite3");

const path = require("path");
const dbPath = path.join(__dirname, "data.db");

const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

app.use(express.json());
app.use(cors());
let db = null;

const initializeDbAndServer = async () => {
  try {
    db = await open({
      filename: dbPath,
      driver: sqlite3.Database,
    });
    app.listen(port, () => {
      console.log(`Connecting server at http://localhost:${port}/...`);
    });
  } catch (error) {
    console.log(`DB Error ${error.message}`);
    process.exit(1);
  }
};
initializeDbAndServer();

//Register API
app.post("/register/", async (request, response) => {
  const { username, password, name, gender } = request.body;
  const selectUserQuery = `
    SELECT * FROM login_details WHERE username = '${username}';
    `;
  const user = await db.get(selectUserQuery);

  if (user !== undefined) {
    response.status(400);
    response.send({ error_msg: "User already exists" });
  } else {
    const hashedPassword = await bcrypt.hash(password, 10);
    if (password.length < 6) {
      response.status(400);
      response.send({ error_msg: "Password is too short" });
    } else {
      const postUserQuery = `
        INSERT INTO login_details(username, password, name, gender)
        VALUES ('${username}', '${hashedPassword}', '${name}', '${gender}');
        `;
      await db.run(postUserQuery);
      response.send({ message: "User created successfully" });
    }
  }
});

//login API
app.post("/login/", async (request, response) => {
  const { username, password } = request.body;
  const selectUserQuery = `
    SELECT * FROM login_details WHERE username = '${username}';
    `;
  const user = await db.get(selectUserQuery);

  if (user === undefined) {
    response.status(400);
    response.send({ error_msg: "Invalid username" });
  } else {
    const matchedPassword = await bcrypt.compare(password, user.password);
    if (matchedPassword === true) {
      const payload = { username: username };
      const jwt_token = jwt.sign(payload, "MY_SECRET_TOKEN");
      response.send({ jwt_token });
    } else {
      response.status(400);
      response.send({ error_msg: "Invalid password" });
    }
  }
});
