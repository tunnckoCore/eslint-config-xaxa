/* eslint-disable ts/explicit-function-return-type */
import { increment as semverIncrement } from '@tunnckocore/semver-increment';
import { getRawCommits } from 'git-raw-commits';
// import pack from 'libnpmpack';
// import libpub from 'libnpmpublish';
// import fs from 'node:fs/promises';
import recommendedBump from 'recommended-bump';

// const localSourceTarball = await pack();
// const localPkgStr = await fs.readFile('package.json', 'utf-8');
// const localPkg = JSON.parse(localPkgStr);

// if (!localPkg) {
//   throw new Error('No package.json found');
// }

function getArg(arg: string, defaultValue?: string | boolean) {
  return process.argv.find((x) => x === `--${arg}`)
    ? (arg === 'debug' ? true : process.argv[process.argv.indexOf(`--${arg}`) + 1])
    : defaultValue;
}

const debug = getArg('debug', false);
const from = getArg('from', 'HEAD~2');
const to = getArg('to', 'HEAD');
// const raw = getArg('raw', true);
// const publish = getArg('publish', false);
const packageName = getArg('name', process.env.npm_package_name);

if (!packageName) {
  throw new Error('No package name found, maybe not ran from package scripts? Try passing --name <package-name>');
}
const remoteVersion = await fetch(`https://unpkg.com/${packageName}/package.json`)
  .then((x) => x.json())
  .then((x) => x.version);

// if (remotePkg.version === localPkg.version) {
//   console.log('Version already published, skipping publish');
//   process.exit(0);
// }

async function getNextBump(options = {}) {
  let increment: string | any;

  for await (const cmt of getRawCommits(options)) {
    // console.log('Commit:', cmt);
    if (typeof increment !== 'string') {
      increment = recommendedBump(cmt).increment;
    }
  }

  return increment;
}

const nextVersion = semverIncrement(remoteVersion, await getNextBump({ from, to }));

if (debug) {
  console.log('Debug mode enabled');
  console.log('Package:', packageName);
  console.log('From:', from);
  console.log('To:', to);
  console.log('Remote package:', remoteVersion);
  console.log('Next version?', nextVersion || 'No version bump needed');
  console.log();
}

if (nextVersion) {
  console.log(nextVersion);
  process.exit(0);
} else {
  // console.log('No version bump needed, skipping publish');
  process.exit(0);
}

// if (nextVersion && publish) {
//   console.log('Next version:', nextVersion);
//   localPkg.version = nextVersion;

//   const opts = {
//     access: localPkg?.publishConfig?.access || 'public',
//     defaultTag: localPkg?.publishConfig?.tag || 'latest',
//     npmVersion: 'bun-publish-provenance',
//     provenance: localPkg?.publishConfig?.provenance || false,
//     token: process.env.NPM_TOKEN || process.env.NODE_AUTH_TOKEN,
//   };

//   console.log('Publishing package with provenance...', localPkg);

//   const result = await libpub.publish(localPkg, localSourceTarball, opts);

//   console.log('Publish result:', result);
//   process.exit(0);
// } else {
//   console.log('No version bump needed, skipping publish');
//   process.exit(0);
// }
