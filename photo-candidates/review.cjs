const fs = require('fs');
const path = require('path');
const sharp = require('sharp');
const convert = require(path.join(process.env.TEMP, 'alfa-photo-review/node_modules/heic-convert'));
(async () => {
  const root = __dirname;
  const out = path.join(root, 'review-previews');
  fs.mkdirSync(out, {recursive:true});
  for (const dir of fs.readdirSync(root, {withFileTypes:true}).filter(d=>d.isDirectory() && d.name!=='review-previews')) {
    const files=fs.readdirSync(path.join(root,dir.name)).filter(f=>/\.(heic|jpe?g|png)$/i.test(f));
    const tiles=[];
    for (const name of files) {
      let input=fs.readFileSync(path.join(root,dir.name,name));
      if (/\.heic$/i.test(name)) input=Buffer.from(await convert({buffer:input,format:'JPEG',quality:0.85}));
      const preview=await sharp(input).rotate().resize(1000,1000,{fit:'inside',withoutEnlargement:true}).jpeg({quality:85}).toBuffer();
      fs.writeFileSync(path.join(out,name.replace(/\.[^.]+$/,'.jpg')),preview);
      const thumb=await sharp(preview).resize(280,210,{fit:'contain',background:'#eeeeee'}).toBuffer();
      const label=Buffer.from(`<svg width="280" height="30"><rect width="280" height="30" fill="white"/><text x="8" y="21" font-size="15" font-family="Arial">${name.length>30?name.slice(0,24)+'…':name}</text></svg>`);
      tiles.push(await sharp({create:{width:280,height:240,channels:3,background:'white'}}).composite([{input:thumb,top:0,left:0},{input:label,top:210,left:0}]).jpeg().toBuffer());
    }
    for(let start=0;start<tiles.length;start+=12){
      const page=tiles.slice(start,start+12);
      await sharp({create:{width:1120,height:Math.ceil(page.length/4)*240,channels:3,background:'white'}}).composite(page.map((input,i)=>({input,left:(i%4)*280,top:Math.floor(i/4)*240}))).jpeg({quality:90}).toFile(path.join(out,`${dir.name}-${Math.floor(start/12)+1}.jpg`));
    }
    console.log(`Prepared ${files.length} photos: ${dir.name}`);
  }
})();
