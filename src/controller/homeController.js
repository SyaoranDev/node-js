import pool from "../config/connectDB";

let getHomepage = async (req, res) => {
  const [rows, fields] = await pool.execute(`SELECT * FROM users`);

  return res.render("index.ejs", { dataUser: rows, test: "test abc string" });
};

let getDetailPage = async (req, res) => {
  let userId = req.params.id;
  let [user] = await pool.execute(`select * from users where id = ?`, [userId]);

  return res.send(JSON.stringify(user));
};

let createNewUser = async (req, res) => {
  console.log("check req:", req.body);
  let { firstName, lastName, email, address } = req.body;

  await pool.execute(
    "insert into users(firstName, lastName, email, address) values (?,?,?,?)",
    [firstName, lastName, email, address]
  );

  return res.redirect("/");
};

let deleteUser = async (req, res) => {
  let userId = req.body.userId;
  await pool.execute("Delete from users where id = ?", [userId]);
  return res.redirect("/");
};

let editUser = async (req, res) => {
  let id = req.params.id;
  let [user] = await pool.execute("Select * from users where id = ?", [id]);
  return res.render("update.ejs", { dataUser: user[0] });
};

let updateUser = async (req, res) => {
  let { firstName, lastName, email, address, id} = req.body;
  await pool.execute(
    "Update users set firstName = ?, lastName = ?, email = ?, address = ? where id = ?",
    [firstName, lastName, email, address, id]
  );
  return res.redirect("/");
};

module.exports = {
  getHomepage,
  getDetailPage,
  createNewUser,
  deleteUser,
  editUser,
  updateUser,
};
