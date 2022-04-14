let states = ["Normal", "Warning", "Critical", "Empty"];
let disps = [];

function getRandomArbitrary(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
}

for (let i = 0; i < 15; i++) {
    let _state = states[getRandomArbitrary(0, 4)];
    let _discription = _state == "Normal" || _state == "Empty" ? "" : "Описание проблемы.......";

    disps.push({ title: `AT${i}`, state: _state, discriptionProblem: _discription });
}

let categories = [
    { title: 'Normal', bg: 'bg-success', colorText: 'text-white' },
    { title: 'Warning', bg: 'bg-warning', colorText: 'text-white' },
    { title: 'Critical', bg: 'bg-danger', colorText: 'text-white' },
    { title: 'Empty', bg: 'bg-white', colorText: 'text-dark' }];

let discriptionDisp;

initMainWindow(categories, disps);
let lMenu = new LeftMenu(disps);
lMenu.componentsInit();


$('.disp').click((e) => {
    discriptionDisp = e.currentTarget.innerText.split('\n');
    loadDisp(discriptionDisp[0])
    //console.log(discriptionDisp);
    //lMenu.checkStateMenu();
});


window.onresize = function () {
    loadDisp(discriptionDisp[0]);
}