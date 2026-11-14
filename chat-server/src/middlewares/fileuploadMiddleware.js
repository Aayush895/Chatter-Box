import fs from 'fs';
import path from 'path';
import multer from 'multer';

function getFileStorageLocalPath() {
  const directoryPathString = path.resolve('temp/uploads');
  if (!fs.existsSync(directoryPathString)) {
    fs.mkdirSync(directoryPathString, { recursive: true });
  }

  return directoryPathString;
}

export function fileUploadMiddleWare() {
  const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      try {
        cb(null, getFileStorageLocalPath());
      } catch (error) {
        cb(new Error(error.message || 'File upload failed, please try again later!'));
      }
    },
    filename: function (req, file, cb) {
      cb(null, Date.now() + '-' + file.originalname);
    },
  });

  return multer({
    storage,
    limits: {
      fileSize: 10 * 1024 * 1024,
    },
  });
}
