import { json } from "body-parser";
import express from "express";
import fs, { writeFileSync } from "fs";
import { v4 as uuidv4 } from "uuid";
import path from "path";
const orderRouter = express.Router();

function readParcels() {
  let parcels = fs.readFileSync(__dirname + "./../data/orders.json", "utf8");
  return JSON.parse(parcels);
}

function writeParcels(data) {
  fs.writeFileSync(__dirname + "./../data/orders.json", data);
}

const addParcel = (req, res) => {
  const parcel = readParcels();
  const newParcel = {
    user_id: req.body.user_id,
    pickup_location: req.body.pickup_location,
    destination: req.body.destination,
    recipient_name: req.body.recipient_name,
    recipient_phone: req.body.recipient_phone,
    description: req.body.description,
    present_location: req.body.present_location,
    order_status: req.body.order_status,
    order_id: uuidv4(),
  };

  parcel.push(newParcel);
  writeParcels(JSON.stringify(parcel));

  return res.json({
    message: "a new parcel has been added",
    parcel: newParcel,
  });
};

let getAllParcels = (req, res) => {
  let parcels = readParcels();
  return res.json(parcels);
};

const editParcelDestination = (req, res) => {
  let parcels = readParcels();
  let id = req.params.id;

  if (id === "") {
    return res.status(400).json({ message: "you must add an id" });
  }
  let found = parcels.find((item) => {
    if (id !== item.id) {
      return res
        .status(400)
        .json({ message: "cannot locate an item with that id" });
    }
    return item.id === id;
  });

  found["destination"] = req.body.destination;
  // if (found === false) {
  //   return console.log("cannot find an item with that id");
  // }
  console.log(found);
  writeParcels(JSON.stringify(parcels));

  return res.json({ message: "your order has been edited" });
};

const editParcelStatus = (req, res) => {
  const parcels = readParcels();
  console.log(parcels);
  let objId = req.params.id;
  let found = parcels.find((item) => {
    return objId === item.id;
  });
  if (found === undefined) {
    return res.status(400).json({
      message:
        "an item with the specificed ID does not exist, please check your id again to verify you entered it correctly",
    });
  }

  found.order_status = req.body.order_status;

  writeParcels(JSON.stringify(parcels));

  return res.json({ message: "your status has been updated" });
};

orderRouter.route("/").get(getAllParcels);
orderRouter.route("/").post(addParcel);
orderRouter.route("/:id").put(editParcelDestination);
orderRouter.route("/:id").patch(editParcelStatus);

module.exports = orderRouter;
