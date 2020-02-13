const sass = require('node-sass');
const sassUtils = require('node-sass-utils')(sass);
const fse = require('fs-extra');

module.exports = {
  onPostBootstrap: ({ getNode }, configOptions) => {
    const result = sass.renderSync({
      file: configOptions.inputFile,
      outFile: configOptions.outputFile,
      functions: {
        'getPaletteKey($key)': function(sassKey) {
          function hexToRgb(hex) {
            // Expand shorthand form (e.g. "03F") to full form (e.g. "0033FF")
            const shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
            hex = hex.replace(shorthandRegex, function(m, r, g, b) {
              return r + r + g + g + b + b;
            });

            const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(
              hex
            );
            return result
              ? {
                  r: parseInt(result[1], 16),
                  g: parseInt(result[2], 16),
                  b: parseInt(result[3], 16),
                }
              : null;
          }
          const siteMetadata = getNode('Site').siteMetadata;
          const sassParams = siteMetadata.palettes[siteMetadata.palette].sass;
          const key = sassKey.getValue();
          const value = sassParams[key];
          const colorRegExp = /^#(?:[a-f\d]{3}){1,2}$/i;
          let result;
          if (colorRegExp.test(value)) {
            result = hexToRgb(value);
            result = new sass.types.Color(result.r, result.g, result.b);
          } else {
            result = sassUtils.castToSass(value);
          }
          return result;
        },
      },
    });
    fse.outputFileSync(configOptions.outputFile, result.css);
  },
};
