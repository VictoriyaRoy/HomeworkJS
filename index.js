const boxes = document.getElementsByClassName('box');
const container = document.getElementsByClassName('box-container')[0];

let amount = 1;
let total = 1;
let dragged = '';
let offsetX = 0;
let offsetY = 0;

addEvents(boxes[0]);
container.addEventListener('mousemove', dragElement);

function paintBox(item) {
    const maxColor = 0xFFFFFF;
    const thisColor = Math.floor(Math.random() * maxColor);
    item.style.backgroundColor = '#' + thisColor.toString(16);
}

function createBox(parent) {
    amount ++;
    total ++;
    const newBox = document.createElement('div');
    const id = document.createTextNode(total.toString());
    newBox.appendChild(id);
    newBox.classList.add('box');
    newBox.style.top = (parent.offsetTop + parent.offsetHeight).toString() + 'px';
    newBox.style.left = (parent.offsetLeft + parent.offsetWidth).toString() + 'px';
    addEvents(newBox);
    return newBox;
}

function deleteBox(item) {
    if (amount > 1) {
        amount --;
        item.remove();
    }
}

function dragElement(event) {
    if (dragged !== '') {
        dragged.style.top = (event.clientY - offsetY).toString() + 'px';
        dragged.style.left = (event.clientX - offsetX).toString() + 'px';
    }
} 

function addEvents(item) {
    item.addEventListener('click', (event) => {
        if (event.shiftKey) {
            item.classList.toggle('box-large');
        }
    });

    item.addEventListener('dblclick', (event) => {
        event.preventDefault();
        if (event.altKey) {
            deleteBox(event.target);
        } else {
            container.appendChild(createBox(event.target));
        }
    });

    item.addEventListener('contextmenu', (event) => {
        event.preventDefault();
        paintBox(event.target);
    });

    item.addEventListener('mousedown', (event) => {
        dragged = event.target;
        offsetX = event.clientX - dragged.offsetLeft;
        offsetY = event.clientY - dragged.offsetTop;
    });    

    item.addEventListener('mouseup', () => {
        dragged = ''; 
    });
}
