const {createRequire}=require('module');
const {chromium}=createRequire('C:/Users/DooBokWie/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/package.json')('playwright');
const fs=require('fs');
const {pathToFileURL}=require('url');
(async()=>{
 const browser=await chromium.launch({executablePath:'C:/Program Files/Google/Chrome/Application/chrome.exe',headless:true});
 const results={browser:browser.version(),cases:[]};
 for(const width of [360,960]) for(const reducedMotion of ['no-preference','reduce']){
  const page=await browser.newPage({viewport:{width,height:800},reducedMotion,deviceScaleFactor:1});
  const errors=[];page.on('pageerror',e=>errors.push(e.message));
  await page.goto(pathToFileURL(__dirname+'/index.html').href);
  const sample=()=>page.evaluate(()=>{
   const b=document.querySelector('button'), a=document.querySelector('.art'), c=getComputedStyle(a,'::before');
   const r=b.getBoundingClientRect();
   return {button:{x:r.x,y:r.y,width:r.width,height:r.height,text:b.textContent,font:getComputedStyle(b).font},hit:document.elementFromPoint(r.x+r.width/2,r.y+r.height/2)?.id,scrollWidth:document.documentElement.scrollWidth,innerWidth,animation:c.animationName,transform:c.transform,opacity:c.opacity,reward:document.querySelector('h1+p').textContent};
  });
  const first=await sample();await page.waitForTimeout(650);const second=await sample();
  const name=`${width}-${reducedMotion}`;
  await page.screenshot({path:__dirname+`/${name}.png`,fullPage:true});
  await page.keyboard.press('Tab');const focus=await page.evaluate(()=>document.activeElement.id);
  await page.screenshot({path:__dirname+`/${name}-focus.png`,fullPage:true});
  await page.keyboard.press('Enter');const keyboard=await page.locator('#state').textContent();
  await page.reload();await page.locator('#next').click();const pointer=await page.locator('#state').textContent();
  await page.locator('summary').click();await page.screenshot({path:__dirname+`/${name}-expanded.png`,fullPage:true});
  results.cases.push({width,reducedMotion,first,second,focus,keyboard,pointer,errors});
  await page.close();
 }
 fs.writeFileSync(__dirname+'/evidence.json',JSON.stringify(results,null,2));
 await browser.close();
})().catch(e=>{console.error(e);process.exitCode=1});
