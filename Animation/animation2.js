function handle(){
    let box1 = document.getElementById('child1');
    let box2 = document.getElementById('child2');
    let box3 = document.getElementById('child3');
    let box4 = document.getElementById('child4');
    let move1 = 0;
    setInterval(animation,10)
    function animation(){        
        if(move1 < 450){
            move1++;
            box1.style.top = move1 + 'px';
            box2.style.left = move1 + 'px';
            box3.style.bottom = move1 + 'px';
            box4.style.right = move1 + 'px';
        }
    }   
}