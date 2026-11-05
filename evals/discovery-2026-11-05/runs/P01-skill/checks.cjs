const {createRequire}=require('node:module');
const {pathToFileURL}=require('node:url');
const fs=require('node:fs');
const assert=require('node:assert/strict');
const {chromium}=createRequire('C:/Users/DooBokWie/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/package.json')('playwright');
(async()=>{
  const mode=process.argv[2]||'after';
  const browser=await chromium.launch({executablePath:'C:/Program Files/Google/Chrome/Application/chrome.exe',headless:true});
  const page=await browser.newPage({viewport:{width:960,height:720}});
  const errors=[];page.on('pageerror',e=>errors.push(e.message));
  const reset=()=>page.goto(pathToFileURL(__dirname+'/index.html').href);
  const results={mode,environment:'Headless installed Chrome, 960x720, file URL',cases:[]};
  async function record(name,expected){const actual=await page.evaluate(()=>calls);results.cases.push({name,actual,expected});}
  await reset();await page.locator('#open').click();
  await page.screenshot({path:__dirname+'/'+mode+'-open.png'});
  const labels=await page.locator('.choice').allTextContents();assert.deepEqual(labels,['Queen','Rook','Bishop','Knight']);
  const box=await page.locator('[data-choice="Queen"]').boundingBox();
  await page.mouse.dblclick(box.x+30,box.y+20,{delay:15});await page.waitForTimeout(200);
  await record('real pointer double-click', ['Queen']);
  await reset();await page.locator('#open').click();
  await page.evaluate(()=>{document.querySelector('[data-choice="Queen"]').click();document.querySelector('[data-choice="Rook"]').click();});
  await page.waitForTimeout(200);await record('scripted different choices in same opening',['Queen']);
  await reset();await page.locator('#open').click();
  await page.evaluate(()=>{document.querySelector('[data-choice="Queen"]').click();openChoice();});
  await page.waitForTimeout(200);await record('scripted new owner during old close',[]);
  assert.equal(await page.locator('.overlay').count(),1);
  await page.locator('[data-choice="Knight"]').click();await page.waitForTimeout(200);await record('new owner remains selectable',['Knight']);
  await reset();
  for(const name of labels){
    await page.locator('#open').click();await page.locator(`[data-choice="${name}"]`).focus();await page.keyboard.press('Enter');
    assert.equal(await page.locator('.closing').count(),1);
    assert.equal(await page.locator('.closing').evaluate(el=>getComputedStyle(el).animationDuration),'0.12s');
    await page.waitForTimeout(200);assert.equal(await page.locator('.overlay').count(),0);
  }
  await record('keyboard selection of all four on separate openings',labels);
  await reset();await page.locator('#open').click();
  await page.evaluate(()=>{window.oldButton=document.querySelector('.choice');openChoice();oldButton.click();});
  await page.waitForTimeout(200);await record('detached old control activation',[]);
  results.errors=errors;fs.writeFileSync(__dirname+'/'+mode+'-results.json',JSON.stringify(results,null,2));
  await browser.close();
  if(mode==='after'){for(const c of results.cases)assert.deepEqual(c.actual,c.expected,c.name);assert.deepEqual(errors,[]);}
  console.log(JSON.stringify(results,null,2));
})().catch(e=>{console.error(e);process.exitCode=1;});
