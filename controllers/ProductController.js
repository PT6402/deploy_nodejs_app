const Product = require("../models/Product");
const Product_model = require("../models/Product");
const fs = require("fs");
const ProductController = {
  index: async (req, res) => {
    const products = await Product_model.find();
    res.status(200).render("product/index", { products });
  },
  indexCreate: (req, res) => {
    res.status(200).render("product/create");
  },
  postCreate: async (req, res) => {
    const { name_product, price_product, status_product } = req.body;

    const newProduct = new Product_model({
      name_product,
      price_product,
      image_product: req.file.filename,
      status_product,
    });
    await newProduct
      .save()
      .then(() => {
        console.log("product create successfully !");
        res.status(200).redirect("/");
      })
      .catch((error) => {
        res.status(500).send("create product faild");
        console.log("product create failed !", error);
      });
  },
  indexUpdate: async (req, res) => {
    const id = req.params.id;
    const product = await Product_model.findById(id);
    res.render("product/update", { product });
  },
  postUpdate: async (req, res) => {
    const { name_product, price_product, id, old_image, status_product } =
      req.body;
    let newImage;
    // return res.send(req.body);
    if (req.file) {
      try {
        fs.unlinkSync("public/uploads/" + old_image);
        newImage = req.file.filename;
      } catch (error) {
        console.log(error);
      }
    } else {
      newImage = old_image;
    }
    await Product_model.findByIdAndUpdate(id, {
      name_product,
      price_product,
      image_product: newImage,
      status_product,
    });
    res.status(200).redirect("/");
  },
  getDelete: async (req, res) => {
    const id = req.params.id;
    const product = await Product_model.findByIdAndDelete(id);
    try {
      fs.unlinkSync("public/uploads/" + product.image_product);
    } catch (error) {
      console.log(error);
    }
    res.status(200).redirect("/");
  },
  postSearch: async (req, res) => {
    const search = req.body.search;
    const filter = req.body.filter;
    if (search !== undefined) {
      const products = await Product_model.find({
        name_product: { $regex: search, $options: "i" },
      });
      const checksearch = true;
      return res.render("product/index", { products, search: checksearch });
    }
    if (filter !== undefined) {
      const arrFilter = filter.split(" ");
      const key = arrFilter[0];
      const value = arrFilter[arrFilter.length - 1];
      if (key == "price") {
        const compair = arrFilter[1];
        const priceCompair = Number(value);
        if (compair == "<") {
          const products = await Product_model.find({
            price_product: { $lte: priceCompair },
          });

          return res.render("product/index", { products, filter });
        } else {
          const products = await Product_model.find({
            price_product: { $gte: priceCompair },
          });

          return res.render("product/index", { products, filter });
        }
      }
      if (key == "status_product") {
        const products = await Product_model.find({
          status_product: value == "publish",
        });
        return res.render("product/index", { products, filter });
      }
      // const products = await Product_model.find(filter);
      // return res.render("product/index", { products });
    }
  },
};
module.exports = ProductController;
