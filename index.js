const plugin = require('tailwindcss/plugin');

module.exports = plugin(function ({ addVariant, e, postcss }) {
  addVariant('scaled', ({ container, separator }) => {
    const mediaQuery = postcss.atRule({
      name: 'media',
      params: [
        '(-webkit-min-device-pixel-ratio: 1.25)',
      ].join(),
    });
    mediaQuery.append(container.nodes);
    container.append(mediaQuery);
    mediaQuery.walkRules(rule => {
      rule.selector = `.${e(`scaled${separator}${rule.selector.slice(1)}`)}`;
    });
  });
});
