module.exports = {
    webpack: {
        configure: webpackConfig => {
            webpackConfig.module.rules.push({
                test: /\.styles.scss$/,
                exclude: /node_modules/,
                use: [
                  "sass-to-string",
                  {
                    loader: "sass-loader",
                    options: {
                      sassOptions: {
                        outputStyle: "compressed",
                      },
                    },
                  },
                ],
              });
            return webpackConfig;
        }
    }
}