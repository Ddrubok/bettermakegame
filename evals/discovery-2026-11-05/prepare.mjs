// Maintainer helper. Copies only inputs and selected runtimes, never judge keys.
import { mkdir, cp, readdir, readFile, writeFile } from 'node:fs/promises';
import { createHash } from 'node:crypto';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
const here = path.dirname(fileURLToPath(import.meta.url));
const [output, bmg, vfx, slop] = process.argv.slice(2);
if (![output,bmg,vfx,slop].every(Boolean)) throw new Error('Usage: node prepare.mjs NEW_OUTPUT BMG_RUNTIME VFX_RUNTIME SLOP_RUNTIME');
await mkdir(output); // Must be a new directory; do not overwrite another run.
async function files(dir, prefix='') {
  const values={};
  for(const e of await readdir(dir,{withFileTypes:true})) {
    const p=path.join(dir,e.name), rel=prefix+e.name;
    if(e.isDirectory())Object.assign(values,await files(p,rel+'/'));
    else values[rel]=createHash('sha256').update(await readFile(p)).digest('hex');
  }
  return values;
}
const manifest={date:new Date().toISOString(),sessions:{},limits:'Instruction-separated directories, not an OS read sandbox. Same supplied HTML/task; no judge or previous output copied.'};
for(const id of ['P01','N01'])for(const condition of ['short','skill']) {
  const folder=path.join(output,`${id}-${condition}`); await mkdir(folder);
  await cp(path.join(here,'inputs',id),folder,{recursive:true});
  const packet=path.join(folder,'skills');
  if(condition==='skill') {
    await mkdir(packet);
    for(const [name,source] of [['bettermakegame',bmg],['game-vfx',vfx],['kill-game-slop',slop]]) {
      const dest=path.join(packet,name);await mkdir(dest);
      // The VFX repo also holds maintainer material; copy runtime roots explicitly.
      for(const e of await readdir(source,{withFileTypes:true}))if(['SKILL.md','LICENSE','agents','references','assets'].includes(e.name))await cp(path.join(source,e.name),path.join(dest,e.name),{recursive:true});
    }
  }
  const brief='Inspect the actual evidence, preserve intent and scope, implement only authorized changes, and report executed checks and remaining limits.';
  await writeFile(path.join(folder,'CONDITION.md'),condition==='short'?brief+'\n':brief+'\nRead the three packaged SKILL.md entrypoints, then only references relevant to the task. Apply the appropriate skill roles in this same session.\n');
  manifest.sessions[`${id}-${condition}`]={files:await files(folder)};
}
await writeFile(path.join(output,'manifest.json'),JSON.stringify(manifest,null,2)+'\n');
console.log(JSON.stringify({sessions:Object.keys(manifest.sessions),output:path.resolve(output)}));
