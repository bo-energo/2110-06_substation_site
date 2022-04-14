let states = ["normal", "warning", "critical", "empty"];
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
    { title: 'normal', bg: 'bg-success', colorText: 'text-white' },
    { title: 'warning', bg: 'bg-warning', colorText: 'text-white' },
    { title: 'critical', bg: 'bg-danger', colorText: 'text-white' },
    { title: 'empty', bg: 'bg-white', colorText: 'text-dark' }];

let discriptionDisp;

// let url = "http://10.100.1.2:8000/transofrmList";
// function getDisps(url){
//     return fetch(url)
//         .then(data => data.json())
//         .then(dispsFromSer => {
//             console.log(dispsFromSer);
//             initMainWindow(categories, dispsFromSer)
//         })
//         .catch(err => console.log(err));
// }
    
//getDisps(url);
initMainWindow(categories, disps);
let lMenu = new LeftMenu(disps);
lMenu.componentsInit();


$('.disp').click((e) => {
    discriptionDisp = e.currentTarget.innerText.split('\n');
    loadDisp(discriptionDisp[0])
    if(lMenu.checkStateMenu()){
        lMenu.hide();
    }
});


window.onresize = function () {
    loadDisp(discriptionDisp[0]);
}
