const express = require("express");
const mysql = require("mysql");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

// Cấu hình kết nối với MySQL
const config = {
  host: "192.168.1.8",
  user: "root",
  password: "",
  database: "db_videosharingapp",
};

// Kết nối MySQL
const pool = mysql.createPool(config);

// API Endpoint để lấy danh sách người dùng
app.get("/account", async (req, res) => {
  pool.query(
    `SELECT u.*, a.username as account_user, a.pass 
     FROM Account a 
     INNER JOIN Users u ON a.idUser = u.idUser`,
    (err, results) => {
      if (err) {
        console.log("Error fetching Accounts from MySQL:", err);
        return res.status(500).send("Server Error");
      }
      res.json(results); // Trả về dữ liệu
    }
  );
});
app.get("/data", (req, res) => {
  let id = parseInt(req.query.id, 10);
  if (isNaN(id)) {
    return res
      .status(400)
      .json({ error: "Invalid ID parameter. Must be a number." });
  }
  pool.query(`SELECT * FROM Users WHERE idUser = ?`, [id], (err, results) => {
    if (err) {
      console.log("Error fetching data from MySQL:", err);
      return res.status(500).send("Server Error");
    }
    res.json(results);
  });
});

app.get("/videoStreaming", async (req, res) => {
  try {
    const pool = req.app.locals.db;
    const result = await pool.request().query(`
        SELECT * FROM Post p 
        INNER JOIN Users u ON p.idUser = u.idUser
        where p.type = 'video'
        ORDER BY p.idPost DESC;
      `);
    res.json(result.recordset);
  } catch (err) {
    console.log("Error fetching video details:", err);
    res.status(500).send("Server Error");
  }
});

// Khởi chạy server
app.listen(8081, () => {
  console.log("Server running on http://localhost:8081");
});
