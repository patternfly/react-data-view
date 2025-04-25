module.exports = {
  branches: [ 'do-not-delete', { name: 'main', channel: 'prerelease', prerelease: 'prerelease' } ],
  analyzeCommits: {
    preset: 'angular'
  },
  plugins: [
    [
      '@semantic-release/commit-analyzer',
      {
        preset: 'angular',
        parserOpts: {
          noteKeywords: [ 'BREAKING-CHANGE' ]
        }
      }
    ],
    '@semantic-release/release-notes-generator',
    '@semantic-release/github',
    '@semantic-release/npm'
  ],
  tagFormat: 'prerelease-v${version}',
  dryRun: true,
  debug: true
};
