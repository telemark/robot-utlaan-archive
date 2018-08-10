const saveFile = require('../save-file')
const logger = require('../logger')
const { DONE_DIRECTORY_PATH } = require('../../config')

module.exports = async data => {
  logger('info', ['save-to-done', data._id])
  const filePath = `${DONE_DIRECTORY_PATH}/${data._id}.json`
  await saveFile(filePath, data)
  return data
}
