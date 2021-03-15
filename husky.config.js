module.exports = {
  hooks: {
    'prepare-commit-msg': 'devmoji -e --lint',
    'pre-commit': 'lint-staged',
    'commit-msg': 'commitlint -E HUSKY_GIT_PARAMS'
  }
}
