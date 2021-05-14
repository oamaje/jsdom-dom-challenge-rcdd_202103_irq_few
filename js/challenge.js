let ctr = 0;
const counterNode = document.querySelector('#counter');
const comments = document.querySelector('.comments');
let iterId;
const btns = document.querySelectorAll('button');

window.addEventListener('DOMContentLoaded', () => {
    addRestartBtn();
    
    startIteration();
    document.body.addEventListener('click', handleBtns);
    document.addEventListener('submit', postComment);
    
});

function addRestartBtn() {
  const restart = document.createElement('button');
  restart.id = 'restart';
  restart.innerText = 'restart';
  document.querySelector('#pause').insertAdjacentElement("afterend", restart);
}

function postComment(e) {
  e.preventDefault();
  const data = new FormData(e.target);
  const comment = data.get('comment');
  const p = document.createElement('p');
  p.innerText = comment;
  comments.append(p);
}

function addCtr(amount) {
  ctr = ctr + amount;
  counterNode.innerText = ctr;
}

function startIteration() {
  iterId = window.setInterval(addCtr, 2*1000, 1);
}

function stopIteration() {
  window.clearInterval(iterId);
}

const liked = [];
const likes = document.querySelector('.likes');
function handleBtns(e) {
  const id = e.target.id;
  if (id === 'minus')
    addCtr(-1);
  if (id === 'plus')
    addCtr(1);
  
  if (id === 'heart') {
    const num = ctr;
    liked.push(num);
    
    let li = document.querySelector(`#n${num}`);
    if (!li) {
      li = document.createElement('li');
      li.id = `n${num}`;
    }
    
    li.innerText = `${num} has been liked ${liked.filter(x => x == num).length} times`;
    
    likes.append(li);
  }
  
  if (id === 'pause') {
    stopIteration(iterId);
    
    changeDisabledNodeArray(true, btns);
    e.target.disabled = false;
    
    e.target.id = 'resume';
    e.target.value = 'resume';
    e.target.innerText = 'resume';
    
  }
  
  if (id === 'resume') {
    iterId = startIteration();
    
    changeDisabledNodeArray(false, btns);
    
    e.target.id = 'pause';
    e.target.value = 'pause';
    e.target.innerText = 'pause';
  }
  
  if (id === 'restart') {
    addCtr(ctr * -1);
    startIteration();
    changeDisabledNodeArray(false, btns);
  }
}

function changeDisabledNodeArray(bool, nodeArr) {
  nodeArr.forEach(node => node.disabled = bool);
}