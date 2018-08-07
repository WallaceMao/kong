const config = require('config')

let OSS = require('ali-oss')

const region = 'oss-cn-beijing'
const bucket = 'kong-user'
let client = new OSS({
  region: region,
  accessKeyId: config.oss.userId,
  accessKeySecret: config.oss.secret,
  bucket: bucket
})

const OSS_ROOT = `https://${bucket}.${region}.aliyuncs.com`
const streamUpload = async (key, stream) => {
    // use 'chunked encoding'
    // const stream = fs.createReadStream('doodle.png');
    await client.putStream(key, stream);
    // don't use 'chunked encoding'
    // let stream = fs.createReadStream('local-file');
    // let size = fs.statSync('local-file').size;
    // let result = await client.putStream(
    //   'object-key', stream, {contentLength: size});
    // console.log(result);
}

module.exports.streamUpload = streamUpload
module.exports.OSS_ROOT = OSS_ROOT