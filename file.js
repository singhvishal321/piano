// Created by Vishal Singh

alert("CODED BY VISHAL SINGH")
$(document).ready(function(){
    let ci,gainNode,gainValue=0,log=console.log,t=1,tl,wb=0,easeValue=.005,attack=.005,frqValue,sustain=.7,decay=.1,release=.2,alertTime=1000,scrollVal = 0,transpose=1
    const ctx = new (window.AudioContext || window.webkitAudioContext)();
    gainNode = ctx.createGain();
    gainNode.gain.value = gainValue 
    oscillator = ctx.createOscillator()
    oscillator.type = "square"
    oscillator.detune.value = 10
    oscillator.frequency.value = 440
    oscillator1 = ctx.createOscillator()
    oscillator1.type = "triangle"
    oscillator1.detune.value = 1200
    oscillator1.frequency.value = 440
    filter = ctx.createBiquadFilter()
    filter.type = "bandpass"
    filter.frequency.value = 440
    filter.Q.value = 2
    filter1 = ctx.createBiquadFilter()
    filter1.type = "lowpass"
    filter1.frequency.value = 880
    filter1.Q.value = 2
    gainNode.connect(filter)
    filter.connect(ctx.destination)
    gainNode.connect(filter1)
    filter1.connect(ctx.destination)
    oscillator.connect(gainNode)
    oscillator1.connect(gainNode)   
    oscillator.start(ctx.currentTime)
    oscillator1.start(ctx.currentTime)
    let start = f =>{
        gainNode.gain.cancelScheduledValues(ctx.currentTime)
        gainNode.gain.setValueAtTime(0,ctx.currentTime + easeValue)
        gainNode.gain.linearRampToValueAtTime(.5,ctx.currentTime + attack + easeValue )
        gainNode.gain.linearRampToValueAtTime(sustain, ctx.currentTime + attack + easeValue + decay)
       oscillator.frequency.value = f
       oscillator1.frequency.value = f
}
    let stop = () =>{
        gainNode.gain.cancelScheduledValues(ctx.currentTime)
        gainNode.gain.setTargetAtTime(0,ctx.currentTime, release + easeValue )
        setTimeout(()=>{
            oscillator.disconnect()
            oscillator1.disconnect()
        },1e6)
    }
   $(".fa-plus").click(()=>{
   $(".fa-plus").addClass("btnAnim")
   alertBox(transpose.toFixed(1) ,"")
        if(transpose >=4) {
            transpose = 4
            alertBox("04","</br>is highest transpose value")
        }
        transpose += .2
        setTimeout(()=>{
        $(".fa-plus").removeClass("btnAnim")
        },600)
    })
   $(".fa-minus").click(()=>{
   $(".fa-minus").addClass("btnAnim")
   alertBox(transpose.toFixed(1) ,"")
       if(transpose <= 1) {
           transpose = 1
           alertBox("01","</br>is lowest transpose value")
       }
       transpose -= .2
       setTimeout(()=>{
        $(".fa-minus").removeClass("btnAnim")
        },600)
    })
    
    $(".btn").on("touchstart",el=>{       
    let fval = el.target.value
    el.target.classList.add("act")
    clearInterval(ci)
    gainNode.gain.value = gainValue 
    oscillator.connect(gainNode)
    tl = el.touches.length       
    if(tl==1) t=1
    if(tl>1) {
        t=0
    }
    if(fval==0) frqValue = 440 * transpose 
    if(fval==1) frqValue = 440 * 2 ** (fval/12) * transpose 
    if(fval==2) frqValue = 440 * 2 ** (fval/12) * transpose 
    if(fval==3) frqValue = 440 * 2 ** (fval/12) * transpose 
    if(fval==4) frqValue = 440 * 2 ** (fval/12) * transpose 
    if(fval==5) frqValue = 440 * 2 ** (fval/12) * transpose 
    if(fval==6) frqValue = 440 * 2 ** (fval/12) * transpose 
    if(fval==7) frqValue = 440 * 2 ** (fval/12) * transpose 
    if(fval==8) frqValue = 440 * 2 ** (fval/12) * transpose 
    if(fval==9) frqValue = 440 * 2 ** (fval/12) * transpose 
    if(fval==10) frqValue = 440 * 2 ** (fval/12) * transpose 
    if(fval==11) frqValue = 440 * 2 ** (fval/12) * transpose 
    if(fval==12) frqValue = 440 * 2 ** (fval/12) * transpose 
    if(fval==13) frqValue = 440 * 2 ** (fval/12) * transpose 
    if(fval==14) frqValue = 440 * 2 ** (fval/12) * transpose 
    if(fval==-1) frqValue = 440 * 2 ** (fval/12) * transpose 
    if(fval==-2) frqValue = 440 * 2 ** (fval/12) * transpose 
    if(fval==-3) frqValue = 440 * 2 ** (fval/12) * transpose 
    if(fval==-4) frqValue = 440 * 2 ** (fval/12) * transpose 
    if(fval==-5) frqValue = 440 * 2 ** (fval/12) * transpose 
    if(fval==-6) frqValue = 440 * 2 ** (fval/12) * transpose 
    if(fval==-7) frqValue = 440 * 2 ** (fval/12) * transpose 
    if(fval==-8) frqValue = 440 * 2 ** (fval/12) * transpose 
    if(fval==-9) frqValue = 440 * 2 ** (fval/12) * transpose 
    start(frqValue)
    })
    $(".btn").on("touchend",el=>{
    el.target.classList.remove("act")
    if(t){
    stop()
    ci = setTimeout(()=>{
        oscillator.frequency.value = 0
        oscillator1.frequency.value = 0
    },1e3)}
    })
    $(".sound1").click(()=>{
        $(".sound1").addClass("btnAnim")
        flute("highpass",440,3,"square",10)
        flute2("highpass",440,1,"square",100)
        alertBox("sound1","</br>is selected")
        setTimeout(()=>{
        $(".sound1").removeClass("btnAnim")
        },600)
    })
    $(".sound2").click(()=>{
        $(".sound2").addClass("btnAnim")
        flute("bandpass",500,2,"square",500)
        flute2("highpass",440,1,"square",100)
        alertBox("sound2","</br>is selected")
        setTimeout(()=>{
        $(".sound2").removeClass("btnAnim")
        },600)
    })
    $(".sound3").click(()=>{
        $(".sound3").addClass("btnAnim")
        flute("lowpass",300,1,"sine",10)
        flute2("lowpass",300,1,"sine",10)
        alertBox("sound3","</br>is selected")
        setTimeout(()=>{
        $(".sound3").removeClass("btnAnim")
        },600)
    })
    $(".original").click(()=>{
        $(".original").addClass("btnAnim")
        flute()
        flute2()
        alertBox("original sound","</br>is selected")
        setTimeout(()=>{
        $(".original").removeClass("btnAnim")
        },600)
    })
    let flute = (ftype="bandpass",ffvalue=440,qvalue=2,otype="square",dt=100) =>{
        filter.type = ftype
        filter.frequency.value = ffvalue 
        filter.Q.value = qvalue 
        oscillator.type = otype
        filter.detune.value = dt
    }
    let alertBox = (alertText,secText) =>{
     let div1 = `<div class="alert">
                <h2 class="alert-heading">${alertText}</h2>
                <p class="sec-text">${secText}</p>
        </div>`
       $("body").append(div1)
       setTimeout(()=>{
           $(".alert").remove()
       },alertTime)
    }
    let flute2 = (ftype="lowpass",ffvalue=440,qvalue=2,otype="triangle",dt=1200) =>{
        filter1.type = ftype
        filter1.frequency.value = ffvalue 
        filter1.Q.value = qvalue 
        oscillator1.type = otype
        filter1.detune.value = dt
    }
    $(".forward").click(()=>{
        $(".forward").addClass("btnAnim")
        if(scrollVal >= $(".wrapper").height()){
            scrollVal -= 100
        }
        scrollVal += 100
        window.scrollTo(0,scrollVal)
        setTimeout(()=>{
        $(".forward").removeClass("btnAnim")
        },600)
    })
   $(".backward").click(()=>{
       $(".backward").addClass("btnAnim")
       if(scrollVal <= 0){
           scrollVal += 100
       }
        scrollVal -= 100
        window.scrollTo(0,scrollVal)
        setTimeout(()=>{
        $(".backward").removeClass("btnAnim")
        },600)
    })
    let help = () =>{
     let div2 = `<div class="help-container">
                 <i class="fa fa-xmark cross"></i>
                <h2 class="help"><u>_____Instructions_____</u></h2>
                <p class="help-list">
                    <ol type="I">
                        <li>Press and hold to play the note (button) continuosly.</li>
                        <li>Scroll the piano by using left/right arrow buttons.</li>
                        <li>If the piano continues to play, tap once to stop.</li>
                        <li>Use Sound1 to Sound3 to change the tone of piano (little bit).</li>
                <p class="more-help">if you need more help than comment down....</p>
                    </ol>
                </p>
        </div>`
       $("body").append(div2)
    }
    help()
    $(".cross").click(()=>{
        $(".help-container").addClass("remove")
        setTimeout(()=>{
           $(".alert").remove()
       },alertTime)
    })
})







