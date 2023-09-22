const path = require("path");
const fs = require("fs").promises;
const ProductController = require("../controllers/ProductController");
const multer = require("multer");
const uploadImage = path.join("public/uploads");
const storage = multer.diskStorage({
  destination: async (req, file, cb) => {
    try {
      await fs.mkdir(uploadImage);
    } catch (err) {
      console.log(err);
    }
    cb(null, "public/uploads");
  },
  filename: (req, file, cb) => {
    cb(null, `${file.fieldname}_${Date.now()}_${file.originalname}`);
  },
});
const upload = multer({ storage }).single("image");
const router = require("express").Router();
router.get("/", ProductController.index);
router.post("/", ProductController.postSearch);
router.get("/create", ProductController.indexCreate);
router.post("/create", upload, ProductController.postCreate);
router.get("/update/:id", ProductController.indexUpdate);
router.post("/update", upload, ProductController.postUpdate);
router.get("/delete/:id", ProductController.getDelete);
module.exports = router;
