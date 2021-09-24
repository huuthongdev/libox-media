import { Router } from "express";
import multer from 'multer';
import { Configs, ServerError, StringUtils } from "../../refs";

const uploadRouter = Router();

const storage = multer.diskStorage({
    destination: 'uploads',
    filename: function (req: any, file, cb) {
        let fileName = StringUtils.toSlug(file.originalname);
        const dotIndex = file.originalname.lastIndexOf('.');
        const fileExtension = file.originalname.substring(dotIndex + 1);
        fileName = `${fileName.replace(`.${fileExtension}`, '')}-${Date.now()}.${fileExtension}`;
        req.response = {
            fileName,
            url: `${Configs.PUBLIC_URL}/${fileName}`
        };
        cb(null, fileName);
    },
})

const upload = multer({
    storage,
    limits: {
        fileSize: 1024 * 1024 * 5 // 5MB
    },
    fileFilter: (_, file, cb) => {
        const mimetypesAccepted = [
            'image/jpeg',
            'image/gif',
            'image/png',
            'image/svg+xml',
            'application/msword',
            'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
            'image/vnd.microsoft.icon',
            'audio/mpeg',
            'video/mpeg',
            'application/pdf',
            'application/vnd.ms-excel',
            'application/octet-stream',
        ]
        // @ts-ignore
        if (!mimetypesAccepted.includes(file.mimetype)) return cb(new ServerError('Định dạng file không được chấp nhận', 400), false)
        return cb(null, true)
    }
});

uploadRouter.post('/', (req: any, res: any) => {
    upload.single('file')(req, res, err => {
        if (!err) return res.send(req.response);
        // ======================= Handle Error =======================
        if (err.code === 'LIMIT_FILE_SIZE') return res.onError(new ServerError('Kích thước tệp không được vượt quá 5MB', 400))
        return res.onError(new ServerError(err.message, err.status));
    })
})

export default uploadRouter