module.exports = {
  JOBS_DIRECTORY_PATH: process.env.JOBS_DIRECTORY_PATH || 'test/directories/jobs',
  DONE_DIRECTORY_PATH: process.env.JOBS_DIRECTORY_PATH || 'test/directories/done',
  PAPERTRAIL_HOSTNAME: process.env.PAPERTRAIL_HOSTNAME || 'robot-utlaan-archive',
  PAPERTRAIL_HOST: process.env.PAPERTRAIL_HOST || 'logs.papertrailapp.com',
  PAPERTRAIL_PORT: process.env.PAPERTRAIL_PORT || 12345,
  p360: {
    user: process.env.P360WS_USER || 'domain/username', // username
    password: process.env.P360WS_PASSWORD || 'yXq8wz', // passord
    baseUrl: process.env.P360WS_BASEURL || 'http://tfk-fh-siweb01.login.top.no:8088/SI.WS.Core/SIF/',
    options: {
      ignoredNamespaces: true
    }
  }
}
