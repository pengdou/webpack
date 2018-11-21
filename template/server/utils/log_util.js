var log4js = require('log4js')

var logConfig = require('../config/log_config')

// 加载配置文件
log4js.configure(logConfig)

var logUtil = {}
// 调用预先定义的日志名称
var resLogger = log4js.getLogger('resLogger')
var errorLogger = log4js.getLogger('errorLogger')
var debugLogger = log4js.getLogger('debugLogger')
var consoleLogger = log4js.getLogger()

// 封装错误日志
logUtil.error = function (ctx, error, resTime) {
  if (ctx && error) {
    errorLogger.error(formatError(ctx, error, resTime))
  }
}
// 封装debug日志
logUtil.debug = function (info) {
  if (info) {
    debugLogger.debug(formatDebug(info))
  }
}

// 封装响应日志
logUtil.resp = function (ctx, resTime) {
  if (ctx) {
    resLogger.info(formatRes(ctx, resTime))
  }
}

logUtil.info = function (info) {
  if (info) {
    consoleLogger.info(formatInfo(info))
  }
}

var formatInfo = function (info) {
  var logText = String()
  // 响应日志开始
  // logText += "\n" + "**************info log start ***************" + "\n"
  // 响应内容
  // logText += "info detail: " + "\n" + JSON.stringify(info) + "\n"
  if (typeof (info) === 'string') {
    logText += info
  } else {
    logText += JSON.stringify(info)
  }
  // 响应日志结束
  // logText += "*************** info log end ***************" + "\n"
  return logText
}

var formatDebug = function (info) {
  var logText = String()
  // 响应日志开始
  // logText += "\n" + "**************info log start ***************" + "\n"
  // 响应内容
  // logText += "info detail: " + "\n" + JSON.stringify(info) + "\n"
  if (typeof (info) === 'string') {
    logText += info
  } else {
    logText += JSON.stringify(info)
  }
  // 响应日志结束
  // logText += "*************** info log end ***************" + "\n"
  return logText
}

// 格式化响应日志
var formatRes = function (ctx, resTime) {
  var logText = String()
  // 响应日志开始
  logText += '\n' + '*************** response log start ***************' + '\n'

  // 添加请求日志
  logText += formatReqLog(ctx.request, resTime)

  // 响应状态码
  logText += 'response status: ' + ctx.status + '\n'

  // 响应内容
  logText += 'response body: ' + '\n' + JSON.stringify(ctx.body) + '\n'

  // 响应日志结束
  logText += '*************** response log end ***************' + '\n'

  return logText
}

// 格式化错误日志
var formatError = function (ctx, err, resTime) {
  var logText = String()

  // 错误信息开始
  logText += '\n' + '*************** error log start ***************' + '\n'

  // 添加请求日志
  logText += formatReqLog(ctx.request, resTime)

  // 错误名称
  logText += 'err name: ' + err.name + '\n'
  // 错误信息
  logText += 'err message: ' + err.message + '\n'
  // 错误详情
  logText += 'err stack: ' + err.stack + '\n'

  // 错误信息结束
  logText += '*************** error log end ***************' + '\n'

  return logText
}

// 格式化请求日志
var formatReqLog = function (req, resTime) {
  var logText = String()

  var method = req.method
  // 访问方法
  logText += 'request method: ' + method + '\n'

  // 请求原始地址
  logText += 'request originalUrl:  ' + req.originalUrl + '\n'

  // 客户端ip
  logText += 'request client ip:  ' + req.ip + '\n'

  // 开始时间
  // var startTime
  // 请求参数
  if (method === 'GET') {
    logText += 'request query:  ' + JSON.stringify(req.query) + '\n'
    // startTime = req.query.requestStartTime
  } else {
    logText += 'request body: ' + '\n' + JSON.stringify(req.body) + '\n'
    // startTime = req.body.requestStartTime
  }
  // 服务器响应时间
  logText += 'response time: ' + resTime + '\n'

  return logText
}

module.exports = logUtil
