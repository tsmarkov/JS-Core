function toggle() {
    let btn = document.querySelector('.button').textContent;
    console.log(btn);

    if (btn === 'More') {
        console.log('V more sum');
        document.querySelector('.button').textContent = 'Less';
        document.getElementById('extra').style.display = 'block';
    } else if (btn == 'Less') {
        console.log('V less sum');
        document.querySelector('.button').textContent = 'More';
        document.getElementById('extra').style.display = 'none';
    }
}