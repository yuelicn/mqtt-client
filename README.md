# mqtt-client
mqtt 客户端sdk 实现            

1: 实现 websocket javaScript 端连接                 
第一步引入 js 文件

```
<script src="./js/mqttws31.js"type="text/javascript"></script>
<script src="./js/main.js" type="text/javascript"></script>

```
examples

```
  ／／加载配置项
  config = {
    		host: '172.16.192.10X',
    		port: 9001,
    		topic: '#',client.connect();
    		useTLS: false,
    		userName: null,
    		password: null,
    		cleansession: true
    }
    ／／连接消息服务
    var client = new websocket(config);
    client.connect();
    ／／发送消息函数
    client.sendMessage(topic, message);
    ／／ 订阅消息回调函数
    function messageCallback(topic, payload){
		／／业务处理
	}
	／／处理错误信息回调函数
    function fialdMessageCallback(errorMessage, type){
	／／错误信息回调函数
	}

```
