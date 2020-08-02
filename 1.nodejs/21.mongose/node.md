## mac 安装
```shell
brew tap mongodb/brew # 更新源
brew install mongodb-community # 安装 mongoDB
brew services start mongodb-community # 启动 mongoDB

brew services stop mongodb-community # 关闭 mongoDB
```


## 连接 mongo


默认会执行一条命令
- 服务端 mongod
- 客户端 mongo
- CONF文件位置 -> /usr/local/etc/mongod.conf



```shell
PATH:/Server/4.2/binmongod --config PATH/Server/4.2/bin/mongod.cfg
```

```shell
mongod --dbpath=/var/mongo/datat --port 27017 # 手动启动服务端 默认端口27017
mongo --port 27017 # 手动启动客户端，默认端口27017
```

## mysql mongo redis
- mysql oracle sqlServer: 关系型数据库，用关系模型来组织数据库的。（查询的时候方便 不方便扩展）
- mongo redis: 非关系型数据库 查询速度快（存储的数据不是按照特定规则存放） 扩展性高 集群
- 数据操作： mongo存储的数据类型丰富（对象，数组） mongo 稳定性差 容易丢数据 概率低
- 查询操作多的情况用mysql 爬虫 mongo存储方便 不需要按照固定结构来存储
- mongo 操作非常简单，像操作js一样 （支持类型的嵌套）
- redis 内存性 速度快 （存储的数据比较弱 不支持嵌套类型）

mysql 数据库 => 表 => 行、列
mongo 数据库 => 集合 => 文档

## mongo 的使用
- show dbs ： 查询所有的数据库
- use admin ： 使用库
- show collections : 查询数据库中所有的集合
- db.集合名.find() 查询当前集合中的内容
- db.createUser()


## 创建用户

在CONF配置文件配置 开启 密码登录
```
security:
  authorization: enabled
```


```mongodb
db.createUser({user:"neo", pwd:"abcd1234",roles:[{role:'root',db:'main'}]})
db.createUser({user:"zhu", pwd:"zhu",roles:[{role:'dbOwner',db:'zhufeng'}]})
db.auth('neo','abcd1234')
```

## 连接数据库
mongo 数据库名 -u 用户名 -p 密码
mongo zhufeng -u zhu -p zhu

> 可视化工具连接数据库 navicat robomongo


## mongo 的基本操作
- 增删改查

- db.collection.find()
查询时可以指定显示的字段 {name:0, age:0}
> 0 和 1不能同时出现，(特例：不过 _id 可以为0)
name:0 表示不显示 name 其他字段需要要显示
- $inc: {age: 10}    age 增加 10
- $set: {hobby: []}  新增一个字段 hobby 值为 []
- $push: ${hobby: 1} 往 hobby 里 最后一项添加 一个值
- $pop: ${hobby: 1} 往 hobby 里 取出最后一个值


分页查询
> db.user.find().limit(2)
> db.user.find().limit(2).skip(2).sort({age:-1})



- db.collection.insert() _id 为自动生成
- db.collection.remove(查询条件)
- db.collection.update(查询条件，修改的内容)

默认 update 值修改一条数据， 如果想修改多条 必须增加 {multi: true}，得配合 $set 来使用
```
db.user.update({name:/zf/}, {$set:{hobby:[]}}, {multi:true})
```

## mongo导出结果

- mongoexport -u 用户名 -p 密码 -d 数据库 -c 集合 --csv -f 格式化 -o xxx.csv


## mongoose
- mongodb node默认可以使用 mongodb 包来操作
- mongoose
让我们这种非关系型数据按照一定格式来存储 并且方便查询换做限制 orm 工具
语法和原生的mongo非常的接近 node中如何操作mongo