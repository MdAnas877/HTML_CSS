function handleClick() {
    let box1 = document.getElementById('sub1');
    let box2 = document.getElementById('sub2');
    let box3 = document.getElementById('sub3');
    let box4 = document.getElementById('sub4');


    let move1 = 175;
    let move2 = 350;
     setInterval(animation, 10);

    function animation() {
        if (move1 < 350) {
            move1++;
            box1.style.left = move1 + 'px';
        box2.style.left = 350 - move1 + 'px';
        box3.style.top = move1 + 'px';
        box4.style.top = 350 - move1 + 'px';
            
        }
        else if(move2 > 175){
            console.log("dhhd");
            move2--;
            box1.style.left = move2 + 'px';
        box2.style.left = 350 - move2 + 'px';
        box3.style.top = move2 + 'px';
        box4.style.top = 350 - move2 + 'px';         
        }
    }
}
