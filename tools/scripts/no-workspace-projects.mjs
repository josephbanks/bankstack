#!/usr/bin/env node

const target = process.argv[2] ?? "script";

console.log(
  `No workspace projects define a "${target}" target yet. This placeholder keeps the root ${target} script callable until packages or apps are added.`,
);
