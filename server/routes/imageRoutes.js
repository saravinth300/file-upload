const express = require("express");
const router = express.Router();

const upload = require("../middleware/upload");
const {
  createImage,
  getImages,
  getImage,
  updateImage,
  deleteImage
} = require("../controllers/imageController");

// CRUD Routes
router.post("/", upload.single("image"), createImage);
router.get("/", getImages);
router.get("/:id", getImage);
router.put("/:id", upload.single("image"), updateImage);
router.delete("/:id", deleteImage);

module.exports = router;