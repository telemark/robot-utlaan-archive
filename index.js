//require('dotenv').config()
const getNextJobFromQueue = require('./lib/steps/get-next-job-from-queue')
const archive360 = require('./lib/steps/archive-360')
const signoff360 = require('./lib/steps/signoff-360')
const saveToDone = require('./lib/steps/save-to-done')
const removeFromQueue = require('./lib/steps/remove-from-queue')
const logger = require('./lib/logger')

logger('info', ['index', 'start'])

getNextJobFromQueue()
  .then(archive360)
  .then(signoff360)
  .then(saveToDone)
  .then(removeFromQueue)
  .catch(error => {
    logger('error', ['index', 'error', JSON.stringify(error && error.message ? error.message : error)])
    process.exit(1)
  })
