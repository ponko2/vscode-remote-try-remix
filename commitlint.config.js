export default {
  extends: ["@commitlint/config-conventional"],
  rules: {
    // ProTip: Great commit summaries are 50 characters or less. Place extra information in the extended description.
    "header-max-length": [2, "always", 50],
    // subjectでの日本語使用を許可
    "subject-case": [0],
  },
  ignores: [
    (commit) =>
      /^Signed-off-by: dependabot\[bot] <support@github\.com>$/m.test(commit),
  ],
};
