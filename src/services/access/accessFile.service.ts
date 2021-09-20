import sharp from 'sharp';
import { Response } from 'express';

export default class AccessFileService {
    static async process(fileName: string, query: any, res: Response) {
        const { fit, size } = query;
        const path = process.env.PWD + `/uploads/${fileName}`;
        const dotIndex = fileName.lastIndexOf('.');
        const fileExtension = fileName.substring(dotIndex + 1);

        if (size && ['jpeg', 'png', 'jpg'].includes(fileExtension)) {
            // ======================= Validate Fit =======================
            if (fit && !['cover', 'contain', 'fill', 'inside', 'outside'].includes(fit)) {
                return res.status(400).send({ message: 'Query fit invalid.' })
            }

            // ======================= Validate Size =======================
            const xIndex = size.lastIndexOf('x');
            const width = size.substr(0, xIndex);
            const height = size.substring(xIndex + 1);

            if (xIndex === -1 || isNaN(+width) || isNaN(+height)) return res.status(400).send({ message: 'Invalid size.' })

            // ======================= Resize =======================
            return sharp(path)
                .resize(+width || null, +height || null, {
                    fit: fit || 'cover'
                })
                .pipe(res)
        }

        return res.sendFile(path, { maxAge: 1000 * 60 * 30 }, (err: any) => {
            if (err && err.status === 404) return res.status(404).send({ message: 'Không tìm thấy file.' })
            res.status(500).send(err)
        }
        );
    }
}