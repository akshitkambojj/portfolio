const express = require('express');
const ServiceRouter = express.Router();
const Service = require("../models/Service");

// GET all services
ServiceRouter.get("/", async (req, res) => {
  try {
    const services = await Service.find();
    res.json({ success: true, data: services });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

module.exports = ServiceRouter;
