const synth1 = new Tone.Synth().toMaster().sync();

const synth2 = new Tone.Synth().toMaster().sync();

const Melody = (melody) => {
    return new Tone.Part(function(time, event){
        //console.log(time + Tone.Time(offset))
        synth1.triggerAttackRelease(event.pitch, event.dur, time);
        }, melody
        );
};

const Accomp = (accomp) => {
    return new Tone.Part(function(time, event){
        //console.log(time + Tone.Time(offset))
        synth2.triggerAttackRelease(event.pitch, event.dur, time);
        }, accomp
        );
};

let context = new AudioContext(Tone.context);
context.resume();
let p1, p2;

const playTune = function() {
    let aMel = mel();
    let aComp = accomp()
    p1 = Melody(aMel);
    p2 = Accomp(aComp);
    p1.start();
    p2.start();
}

document.getElementById('play').addEventListener('click', () => {
    Tone.Transport.cancel();
    playTune();
    console.log(Tone.Transport.bpm.value);
    Tone.Transport.start(.25);
});
document.getElementById('replay').addEventListener('click', () => {
    p1.stop();
    p2.stop();
    p1.start();
    p2.start();
    Tone.Transport.start(.25);
});
document.getElementById('stop').addEventListener('click', () => {
    // Tone.Transport.stop();
     synth1.triggerRelease();
     synth2.triggerRelease();
     p1.stop();
     p2.stop();
});

