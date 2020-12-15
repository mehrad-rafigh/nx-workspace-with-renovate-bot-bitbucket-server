# Reproduction

This Repo reproduces the error [here](https://github.com/renovatebot/renovate/issues/7767)

Since this [PR](https://github.com/renovatebot/renovate/pull/7632) it is possible to run `ng update` with renovate.

This repository is a NX Workspace which is hosted on `bitbucket-server` as `platform`
`Renovate` will run via a Jenkins cron job
invoking `docker run --rm -v ${WORKSPACE}/renovate.config.js:/usr/src/app/config.js -e GITHUB_COM_TOKEN=$GITHUB_COM_TOKEN renovate/renovate --password $BITBUCKET_TOKEN`

Since NX suggest to use `nx migrate` instead of `ng update`.  [See here](https://github.com/nrwl/nx/pull/4238)
`nx migrate` on the first run creates a `migrations.json` file, which must then be run
with `nx migrate --run-migrations=migrations.json`

Not all migration runs create the migrations.json file. That's the reason why I am checking for that file with
```bash 
[ -f migrations.json ]
```

and then running `npx nx migrate --run-migrations=migrations.json`

The last step unfortunately does not provide the outcome I wish.

Renovate fails on Jenkins with

```json
{
  "name": "renovate",
  "level": 50,
  "logContext": "HQ7K2QhP0",
  "repository": "cg_fe/renovate-nx-workspace-test",
  "branch": "renovate/major-nrwl-workspace",
  "dep": "@nrwl/angular",
  "err": {
    "killed": false,
    "code": 1,
    "signal": null,
    "cmd": "[ -f migrations.json ] && npx nx migrate --run-migrations=migrations.json",
    "stdout": "",
    "stderr": "",
    "message": "Command failed: [ -f migrations.json ] && npx nx migrate --run-migrations=migrations.json\n",
    "stack": "Error: Command failed: [ -f migrations.json ] && npx nx migrate --run-migrations=migrations.json\n\n    at ChildProcess.exithandler (child_process.js:308:12)\n    at ChildProcess.emit (events.js:315:20)\n    at ChildProcess.EventEmitter.emit (domain.js:486:12)\n    at maybeClose (internal/child_process.js:1048:16)\n    at Socket.<anonymous> (internal/child_process.js:439:11)\n    at Socket.emit (events.js:315:20)\n    at Socket.EventEmitter.emit (domain.js:486:12)\n    at Pipe.<anonymous> (net.js:673:12)"
  },
  "msg": "Error updating branch: Command failed: [ -f migrations.json ] && npx nx migrate --run-migrations=migrations.json\n"
}
```
