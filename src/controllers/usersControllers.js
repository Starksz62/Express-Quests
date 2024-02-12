const database = require("../../database");

const getUsers = (req, res) => {
  database
    .query("SELECT*FROM users")
    .then(([users]) => {
      res.status(200).json(users);
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};
const getUserById = (req, res) => {
  const id = parseInt(req.params.id);
  database
    .query("SELECT*FROM users WHERE id = ?", [id])
    .then(([user]) => {
      if (user[0] != null) {
        res.status(200).json(user[0]);
      } else {
        res.sendStatus(404);
      }
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};
const postUser = (req, res) => {
  const { firstname, lastname, email, city, language } = req.body;
  database.query(
    "INSERT INTO users(firstname, lastname, email, city, language) Value(?,?,?,?,?)",
    [firstname, lastname, email, city, language]
  )
  .then(([result]) => {
    res.status(201).send({id: result.resultID})
  })
  .catch((err) => {
    console.error(err);
    res.sendStatus(500);
  });
};

const putUser = (req,res) => {
  const id = parseInt(req.params.id)
  const { firstname, lastname, email, city, language } = req.body;
  database 
  .query(
    "UPDATE users SET firstname = ?,lastname = ?, email = ?, city = ?, language = ? where id = ?",
    [firstname, lastname, email, city, language, id] 
  )
  .then(([result]) => {
    if (result.affectedRows === 0) {
      res.sendStatus(404);
    } else {
      res.sendStatus(204);
    }
  })
  .catch((err) => {
    console.error(err);
    res.sendStatus(500);
  });
};


module.exports = {
  getUsers,
  getUserById,
  postUser,
  putUser
};
