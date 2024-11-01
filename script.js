const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

canvas.width = 500;
canvas.height = 500;
canvas.style.border = '1px solid black';

const centerOx = canvas.width / 2;
const centerOy = canvas.height / 2;
const unit = 30;
let isWinner = false;

let Mx = Math.floor(Math.random() * canvas.width);
let My = Math.floor(Math.random() * canvas.height);

// Vẽ trục tọa độ Oxy
function drawAxes() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.beginPath();
    ctx.moveTo(centerOx, 0);           // Trục Oy
    ctx.lineTo(centerOx, canvas.height);
    ctx.moveTo(0, centerOy );            // Trục Ox
    ctx.lineTo(canvas.width, centerOy);
    ctx.strokeStyle = "black";
    ctx.lineWidth = 1;
    ctx.stroke();

     // Vẽ chữ "O" tại điểm gốc
     ctx.font = "30px Arial";
     ctx.fillStyle = "black";
     ctx.fillText("O", centerOx - 50, centerOy + 50);

     // Đánh số trên trục X và Y
     ctx.font = "16px Arial";
     ctx.fillStyle = "black";

     // Đánh số trên trục X
     for (let x = centerOx; x < canvas.width; x += unit) {
         const label = (x - centerOx) / unit;
         if(label === 0) continue;
         ctx.fillText(label, x-5, centerOy + 25);
         ctx.beginPath();
         ctx.moveTo(x, centerOy - 5);
         ctx.lineTo(x, centerOy + 5);
         ctx.stroke();
     }
     for (let x = centerOx; x > 0; x -= unit) {
         const label = (x - centerOx) / unit;
         if(label === 0) continue;
         ctx.fillText(label, x-5, centerOy + 25);
         ctx.beginPath();
         ctx.moveTo(x, centerOy - 5);
         ctx.lineTo(x, centerOy + 5);
         ctx.stroke();
     }

     // Đánh số trên trục Y
     for (let y = centerOy; y < canvas.height; y += unit) {
         const label = (centerOy - y) / unit;
         if(label === 0) continue;
         ctx.fillText(label, centerOx -35, y+5);
         ctx.beginPath();
         ctx.moveTo(centerOx - 5, y);
         ctx.lineTo(centerOx + 5, y);
         ctx.stroke();
     }
     for (let y = centerOy; y > 0; y -= unit) {
         const label = (centerOy - y) / unit;
         if(label === 0) continue;
         ctx.fillText(label, centerOx -30, y+5);
         ctx.beginPath();
         ctx.moveTo(centerOx - 5, y);
         ctx.lineTo(centerOx + 5, y);
         ctx.stroke();
     }
}

// Vẽ 1 điểm M
function drawPoint(x,y) {
    ctx.beginPath();
    ctx.arc(x, y, 5, 0, 2 * Math.PI);
    ctx.fillStyle = "red";
    ctx.fill();
}

//Vẽ đường thẳng bắt đầu từ góc tọa độ Oxy
function drawLine(x,y) {
    const x1 = centerOx;
    const y1 = centerOy;

    //góc dưới phải
    for(let x2 = x1; x2 < canvas.width+300; x2 ++) {
        for(let y2 = y1; y2 < canvas.height+300; y2 ++) {
            if( centerOy-y2 === x*(x2-centerOx) + y){
                const distance = Math.abs(x * (Mx-centerOx) -(centerOy - My)) / Math.sqrt(x * x + 1);
                if(distance <= 5) {
                    isWinner = true;
                }
                ctx.beginPath();
                ctx.moveTo(x1,y1);
                ctx.lineTo(x2,y2);
                ctx.strokeStyle = "black";
                ctx.lineWidth = 1;
                ctx.stroke();
            }
        }
    }
    //góc trên phải
    for(let x2 = x1; x2 < canvas.width+300; x2 ++) {
        for(let y2 = y1; y2 > 0-300; y2 --) {
            if( centerOy-y2 === x*(x2-centerOx) + y){
                const distance = Math.abs(x * (Mx-centerOx) -(centerOy - My)) / Math.sqrt(x * x + 1);
                if(distance <= 5) {
                    isWinner = true;
                }
                ctx.beginPath();
                ctx.moveTo(x1,y1);
                ctx.lineTo(x2,y2);
                ctx.strokeStyle = "black";
                ctx.lineWidth = 1;
                ctx.stroke();
            }
        }
    }
    //góc trên trái
    for(let x2 = x1; x2 > 0-300; x2 --) {
        for(let y2 = y1; y2 > 0-300; y2 --) {
            if( centerOy-y2 === x*(x2-centerOx) + y){
                const distance = Math.abs(x * (Mx-centerOx) -(centerOy - My)) / Math.sqrt(x * x + 1);
                if(distance <= 5) {
                    isWinner = true;
                }
                ctx.beginPath();
                ctx.moveTo(x1,y1);
                ctx.lineTo(x2,y2);
                ctx.strokeStyle = "black";
                ctx.lineWidth = 1;
                ctx.stroke();
            }
        }
    }
    //góc dưới trái
    for(let x2 = x1; x2 > 0-300; x2 --) {
        for(let y2 = y1; y2 < canvas.height+300; y2 ++) {
            if( centerOy-y2 === x*(x2-centerOx) + y){
                const distance = Math.abs(x * (Mx-centerOx) -(centerOy - My)) / Math.sqrt(x * x + 1);
                if(distance <= 5) {
                    isWinner = true;
                }
                ctx.beginPath();
                ctx.moveTo(x1,y1);
                ctx.lineTo(x2,y2);
                ctx.strokeStyle = "black";
                ctx.lineWidth = 1;
                ctx.stroke();
            }
        }
    }
    setTimeout(() => {
        if (isWinner) {
            checkWinner();
            resetGame();
        }
    }, 100);
}

function checkWinner() {
    if(isWinner) {
        alert('Bạn đã chém M');
    }
}
//chơi lại
function resetGame() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    Mx = Math.floor(Math.random() * canvas.width);
    My = Math.floor(Math.random() * canvas.height);
    drawAxes();
    drawPoint(Mx,My);
}

//thêm sự kiện nhấn phím enter
document.addEventListener('keydown', keyPress);
function keyPress(event) {
    if (event.key === 'Enter') {
        drawLine(document.getElementById('slope').value,0);
    }
}


function init() {
    drawAxes();
    drawPoint(Mx,My);
    
}

init();