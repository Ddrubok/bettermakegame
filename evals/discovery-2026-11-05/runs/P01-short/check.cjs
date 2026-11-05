const {createRequire}=require('node:module');
const {pathToFileURL}=require('node:url');
const {resolve}=require('node:path');
const {chromium}=createRequire('C:/Users/DooBokWie/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/package.json')('playwright');
const assert=require('node:assert/strict');
(async()=>{
 const browser=await chromium.launch({executablePath:'C:/Program Files/Google/Chrome/Application/chrome.exe',headless:true});
 try {
  const page=await browser.newPage({viewport:{width:900,height:650}});
  const errors=[];page.on('pageerror',e=>errors.push(e.message));
  const reset=()=>page.goto(pathToFileURL(resolve(__dirname,'index.html')).href);
  await reset();await page.locator('#open').click();
  await page.screenshot({path:resolve(__dirname,process.argv.includes('--baseline')?'baseline.png':'repaired.png')});
  const labels=await page.locator('.choice').allTextContents();
  await page.evaluate(()=>{const b=document.querySelectorAll('.choice'); b[0].click();b[1].click();b[0].dispatchEvent(new MouseEvent('click'));});
  await page.waitForTimeout(250);
  const repeated=await page.evaluate(()=>calls.slice());
  await reset();
  await page.evaluate(()=>{openChoice();document.querySelector('.choice').click();openChoice();});
  await page.waitForTimeout(250);
  const replaced=await page.evaluate(()=>({calls:calls.slice(),menus:document.querySelectorAll('.overlay').length}));
  await reset();
  await page.evaluate(()=>{openChoice();const old=document.querySelector('.choice');openChoice();old.click();});
  await page.waitForTimeout(250);
  const detached=await page.evaluate(()=>calls.slice());
  console.log(JSON.stringify({labels,repeated,replaced,detached,errors},null,2));
  if(process.argv.includes('--baseline'))return;
  assert.deepEqual(labels,['Queen','Rook','Bishop','Knight']);
  assert.deepEqual(repeated,['Queen']);assert.deepEqual(replaced,{calls:[],menus:1});assert.deepEqual(detached,[]);
  await reset();
  await page.evaluate(()=>{openChoice();document.querySelector('.choice').click();openChoice();document.querySelector('[data-choice="Bishop"]').click();});
  await page.waitForTimeout(250);
  assert.deepEqual(await page.evaluate(()=>calls.slice()),['Bishop']);
  assert.equal(await page.locator('#result').textContent(),'Bishop');
  for(const name of labels){
   await reset();await page.locator('#open').click();
   await page.getByRole('button',{name,exact:true}).click();
   assert.equal(await page.locator('.closing').count(),1);
   assert.deepEqual(await page.evaluate(()=>calls.slice()),[]);
   await page.waitForTimeout(250);
   assert.deepEqual(await page.evaluate(()=>calls.slice()),[name]);
   assert.equal(await page.locator('.overlay').count(),0);
   assert.equal(await page.locator('#result').textContent(),name);
   await page.locator('#open').click();await page.getByRole('button',{name:'Knight',exact:true}).focus();await page.keyboard.press('Enter');
   await page.waitForTimeout(250);assert.deepEqual(await page.evaluate(()=>calls.slice()),[name,'Knight']);
  }
  assert.deepEqual(errors,[]);console.log('PASS: duplicate, replacement, detached, all four choices, close animation, reopen and keyboard checks');
 } finally {await browser.close();}
})().catch(e=>{console.error(e);process.exitCode=1;});
