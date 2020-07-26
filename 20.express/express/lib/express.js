const Application = require('./application');

// 只要逻辑比较多 都要通过类来封装 
function createApplication() { // 创建应用
  return new Application(); // 应用分离，专门提供一个类来进行应用的实例化
}
module.exports = createApplication;