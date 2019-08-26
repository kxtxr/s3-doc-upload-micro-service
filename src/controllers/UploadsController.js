import { S3Adapter } from '../adapters'
import multer from 'multer'
let upload = multer()

export default function UploadsController(app) {
  app.post('/uploads/single', upload.single('upload'), async(req, res, next) => {
    const s3Adapter = new S3Adapter()
    try {
      let result = await s3Adapter._uploadSingleAsset(req.file.buffer, req.file.originalname)
      res.status(200).json(result)
    } catch (error) {
      res.status(500).json(error)
    }
  })
}