const {createRequire}=require('module');
const requireRuntime=createRequire('C:/Users/DooBokWie/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/package.json');
const {chromium}=requireRuntime('playwright');
const path=require('path');
const fs=require('fs');
(async()=>{
 const browser=await chromium.launch({executablePath:'C:/Program Files/Google/Chrome/Application/chrome.exe',headless:true});
 const results=[];
 for(const width of [360,960]) for(const reducedMotion of ['no-preference','reduce']){
  const page=await browser.newPage({viewport:{width,height:800},reducedMotion});
  const errors=[];page.on('pageerror',e=>errors.push(e.message));
  await page.goto('file:///'+path.resolve('index.html').replaceAll('\\','/'));
  await page.screenshot({path:`evidence-${width}-${reducedMotion}.png`,fullPage:true});
  const before=await page.evaluate(()=>{
   const b=document.querySelector('button'),a=document.querySelector('.art');
   const s=getComputedStyle(b),p=getComputedStyle(a,'::before');
   const r=b.getBoundingClientRect();
   return {title:document.querySelector('h1').textContent,reward:document.querySelector('h1+p').textContent,button:b.textContent,buttonBox:{x:r.x,y:r.y,width:r.width,height:r.height},font:s.fontSize,foreground:s.color,background:s.backgroundColor,scrollWidth:document.documentElement.scrollWidth,viewport:innerWidth,animation:p.animationName,animationDuration:p.animationDuration,bodyText:document.body.innerText};
  });
  await page.keyboard.press('Tab'); const focus=await page.evaluate(()=>document.activeElement.id);
  await page.keyboard.press('Enter'); const result=await page.locator('#state').textContent();
  results.push({width,reducedMotion,...before,firstTabFocus:focus,activationResult:result,errors});
  await page.close();
 }
 await browser.close();fs.writeFileSync('evidence.json',JSON.stringify(results,null,2));
 console.log(JSON.stringify(results,null,2));
})();
