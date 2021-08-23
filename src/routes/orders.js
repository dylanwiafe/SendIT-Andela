import { json } from "body-parser";
import express from "express";
import fs, { writeFileSync } from "fs";
import { v4 as uuidv4 } from "uuid";
import path from "path";
const orderRouter = express.Router();
import Order from "./models/order.model";

function readParcels() {
  let parcels = fs.readFileSync(__dirname + "./../data/orders.json", "utf8");
  return JSON.parse(parcels);
}

function writeParcels(data) {
  fs.writeFileSync(__dirname + "./../data/orders.json", data);
}

const addParcel = (req, res) => {
  const parcel = readParcels();
  // const newParcel = {
  //   user_id: req.body.user_id,
  //   pickup_location: req.body.pickup_location,
  //   destination: req.body.destination,
  //   recipient_name: req.body.recipient_name,
  //   recipient_phone: req.body.recipient_phone,
  //   description: req.body.description,
  //   present_location: req.body.present_location,
  //   order_status: req.body.order_status,
  //   order_id: uuidv4(),
  // };

  const newParcel = new Order({
    pickup_location: req.body.pickup_location,
    destination: req.body.destination,
    recipient_name: req.body.recipient_name,
    recipient_phone: req.body.recipient_phone,
    description: req.body.description,
    present_location: req.body.present_location,
    order_status: req.body.order_status,
    user_id: req.body.user_id,
  });

  newParcel
    .save()
    .then(() => {
      return res.json({
        message: "a new parcel has been added",
        parcel: newParcel,
      });
    })
    .catch((err) => {
      return res.status(400).json({ message: "bad request" });
    });
};

let getAllParcels = (req, res) => {
  // let parcels = readParcels();
  // return res.json(parcels);
  Order.find()
    .then((orders) => {
      return res.json(orders);
    })
    .catch((err) => {
      return res.status(404).json({ message: "no orders found" });
    });
};

const editParcelDestination = (req, res) => {
  let id = req.params.id;

  if (id === "") {
    return res.status(400).json({ message: "you must add an id" });
  }

  try {
    Order.findByIdAndUpdate(
      id,
      { destination: req.body.destination },
      { new: true },
      () => {
        return res.json({ message: "Destination updated" });
      }
    );
  } catch (error) {
    return res
      .status(400)
      .json({ message: "Unable to update order destination" });
  }

  // Order.findById(id)
  //   .then((order) => {
  //     order.destination = req.body.destination;
  //     console.log(order);

  //     order
  //       .save()
  //       .then(() => {
  //         return res.json({
  //           message: "Order destination is changed to " + order.destination,
  //         });
  //       })
  //       .catch((err) => {
  //         return res
  //           .status(400)
  //           .json({ message: "unable to update item with that order id" });
  //       });
  //   })
  //   .catch((err) => {
  //     return res
  //       .status(404)
  //       .json({ message: "cannot find order with that specified order id" });
  //   });
};

const editParcelStatus = (req, res) => {
  const parcels = readParcels();
  console.log(parcels);
  let objId = req.params.id;

  if (objId === "") {
    res.status(400).json({ message: "you must add an ID" });
  }
  let found = parcels.find((item) => {
    if (objId !== item.id) {
      return res.status(400).json({
        message:
          "an item with the specificed ID does not exist, please check your id again to verify you entered it correctly",
      });
    }
    return objId === item.id;
  });

  found.order_status = req.body.order_status;

  writeParcels(JSON.stringify(parcels));

  return res.json({ message: "your status has been updated" });
};

orderRouter.route("/").get(getAllParcels);
orderRouter.route("/").post(addParcel);
orderRouter.route("/:id").patch(editParcelDestination);
orderRouter.route("/:id").patch(editParcelStatus);

module.exports = orderRouter;
