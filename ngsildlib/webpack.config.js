function configNode() {
  return {
    module: {
      rules: [{
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      }]
    },
    externals: {
      lodash: {
        commonjs2: 'lodash'
      },
      jsonld: {
        commonjs2: 'jsonld'
      },
      axios: {
        commonjs2: 'axios'
      },
      express: {
        commonjs2: 'express'
      },
      http: {
        commonjs2: 'http'
      },
      'body-parser': {
        commonjs2: 'body-parser'
      }
    },
    resolve: {
      modules: ['node_modules']
    },
    output: {
      filename: 'ngsildlib.commonjs2.js',
      library: 'NGSILDlib',
      libraryTarget: 'commonjs2'
    }
  }
}

function configBrowser() {
  return {
    entry: './src/index_browser.js',
    module: {
      rules: [{
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      }]
    },
    externals: {
      lodash: {
        var: '_'
      },
      jsonld: {
        var: 'jsonld'
      },
      axios: {
        var: 'axios'
      }
    },
    output: {
      filename: 'ngsildlib.var.js',
      library: 'NGSILDlib',
      libraryTarget: 'var'
    }
  }
}

module.exports = [
  configBrowser(),
  configNode()
]