const path = require("path");
const ProductController = require("../controllers/ProductController");
const multer = require("multer");
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    try {
      cb(null, path.join(__dirname));
    } catch (err) {
      console.log(err);
    }
  },
  filename: (req, file, cb) => {
    cb(null, `${file.fieldname}_${file.originalname}`);
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
