import fs from 'fs';
import path from 'path';

export default (filePath) => {
  if (fs.existsSync(filePath)) {
    return fs.unlinkSync(path.resolve(filePath));
  }
};
