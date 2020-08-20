const redis = require('./redis');


(async () => {
  // await redis.set('user', { name: 'haha', age: 10, beauty: true }, { expire: 3 })
  // let r = await redis.get('user')
  // console.log(r)

  // setInterval(async () => {
  //   let t = await redis.get('user')
  //   console.log(t)
  // }, 1000);

  // await redis.set('number', 1)

  // const multi = client.multi();

  // setInterval(async () => {
  //   try {
  //     let t = await redis.incr('count_test')
  //     console.log(t)
  //   } catch (e) {
  //     console.log(e)
  //   }
  // }, 1000)

  // await redis.del('count_test')

  // let t = await redis.get('count_test')
  // console.log(t)


  // for (let i = 0; i < 100; i++) {
  //   await redis.set('user_id_' + i, i)
  // }

  //  await redis.delPattern('user_id_*')
  let t = await redis.delPattern('user_id_*')
  console.log(t)

  t = await redis.keys('user*')
  console.log(t)




})()

