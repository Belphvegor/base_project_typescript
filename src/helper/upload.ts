import multer from 'multer';

export const configStorage = (location: string) => {
    return multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, location)
        },
        filename: function (req, file, cb) {
            let uniqueSuffix = Date.now()
            let org_file_name = file.originalname
            let re_file = org_file_name.split('.')
            let file_name = re_file[0]
            let final_name
            final_name = `${file_name}.${re_file[1]}`
            cb(null, final_name)
        }
    })
}

export const validation_type = (extension: string) => {
    return (req: any, file: any, cb: any) => {
        if (extension === 'rar') {
            let type = file.mimetype == 'application/zip' || file.mimetype == 'application/x-rar-compressed' || file.mimetype == 'application/x-zip-compressed'
            if (type) {
                cb(null, true);
            } else {
                cb(null, false);
            }
        }
    }
}
