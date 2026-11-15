import fs from 'fs';
import path from 'path';
import multer from 'multer';
import { StatusCodes, ReasonPhrases } from 'http-status-codes';
import { AppError } from '../utils/Request_Response_Classes.js';

const ALLOWED_TYPES = {
  // images
  'image/jpeg': ['.jpg', '.jpeg'],
  'image/png': ['.png'],
  'image/gif': ['.gif'],
  'image/webp': ['.webp'],
  // documents
  'application/pdf': ['.pdf'],
  'application/msword': ['.doc'],
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx'],
  'text/plain': ['.txt'],
};

function fileFilter(req, file, cb) {
  const ext = path.extname(file.originalname).toLowerCase();
  const allowedExts = ALLOWED_TYPES[file.mimetype];

  if (allowedExts && allowedExts.includes(ext)) {
    return cb(null, true);
  }

  cb(
    new AppError(
      StatusCodes.UNSUPPORTED_MEDIA_TYPE,
      'Only images and documents are allowed',
      'Unsupported file type',
      ReasonPhrases.UNSUPPORTED_MEDIA_TYPE
    )
  );
}

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
    fileFilter,
    limits: {
      fileSize: 10 * 1024 * 1024,
    },
  });
}
