import path from 'path';
import multer from 'multer';

export default class FileMiddleware {
    public static readonly memoryLoader = multer({
      storage: multer.memoryStorage(),
      limits: {
        fileSize: 16 * 1024 * 1024, // 2 MByte
      },
    });
  
    public static readonly diskLoader = multer({
      storage: multer.diskStorage({ // notice you are calling the multer.diskStorage() method here, not multer()
        destination: function(_req, _file, cb) {
            cb(null, 'uploads/')
        },
        //filename: function(_req, file, cb) {
        //    cb(null, file.fieldname + '-' + Date.now())
        //}
    }),
      limits: {
        //fileSize: 8388608, // 64 MByte
        //fieldSize: 8 * 1024 * 1024
      },
    });
  }