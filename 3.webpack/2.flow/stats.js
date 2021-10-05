const stats = {
  errors: [], // 发生了哪些错误
  warnings: [], // 发生了哪些警告
  version: '4.44.2', // webpack 版本号
  hash: 'a764e0a5d2d98ed67325', // 本次编译的 hash 值
  time: 65, // 编译花了多长时间
  builtAt: 1601603063894, // 编译的时间戳
  publicPath: '', // 打包后的文件访问路径
  outputPath: '/Users/neo/Desktop/road/3.webpack/2.flow/dist', // 打包后的文件写入到哪个目录里
  assetsByChunkName: { main: 'bundle.js' }, // 代码块的名字:产出资源的名字
  assets: [ // 产出资源的文件
    {
      name: 'bundle.js',
      size: 3827,
      chunks: ['main'],
      chunkNames: ['main'],
      info: {},
      emitted: true,
      isOverSizeLimit: undefined
    },
    {
      name: 'index.html',
      size: 339,
      chunks: [],
      chunkNames: [],
      info: {},
      emitted: true,
      isOverSizeLimit: undefined
    }
  ],
  filteredAssets: 0,
  entrypoints: {  // 入口文件
    main: {
      chunks: ['main'],
      assets: ['bundle.js'],
//       children: [Object: null prototype] {},
// childAssets: [Object: null prototype] {},
// isOverSizeLimit: undefined
    }
  },
  namedChunkGroups: { // 分组
    main: {
      chunks: ['main'],
      assets: ['bundle.js'],
      //   children: [Object: null prototype] {},
      // childAssets: [Object: null prototype] {},
      // isOverSizeLimit: undefined
    }
  },
  chunks: [ // 代码块
    {
      id: 'main',
      rendered: true,
      initial: true,
      entry: true,
      recorded: undefined,
      reason: undefined,
      size: 20,
      names: ['main'],
      files: ['bundle.js'],
      hash: '4b13c771cfa7e57bb30c', // 每个代码块都有自己的hash值
      siblings: [],
      parents: [],
      children: [],
      // childrenByOrder: [Object: null prototype] {},
      modules: [
        {
          id: './src/index.js',
          identifier: '/Users/neo/Desktop/road/3.webpack/2.flow/src/index.js',
          name: './src/index.js',
          index: 0,
          index2: 0,
          size: 20,
          cacheable: true,
          built: true,
          optional: false,
          prefetched: false,
          chunks: ['main'],
          issuer: null,
          issuerId: null,
          issuerName: null,
          issuerPath: null,
          profile: undefined,
          failed: false,
          errors: 0,
          warnings: 0,
          assets: [],
          reasons: [[Object]],
          providedExports: null,
          optimizationBailout: [],
          depth: 0,
          source: 'console.log("hello")'
        }
      ],
      filteredModules: 0,
      origins: [
        {
          moduleId: undefined,
          module: '',
          moduleIdentifier: '',
          moduleName: '',
          loc: 'main',
          request: './src/index.js',
          reasons: []
        }
      ]
    }
  ],
  modules: [
    {
      id: './src/index.js',
      identifier: '/Users/neo/Desktop/road/3.webpack/2.flow/src/index.js',
      name: './src/index.js',
      index: 0,
      index2: 0,
      size: 20,
      cacheable: true,
      built: true,
      optional: false,
      prefetched: false,
      chunks: ['main'],
      issuer: null,
      issuerId: null,
      issuerName: null,
      issuerPath: null,
      profile: undefined,
      failed: false,
      errors: 0,
      warnings: 0,
      assets: [],
      reasons: [
        {
          moduleId: null,
          moduleIdentifier: null,
          module: null,
          moduleName: null,
          type: 'single entry',
          explanation: undefined,
          userRequest: './src/index.js',
          loc: 'main'
        }
      ],
      providedExports: null,
      optimizationBailout: [],
      depth: 0,
      source: 'console.log("hello")'
    }
  ],
  filteredModules: 0,
  logging: {
    'webpack.buildChunkGraph.visitModules': { entries: [], filteredEntries: 2, debug: false }
  },
  children: [
    {
      errors: [],
      warnings: [],
      publicPath: '',
      outputPath: '/Users/neo/Desktop/road/3.webpack/2.flow/dist',
      assetsByChunkName: { HtmlWebpackPlugin_0: '__child-HtmlWebpackPlugin_0' },
      assets: [
        {
          name: '__child-HtmlWebpackPlugin_0',
          size: 4642,
          chunks: ['HtmlWebpackPlugin_0'],
          chunkNames: ['HtmlWebpackPlugin_0'],
          info: {},
          emitted: false,
          isOverSizeLimit: undefined
        }
      ],
      filteredAssets: 0,
      entrypoints: {
        HtmlWebpackPlugin_0: {
          chunks: ['HtmlWebpackPlugin_0'],
          assets: ['__child-HtmlWebpackPlugin_0'],
//         children: [Object: null prototype] {},
// childAssets: [Object: null prototype] {},
          isOverSizeLimit: undefined
        }
      },
      namedChunkGroups: {
        HtmlWebpackPlugin_0: {
          chunks: ['HtmlWebpackPlugin_0'],
          assets: ['__child-HtmlWebpackPlugin_0'],
          //   children: [Object: null prototype] {},
          // childAssets: [Object: null prototype] {},
          isOverSizeLimit: undefined
        }
      },
      chunks: [
        {
          id: 'HtmlWebpackPlugin_0',
          rendered: true,
          initial: true,
          entry: true,
          recorded: undefined,
          reason: undefined,
          size: 563,
          names: ['HtmlWebpackPlugin_0'],
          files: ['__child-HtmlWebpackPlugin_0'],
          hash: 'fbff300e34f54d055121',
          siblings: [],
          parents: [],
          children: [],
//     childrenByOrder: [Object: null prototype] {},
// modules: [ [Object] ],
          filteredModules: 0,
          origins: [[Object]]
        }
      ],
      modules: [
        {
          id: './node_modules/html-webpack-plugin/lib/loader.js!./src/index.html',
          identifier: '/Users/neo/Desktop/road/3.webpack/2.flow/node_modules/html-webpack-plugin/lib/loader.js!/Users/neo/Desktop/road/3.webpack/2.flow/src/index.html',
          name: './node_modules/html-webpack-plugin/lib/loader.js!./src/index.html',
          index: 0,
          index2: 0,
          size: 563,
          cacheable: true,
          built: true,
          optional: false,
          prefetched: false,
          chunks: ['HtmlWebpackPlugin_0'],
          issuer: null,
          issuerId: null,
          issuerName: null,
          issuerPath: null,
          profile: undefined,
          failed: false,
          errors: 0,
          warnings: 0,
          assets: [],
          reasons: [[Object]],
          providedExports: null,
          optimizationBailout: [],
          depth: 0,
          source: 'var _ = __non_webpack_require__("/Users/neo/Desktop/road/3.webpack/2.flow/node_modules/lodash/lodash.js");module.exports = function (templateParams) { with(templateParams) {return (function(data) {\n' +
            "var __t, __p = '';\n" +
            `__p += '<!doctype html>\\n<html lang="en">\\n<head>\\n  <meta charset="UTF-8">\\n  <meta name="viewport" content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">\\n  <meta http-equiv="X-UA-Compatible" content="ie=edge">\\n  <title>webpack</title>\\n</head>\\n<body>\\n\\n</body>\\n</html>';\n` +
            'return __p\n' +
            '})();}}'
        }
      ],
      filteredModules: 0,
      logging: {
        'webpack.buildChunkGraph.visitModules': { entries: [], filteredEntries: 2, debug: false }
      },
      children: [],
      name: 'HtmlWebpackCompiler'
    }
  ]
}
