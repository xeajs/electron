/**
 * @格式 type(scope?): subject
 * @feat 功能分支
 * @fix 修复bug
 * @docs 修改文案
 * @style 样式
 * @refactor 重构
 * @test 测试
 * @chore (maintain)
 * @前缀 'type-enum': [2, 'always', ['feat', 'fix', 'docs', 'style', 'refactor', 'test', 'chore']]
 * @scope必须小写 [2, 'always', 'lower-case']
 */

module.exports = {
  extends: ['@commitlint/config-conventional'],
  rulles: {
    /** @前缀 */
    'type-enum': [2, 'always', ['feat', 'fix', 'docs', 'style', 'refactor', 'test', 'chore']],
    /** @scope必须小写 */
    'scope-case': [2, 'always', 'lower-case'],
  },
}
