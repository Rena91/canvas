// let y = ['aa','ba','ca','dd','dd','ea','fd','gx','gx'];
// let x = ['aa','aa','aa','aa','aa','aa','aa','aa','aa','aa','aa','aa']
let x = [1,1,1]
function dup(x){
    let temp = [];
    for(let i= 0; i< x.length;i++){
        if(temp.includes(x[i])){
            console.log(x[i],'--->',i);
            x.splice(i,1);
        }
        temp.push(x[i]);
    }
    return x;
}

console.log(dup(x));
