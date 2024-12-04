const express = require("express");
const mysql = require("mysql");
const cors = require("cors");
const bcrypt = require("bcrypt");

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
    console.log(results);
    res.json(results);
  });
});
app.get("/imageStreaming4", (req, res) => {
  pool.query(
    `SELECT * FROM Post p 
     INNER JOIN Users u ON p.idUser = u.idUser
     WHERE p.type = 'image'
     ORDER BY p.idPost DESC
     LIMIT 4`,
    (err, results) => {
      if (err) {
        console.log("Error fetching image details:", err);
        return res.status(500).send("Server Error");
      }
      res.json(results);
    }
  );
});
app.get("/Userstories", (req, res) => {
  pool.query(
    `SELECT u.idUser, u.avatar, u.username, MAX(p.upload_at) AS latest_upload_at FROM Post p
     INNER JOIN Users u ON p.idUser = u.idUser
     WHERE p.type = 'story' AND TIMESTAMPDIFF(HOUR, p.upload_at, NOW()) <= 24
     GROUP BY u.idUser, u.avatar, u.username
     ORDER BY latest_upload_at DESC`,
    (err, results) => {
      if (err) {
        console.error("Error fetching stories:", err);
        return res.status(500).send("Error fetching stories");
      }
      res.status(200).json(results);
    }
  );
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
// API Endpoint để lấy danh sách follow
app.get("/follow", (req, res) => {
  let id = parseInt(req.query.id, 10); // Parse id to an integer
  if (isNaN(id)) {
    return res
      .status(400)
      .json({ error: "Invalid ID parameter. Must be a number." });
  }
  pool.query(
    `SELECT 
      SUM(CASE WHEN f.id_following = ? THEN 1 ELSE 0 END) AS following_count,
      SUM(CASE WHEN f.id_followed = ? THEN 1 ELSE 0 END) AS followers_count
    FROM Follow f`,
    [id, id],
    (err, results) => {
      if (err) {
        console.log("Error fetching follow counts:", err);
        return res.status(500).send("Server Error");
      }
      res.json(results);
    }
  );
});
// Same fix applied to other routes
app.get("/profilevideos", (req, res) => {
  let id = parseInt(req.query.id, 10);
  if (isNaN(id)) {
    return res
      .status(400)
      .json({ error: "Invalid ID parameter. Must be a number." });
  }
  pool.query(
    `SELECT p.url, p.idPost, u.idUser, u.avatar FROM Post p INNER JOIN Users u
     ON p.idUser = u.idUser WHERE p.type= 'video' AND p.idUser = ?`,
    [id],
    (err, results) => {
      if (err) {
        console.log("Error fetching profile videos:", err);
        return res.status(500).send("Server Error");
      }
      res.json(results);
    }
  );
});
// API Endpoint để lấy danh sách video in profile
app.get("/profilevideos", (req, res) => {
  const { id } = req.query;
  const parsedId = parseInt(id, 10);
  if (isNaN(parsedId)) {
    return res.status(400).send("Invalid id parameter");
  }
  pool.query(
    `SELECT p.url FROM Post p 
     INNER JOIN Users u ON p.idUser = u.idUser 
     WHERE p.type = 'video' AND p.idUser = ? 
     ORDER BY p.idPost DESC`,
    [parsedId],
    (err, results) => {
      if (err) {
        console.log("Error fetching profile videos:", err);
        return res.status(500).send("Server Error");
      }
      res.json(results);
    }
  );
});
// endpoint lay danh sach anh profile
app.get("/profileimages", (req, res) => {
  let id = parseInt(req.query.id, 10);
  if (isNaN(id)) {
    return res
      .status(400)
      .json({ error: "Invalid ID parameter. Must be a number." });
  }
  pool.query(
    `SELECT p.url, p.idPost, u.idUser, u.avatar FROM Post p INNER JOIN Users u
     ON p.idUser = u.idUser WHERE p.type= 'image' AND p.idUser = ?`,
    [id],
    (err, results) => {
      if (err) {
        console.log("Error fetching profile images:", err);
        return res.status(500).send("Server Error");
      }
      res.json(results);
    }
  );
});
// Endpoint để tao account end user
app.post("/register", (req, res) => {
  const { username, sdt, email, accname, pass } = req.body;
  if (!username || !sdt || !email || !accname || !pass) {
    return res
      .status(400)
      .json({ error: "Vui lòng cung cấp đầy đủ thông tin" });
  }

  const queryUser = `
    INSERT INTO Users (username, sdt, email, avatar, birthDay)
    VALUES (?, ?, ?, 'https://imgur.com/RrBwvfA.png', NOW())
  `;
  pool.getConnection((err, connection) => {
    if (err) {
      console.error("Lỗi kết nối cơ sở dữ liệu:", err);
      return res.status(500).json({ error: "Lỗi kết nối cơ sở dữ liệu." });
    }

    connection.beginTransaction(async (err) => {
      if (err) {
        connection.release();
        console.error("Lỗi bắt đầu giao dịch:", err);
        return res.status(500).json({ error: "Lỗi bắt đầu giao dịch." });
      }
      try {
        // Mã hóa mật khẩu với 10 vòng lặp
        const hashedPassword = await bcrypt.hash(pass, 10);
        connection.query(
          queryUser,
          [username, sdt, email],
          (err, resultUser) => {
            if (err) {
              connection.rollback(() => {
                connection.release();
                console.error("Lỗi insert user:", err);
                return res.status(500).json({ error: "Lỗi insert user." });
              });
            } else {
              const idUser = resultUser.insertId;
              console.error("idUser", idUser);
              console.error("resultUser", resultUser);
              const queryAccount = `
                INSERT INTO Account (idUser, username, pass)
                VALUES (?, ?, ?)
              `;
              connection.query(queryAccount, [idUser, accname, hashedPassword]);
              connection.commit((err) => {
                if (err) {
                  connection.rollback(() => {
                    connection.release();
                    return res
                      .status(500)
                      .json({ error: "Lỗi commit giao dịch." });
                  });
                } else {
                  connection.release();
                  res
                    .status(201)
                    .json({ message: "Tạo tài khoản thành công!" });
                }
              });
            }
          }
        );
      } catch (error) {
        connection.rollback(() => {
          connection.release();
          console.error("Lỗi cơ sở dữ liệu:", error);
          res.status(500).json({ error: "Lỗi khi tạo tài khoản." });
        });
      }
    });
  });
});

// Khởi chạy server
app.listen(8081, () => {
  console.log("Server running on http://localhost:8081");
});
