const express = require("express");
const router = express.Router();
const cloudinary = require("../utils/cloundiary");
const upload = require("../utils/multer");

router.post("/upload", upload.single("image"), async (req, res) => {
  try {
    const result = await cloudinary.uploader.upload(req.file.path);
    res.json(result);
    res.status(200).json({
      data: result,
      sussess: true,
      message: "Upload ảnh thành công.",
    });
  } catch (error) {
    console.error("Lỗi khi upload ảnh:", error);
    res.status(500).json({ error: "Lỗi khi upload ảnh." });
  }
});

module.exports = router;
