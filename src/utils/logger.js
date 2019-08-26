import log4js from 'log4js'
log4js.configure({
  appenders: { app: { type: 'file', filename: 'logs/application.log' } },
  categories: { default: { appenders: ['app'], level: 'all' } }
})
const logger = log4js.getLogger('app');
export default logger