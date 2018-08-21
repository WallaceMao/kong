const config = require('config')

let OSS = require('ali-oss')

const region = config.oss.region
const bucket = config.oss.bucket
let client = new OSS({
  region: region,
  accessKeyId: config.oss.userId,
  accessKeySecret: config.oss.secret,
  bucket: bucket,
  internal: true  // 走内网
})

const OSS_READ_ROOT = config.oss.readRoot  //这里会使用cdn的路径作为读的根目录
const OSS_ROOT = `https://${bucket}.${region}.aliyuncs.com`
const streamUpload = async (key, stream) => {
    // use 'chunked encoding'
    // const stream = fs.createReadStream('doodle.png');
    return client.putStream(key, stream);
    // don't use 'chunked encoding'
    // let stream = fs.createReadStream('local-file');
    // let size = fs.statSync('local-file').size;
    // let result = await client.putStream(
    //   'object-key', stream, {contentLength: size});
    // console.log(result);
}

module.exports.streamUpload = streamUpload
module.exports.OSS_ROOT = OSS_ROOT
module.exports.OSS_READ_ROOT = OSS_READ_ROOT