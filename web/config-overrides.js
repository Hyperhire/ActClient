const { override, fixBabelImports } = require('customize-cra');

module.exports = override(
  fixBabelImports('import', {
    libraryName: '@material-ui/core',
    libraryDirectory: 'components', // default: lib
    camel2DashComponentName: false, // default: true
  }),
);
