const express = require("express");
const router = express.Router();
const db = require("../db");
const { Cart } = require("../models");

router.post("/", (req, res, next) => {
  Cart.create(req.body)
    .then((cart) => res.status(201).send(cart))
    .catch((err) => res.status(500).send(err));
});

router.get("/", (req, res, next) => {
  Cart.findAll()
    .then((carts) => res.status(201).send(carts))
    .catch((err) => res.status(500).send(err));
});

router.get("/:userId", (req, res, next) => {
  let carrito;
  Cart.findOne({ where: { userId: req.params.userId } })
    .then((cart) => {
      carrito = cart.dataValues;
      return cart.getProducts();
    })
    .then((children) => {
      children.map((product) => {});
      res.send({ ...carrito, items: children });
    })
    .catch(next);
});

router.put("/:id", (req, res) => {
  Cart.findByPk(req.params.id)
    .then((cart) => cart.update(req.body))
    .then((cart) => res.status(201).send(cart))
    .catch((err) => res.status(500).send(err));
  // Cart.update(req.body, {where: {id: req.params.id}})
  // .then(cart => res.status(201).send(cart));
});

router.delete("/:id", (req, res) => {
  Cart.findByPk(req.params.id)
    .then((cart) => cart.destroy())
    .then(() => res.sendStatus(200))
    .catch((err) => res.status(500).send(err));

  // const id = req.params.id;

  // Cart.destroy(req.body, {where: id})
  //       .then(() => res.sendStatus(204))
  //       .catch(err => res.status(500).send(err));
});

module.exports = router;
