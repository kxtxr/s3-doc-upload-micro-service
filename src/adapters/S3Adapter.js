import { S3 } from 'aws-sdk'

export default class S3Adapter {
  constructor() {
    this.s3 = new S3({
      params: {
        Bucket: process.env.S3_BUCKET,
        ACL: 'public-read'
      }
    })
  }

  _generateFileKey(filename) {
    return `S3DOCMS-UPLOADS/S3DOCMS-${Date.now().toString()}${filename}`
  }

  _uploadSingleAsset(buffer, filename) {
    return new Promise((resolve, reject) => {
      let params = { Key: this._generateFileKey(filename), Body: buffer }
      this.s3.upload(params, (err, data) => {
        if (err) {
          reject({ status: 'failed', error: err.stack })
        } else {
          resolve({ status: 'success', url: data.Location })
        }
      }).on('httpUploadProgress', function(evt) {
        console.log('Progress:', evt.loaded, '/', evt.total);
      })
    })
  }
}