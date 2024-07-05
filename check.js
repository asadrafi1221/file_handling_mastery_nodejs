let arr = ['asad','rafi','usama'];
let twodarray = [['asadrafi'],['zahidkhan']]

const data = arr.join('kk');
const alldata = twodarray.join('\n');
console.log(data);
console.log(alldata);


let set = ['asad,rafi,salman,sihail'];

const newarr = set.split(',');
console.log(newarr);


for(let i=0;i<newarr;i++){
    if(newarr[i]==='asad'){
        console.log(i);
        break;
    }
}

