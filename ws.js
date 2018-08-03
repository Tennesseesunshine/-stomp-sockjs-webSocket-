import SockJS from 'sockjs-client'
import Stomp from '@stomp/stompjs'

const websocketUrlHttpPrefix = window.config.websocketUrlHttpPrefix
const projectName = window.config.projectName

let reconnection = {}
/**
 * 创建websocket连接并订阅广播消息
 */
let connect = options => {
  reconnection = options
  let socket = new SockJS(
    websocketUrlHttpPrefix + projectName + '/xxx'
  )
  options.client = Stomp.over(socket)
  options.client.connect(
    {},
    function (frame) {
      if (Array.isArray(options.subscribeData)) {
        options.subscribeData.forEach(item => {
          options.client.subscribe(item.path, function (msg) {
            console.log(JSON.parse(msg.body) + '==========================')
            item.scb && item.scb(JSON.parse(msg.body))
          })
        })
      } else if (options.path && typeof options.path === 'string') {
        options.client.subscribe(options.path, function (msg) {
          console.log(JSON.parse(msg.body) + '==========================')
          options.scb && options.scb(JSON.parse(msg.body))
        })
      }
    },
    onError
  )
}

/**
 * 错误处理
 */

let onError = err => {
  let checkSessionThrough = true
  console.log(typeof err)
  if (checkSessionThrough) {
    connect(reconnection)
  }
}

/**
 * 断开websocket连接
 * @returns
 */
let disconnect = options => {
  if (options.client != null) {
    options.client.disconnect()
  }
  console.log('Disconnected')
}

/**
 * 通过websocket发送消息到controller
 * @returns
 */
let sendMessage = options => {
  console.log('通过websocket发送消息到controller')
  options.client.send(options.path, {}, JSON.stringify(options.parm || {}))
}

export { connect, disconnect, sendMessage }
