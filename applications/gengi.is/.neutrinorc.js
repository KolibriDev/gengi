// prettier-ignore
module.exports = {
  use: [
    'tux/neutrino',
    ({ config }, options = {}) =>
      config.module
        .rule('sass-style')
          .test(/\.scss$/)
            .use('style')
              .loader(require.resolve('style-loader'))
            .end()
            .use('css')
              .loader(require.resolve('css-loader'))
            .end()
            .use('scss')
              .loader(require.resolve('sass-loader'))
              .options({
                data: '@import "styles/variables";',
                includePaths: [
                  '../../node_modules',
                  './src'
                ],
              })
            .end()

    // Compile source files for shared components as well

  ],
}
