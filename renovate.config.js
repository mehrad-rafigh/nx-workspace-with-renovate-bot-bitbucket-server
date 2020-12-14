module.exports = {
  platform: "bitbucket-server",
  username: "ci_user",
  endpoint: "https://self.hosted.bitbucket.com/bitbucket/",
  logLevel: "debug",
  repositories: ["cg_fe/renovate-nx-workspace-test"],
  prConcurrentLimit: 75,
  trustLevel: "high",
  allowPostUpgradeCommandTemplating: true,
  allowedPostUpgradeCommands: [
    "^npm i --ignore-scripts$",
    "^npx ng update",
    "^npx nx migrate",
    "^\\[ -f migrations.json \\] && npx nx migrate --run-migrations=migrations.json$"
  ],
  gitAuthor: "Renovate Bot <bot@renovateapp.com>",
  reviewers: ["rafigh_m"],
  baseBranches: ["master"],
  rebaseWhen: "conflicted",
  schedule: ["before 10pm every weekday"],
  onboarding: false,
  autodiscover: false,
  enabledManagers: ["npm", "dockerfile"],
  npmrc:
    'registry = https://custom-registry.com/repository/npm/\nsave-exact = true\ntag-version-prefix = ""',
};
