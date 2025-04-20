module.exports = {
  extends: ['@commitlint/config-conventional'],
  parserPreset: {
    parserOpts: {
      headerPattern: /^(\p{Emoji_Presentation}?\s*)(\w+)(\(\w+\))?:\s(.+)$/u,
      headerCorrespondence: ['emoji', 'type', 'scope', 'subject'],
    },
  },
  rules: {
    'type-enum': [
      2,
      'always',
      [
        'feat',
        'fix',
        'docs',
        'style',
        'refactor',
        'perf',
        'test',
        'build',
        'ci',
        'chore',
        'revert',
        'init',
      ],
    ],
    'type-empty': [2, 'never'],
    'subject-empty': [2, 'never'],
    'header-max-length': [2, 'always', 100],
  },
};
