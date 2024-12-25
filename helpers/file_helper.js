const fs = require('fs');
const path = require('path');
const root_dir = path.dirname(require.main.filename)
const crypto = require("crypto");
const multer = require('multer');

// Configure storage engine and filename
const storage = multer.diskStorage({
    destination: `${root_dir}/public/`,
    filename: function(req, file, cb) {
      cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
  });

// Initialize upload middleware and add file size limit
const uploadEngine = multer({
    storage: storage,
    limits: { fileSize: 1000000 } // 1MB file size limit
}).single('image'); // 'file' is the name attribute of the file input field

const uploadFile = uploadEngine;

module.exports = {uploadFile}