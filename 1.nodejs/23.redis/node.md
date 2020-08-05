### Mac安装 和 启动
```shell
brew install redis # 安装  
brew services start redis  # 启动
```


### redis 常见使用
```shell
redis-cli
set a 1 # 设置 a 的值 1
get a # 获取 a 的值
incr a # a 自增
decr a # a 自减

# 常用
exists a # a 是否存在 返回1表示存在 0 表示不存在
expire a 10 # 设置过期时间 返回1表示设置成功
ttl a # 查看存活时间 到达存活时间 返回 -2 ，而且 a 的值就已经是 null 了
keys * # 查看所有的键
flushall # 清空所有
```

> 基本上就只会使用 get 和 set


### redis 不常见使用
1. 存对象(hash)
```shell
hset person name zf # {person: {name: "zf"}}
hset person age 10 # {person: {name: "zf", age: 10}}
hget person name # zf
hget person age # 10
hgetall person # name zf age 10
```

2. 存数组
```shell
lpush arr 1 # arr = [1]
lpush arr 2 # arr = [1,2]
lrange arr 0 5
```


### redis 设置密码
```
config set requirepass 'password'
```