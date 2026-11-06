module.exports = {
  ignoreFiles: ['src/app/icon.svg'],
  rules: {
    'color-no-hex': true,
    'declaration-property-value-disallowed-list': {
      color: [/(?:rgb|rgba|hsl|hsla)\(/i],
      background: [/(?:rgb|rgba|hsl|hsla)\(/i],
      'background-color': [/(?:rgb|rgba|hsl|hsla)\(/i],
      border: [/(?:rgb|rgba|hsl|hsla)\(/i],
      'border-color': [/(?:rgb|rgba|hsl|hsla)\(/i],
      'border-top': [/(?:rgb|rgba|hsl|hsla)\(/i],
      'border-right': [/(?:rgb|rgba|hsl|hsla)\(/i],
      'border-bottom': [/(?:rgb|rgba|hsl|hsla)\(/i],
      'border-left': [/(?:rgb|rgba|hsl|hsla)\(/i],
      outline: [/(?:rgb|rgba|hsl|hsla)\(/i],
      'outline-color': [/(?:rgb|rgba|hsl|hsla)\(/i],
    },
  },
};
