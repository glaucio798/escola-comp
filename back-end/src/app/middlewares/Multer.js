import multer from 'multer';
import Slugify from '@/utils/Slugify';

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/arquivos');
  },
  filename: (req, file, cb) => {
    const split = file.originalname.split('.');
    const filename = split[0];
    const extension = split[split.length - 1];
    cb(null, `${Slugify(filename)}-${new Date().getTime()}.${extension}`);
  },
});

export default multer({ storage });
