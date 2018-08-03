# stomp-sockjs-webSocket
## 基于stomp+sockjs的前端webSocket监听封装demo
```
订阅一个的时候的使用方法
// path为需要订阅的url

let path = `/xxx`

let scb = (msg) => {
  console.log('msg', msg) // 返回已经解析的数据
}

connect({client: 'ClientA', path, scb})
```
### 当需要`订阅多个`的时候
```
let scb1 = (msg) => { // 订阅一成功后需要处理的逻辑
  console.log('msg', msg)
}

let scb2 = (msg) => { // 订阅二成功后需要处理的逻辑
  console.log('msg', msg)
}

此时第二个参数subscribeData必须为数组

let subscribeData = [
  {
    path: `/topic`,
    scb: scb1
  },
  {
    path: `/topic`,
    scb: scb2
  }
]

connect({client: 'ClientA', subscribeData})
```
### `sendMessage`发送消息方法
```
let path = `/path1`

// 根据页面需要传递parm参数 如果不需要不用传递 不传组件默认按照{}处理

let parm = {
  key1: 'xx',
  key2: 'xx'
}
sendMessage({client: 'ClientA', path, parm})
```
### `disconnect`断开连接方法
```
此时的client和connect传的一致

disconnect({client: 'ClientA'})
```
