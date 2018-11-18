
/**********************************************************
 * 
 * 
 * PITCHES
 * 
 * 
 *********************************************************/


const key = {
    names: ["C", "C#", "D", "D#", "E", "F",
            "F#", "G", "G#", "A", "A#", "B"],
    nums: []
}



key.octave = (n) => {
    count = 0;
    n = n - (n % 12);
    while(n>12) { n = n - 12; count++};
    return count;
}


key.toString = (n) => {
    if (n == 0) return n;
    else if(typeof n == "number") {
        var noteName = key.names[(n % 12)] + key.octave(n);
        return noteName;
    } else if (n instanceof Array) {
        let res = [];
        n.forEach((x)=>{res.push(key.toString(x))});
        return res;
    } else return 0;

}

key.toNum = (k) => {
    if (k == 0) return k;
    else if (typeof k === "string") {
        if (k.match(/[0-9]/)) {
            let oct = k[k.length-1];
            let name = k.slice(0,k.length-1);
            return Number(oct) * 12 + 12
                    + key.names.indexOf(name);
        } else {
            let oct = 0;
            let name = key.names.indexOf(k);
            return name;
        }
    }
    else if (k instanceof Array) {
        let res = [];
        k.forEach((x)=>{res.push(key.toNum(x));
        });
        return res;
    }
}
// Unit test
// var ks = key.toString([60, 62, 64, 0, 65, 48, 77]);
// console.log(ks)
// var nums = key.toNum(ks);
// console.log(nums)

/**********************************************************
 * SCALES
 **/

 const scale = {};
 scale.constructor = (arg) => {

 }

 const cMAJ = [0,2,4,5,7,9,11].map(i => key.names[i]);
 const cMin = [0,2,3,5,7,8,10].map(i => key.names[i]);

/**********************************************************
 * Melodizr
 *********************************************************/


 /**********************************************************
 * HELPER FUNCTIONS
 **/
function last(ar){
    return ar[ar.length-1];
}

function first(ar){
    return ar[0];
}

function shuffle(a) {
    for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
}

function but (prom, conditions) {
    let result = prom(0);
    let tot = 0;
    while(!conditions(result) && tot < 200) {
        result = prom(0); tot++;
    }
    return result;
}

// console.log(key.toNum(["C", "D"]));
// but((x)=>{return Math.random(x)},
//     (res)=>{return (res < 0.5)})

// );


/**********************************************************
 * MELODY TEMPLATE
 **/

 const mel = ()=> {
     // template for the pitches
     let a = shuffle([0,1,2,3])
     let b = but((req)=>{ return shuffle([1,3,4,5]) },
                 (res)=>{ return (Math.abs(first(res) - last(a)) <= 1) }
                );
    let final = first(shuffle([0,2]))
    // template for the rhythms
    m = [];
    let rhyPool = shuffle([
        ["4n", "8n", "16n", "16n"],
        ["8n", "8n", "8n.", "16n", ],
        ["8n", "8n", "8n", "8n", ],
        ["8n", "16n", "16n", "4n", ],
        ["8n.", "16n", "8n", "8n", ]
    ]);
    let ar = first(rhyPool);
    let br = last(rhyPool);
    let rhy = ar.concat(br, ar, br, ar, ar, br, br,
        ar, br, ar, br, ar, ar, ar, br, "4n");
    let start = 0;
    let rIndx = 0;
    a.concat(b, a, a, b, b.reverse(), a, b,
    a, b, a, a, b, a.reverse(), b, b, final).forEach(x => {
        let note = key.toNum(cMAJ[x]) + 60;
        m.push({
            time: start,
            pitch: key.toString(note),
            dur: rhy[rIndx]
        });
        start = start + Tone.TimeBase(rhy[rIndx]);
        rIndx++;
        
    });
    return m;
 }

 const accomp = ()=> {
    // template for the pitches
    let a = ["C3", "G3", "E3", "G3"]
    let b = ["B2", "G3", "D3", "G3"]
   // template for the rhythms
   m = [];
   let ar = ["8n", "8n", "8n", "8n"];
   let rhy = ar.concat(ar, ar, ar, ar, ar, ar, ar,
    ar, ar, ar, ar, ar, ar, ar, ar, "4n");
   let start = 0;
   let rIndx = 0;
   a.concat(b, a, a, b, b, a, b, 
    a, b, a, a, b, b, a, b, "C3").forEach(x => {
       let note = key.toNum(x);
       m.push({
           time: start,
           pitch: key.toString(note),
           dur: rhy[rIndx]
       });
       start = start + Tone.TimeBase(rhy[rIndx]);
       rIndx++;
       
   });
   return m;
}


/**********************************************************
 * 
 * 
 * Rhythms
 * 
 * 
 *********************************************************/

 