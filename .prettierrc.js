module.exports = {
  parser: 'babel',
  semi: false,
  singleQuote: true,
  trailingComma: 'none',
  arrowParens: 'avoid',
  endOfLine: 'auto',
  overrides: [
    {
      files:
        '*.{babelrc,eslintrc,huskyrc,lintstagedrc,json,prettierrc,stylelintrc}',
      options: {
        parser: 'json'
      }
    },
    {
      files: '*.{ts,tsx}',
      options: {
        parser: 'typescript'
      }
    },
    {
      files: '*.{ejs,hbs,html}',
      options: {
        parser: 'html'
      }
    },
    {
      files: '*.vue',
      options: {
        parser: 'vue'
      }
    },
    {
      files: '*.mdx',
      options: {
        parser: 'mdx'
      }
    },
    {
      files: '*.css',
      options: {
        parser: 'css'
      }
    },
    {
      files: '*.less',
      options: {
        parser: 'less'
      }
    },
    {
      files: '*.scss',
      options: {
        parser: 'scss'
      }
    },
    {
      files: '*.yaml',
      options: {
        parser: 'yaml'
      }
    }
  ]
}
