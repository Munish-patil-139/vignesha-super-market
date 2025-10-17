const fs = require('fs');
const path = 'src/pages/store/SingleShop.jsx';
const s = fs.readFileSync(path, 'utf8');
const lines = s.split('\n');
let balance = 0;
let peak = 0;
let peakLine = 0;
for (let i = 0; i < lines.length; i++) {
  const line = lines[i];
  const opens = (line.match(/<div(\s|>)/g) || []).length;
  const closes = (line.match(/<\/div>/g) || []).length;
  balance += opens - closes;
  if (balance < 0) {
    console.log('Negative balance at line', i+1);
    break;
  }
  if (balance > peak) {
    peak = balance;
    peakLine = i+1;
  }
}
console.log('final balance', balance);
console.log('peak balance', peak, 'at line', peakLine);
// print last 100 lines for inspection
console.log('\n---- tail 120 lines ----\n');
console.log(lines.slice(-120).map((l,idx)=>`${lines.length-119+idx}: ${l}`).join('\n'));

console.log('\n---- balance snapshot (1..500) ----\n');
balance = 0;
for (let i = 0; i < Math.min(500, lines.length); i++) {
  const line = lines[i];
  const opens = (line.match(/<div(\s|>)/g) || []).length;
  const closes = (line.match(/<\/div>/g) || []).length;
  balance += opens - closes;
  if (i >= 300 && i <= 420) {
    console.log(`${i+1}: balance=${balance} | ${line.trim()}`);
  }
}

console.log('\n---- balance snapshot (1360..1583) ----\n');
balance = 0;
for (let i = 0; i < lines.length; i++) {
  const line = lines[i];
  const opens = (line.match(/<div(\s|>)/g) || []).length;
  const closes = (line.match(/<\/div>/g) || []).length;
  balance += opens - closes;
  if (i+1 >= 1360 && i+1 <= 1583) {
    console.log(`${i+1}: balance=${balance} | ${line.trim()}`);
  }
}
