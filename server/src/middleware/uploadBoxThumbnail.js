import multer from "multer";
import { FILE_SIZE_LIMIT, PORT } from "../env.js";

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/img/boxes');
    },
    filename: function (req, file, cb) {
        const extension = file.originalname.split('.').at(-1);
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E6);
        const newFileName = 'box-' + uniqueSuffix + '.' + extension;
        req.newFileName = newFileName;
        cb(null, newFileName);
    },
});

export const uploadBoxThumbnailImage = multer({
    storage: storage,
    limits: {
        fileSize: FILE_SIZE_LIMIT,
    },
});