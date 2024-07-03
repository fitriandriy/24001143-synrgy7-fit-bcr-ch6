const multer = require('multer')
const path = require('path')

const PUBLIC_DIR = path.join(__dirname, '../../public')
const UPLOAD_DIR = path.join(PUBLIC_DIR, 'uploads')

const storage = multer.diskStorage({
  destination: (req: any, file: any, cb: any) => {
    cb(null, UPLOAD_DIR) 
  },
  filename: (req: any, file: any, cb: any) => {
    const id = Math.random()
    cb(null, id + path.extname(file.originalname))
  },
})

export = multer({storage})