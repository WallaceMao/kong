const fs = require('fs')
const path = require('path')

const environmentMap = {}
/**
 * 加载所有的rule
 */
const loadAllEnvironments = app => {
  fs.readdirSync(path.join(__dirname, '.')).forEach(fileName => {
    const filePath = path.join(__dirname, fileName)
    const stats = fs.lstatSync(filePath)
    // 筛选出目录文件，在目录文件下查找index.js文件
    if(stats.isDirectory() && fs.existsSync(path.join(filePath, 'index.js'))){
      const env = require(path.join(filePath, 'index.js'))
      environmentMap[fileName] = env.install(app)
      global.logger.info(`${fileName} environment installed`)
    }
  })
}

const init = async app => {
  loadAllEnvironments(app)
}

const getService = async (envName) => {
  return environmentMap[envName]
}

module.exports.init = init
module.exports.getService = getService
