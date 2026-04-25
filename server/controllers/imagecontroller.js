const Image = require("../models/image");


exports.createImage = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ msg: "Image required" });
    }

    const image = new Image({
      title: req.body.title,
      image: req.file.filename
    });

    await image.save();

    res.status(201).json(image);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getImages = async (req, res) => {
  try {
    const images = await Image.find();
    res.json(images);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


exports.getImage = async (req, res) => {
  try {
    const image = await Image.findById(req.params.id);
    res.json(image);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateImage = async (req, res) => {
  try {
    const updatedData = {
      title: req.body.title
    };

    if (req.file) {
      updatedData.image = req.file.filename;
    }

    const updated = await Image.findByIdAndUpdate(
      req.params.id,
      updatedData,
      
    );

    res.json(updated);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


exports.deleteImage = async (req, res) => {
  try {
    await Image.findByIdAndDelete(req.params.id);
    res.json({ msg: "Image deleted" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};