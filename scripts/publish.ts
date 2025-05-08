import pack from 'libnpmpack';
import libpub from 'libnpmpublish';
import fs from 'node:fs/promises';

const localPkgStr = await fs.readFile('package.json', 'utf-8');
const localPkg = JSON.parse(localPkgStr);

if (!localPkg) {
  throw new Error('No package.json found');
}

if (!process.env.CI && !process.env.WGW_NEXT_VERSION) {
  console.log('Not running in CI, skipping publish');
  process.exit(1);
}

function getArg(arg: string, defaultValue?: string | boolean): string | boolean | undefined {
  return process.argv.find((x) => x === `--${arg}`)
    ? (
        arg === 'debug' || arg === 'dry-run' || arg === 'provenance'
          ? true
          : (process.argv[process.argv.indexOf(`--${arg}`) + 1]?.trim() || defaultValue)
      )
    : defaultValue;
}

const dryRun = getArg('dry-run', false);
const publishAccess = getArg('access', 'public');
const publishTag = getArg('tag', 'latest');
const provenance = getArg('provenance', localPkg?.publishConfig?.provenance ?? true);
const token = getArg('token', process.env.NPM_TOKEN || process.env.NODE_AUTH_TOKEN);
const packageName = getArg('name', process.env.npm_package_name);
const nextVersion = getArg('next-version', process.env.WGW_NEXT_VERSION);

if (!nextVersion) {
  console.error('No next version found, skipping publish');
  process.exit(1);
}

if (!token) {
  console.error('No token found, skipping publish');
  process.exit(1);
}

if (!packageName) {
  console.error('No package name found, maybe not ran from package scripts? Try passing --name <package-name>');
  process.exit(1);
}

const remoteVersion = await fetch(`https://unpkg.com/${packageName}/package.json`)
  .then((x) => x.json())
  .then((x) => x.version);

if (nextVersion === remoteVersion) {
  console.error('Version already published, skipping publish');
  process.exit(1);
}

if (localPkg.version !== nextVersion) {
  console.error('Local version does not match next version, skipping publish');
  process.exit(1);
}

const publishOptions = {
  access: publishAccess,
  defaultTag: publishTag,
  npmVersion: 'bun-publish-provenance/v0.1.0', // that's more like a user-agent
  provenance,
};

const info = {
  _localVersion: localPkg.version,
  _nextVersion: nextVersion,
  _remoteVersion: remoteVersion,
  name: localPkg.name,
  publishOptions,
};

if (dryRun) {
  console.info('Dry run mode enabled, skipping publish', info);
  process.exit(0);
}

console.info('Publishing package with provenance...', info);

const localSourceTarball = await pack();
const result = await libpub.publish(localPkg, localSourceTarball, { ...publishOptions, token });

console.log('Publish result:', result);
