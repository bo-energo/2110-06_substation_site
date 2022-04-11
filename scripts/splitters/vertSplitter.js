/*
1-название сплиттера
2-если вертикальный то левый и правый блоки, если горизонтальный то верхни и нижний блоки
*/

let splitter, startPos, endPos, idSplitter, idLeftBlock, idRightBlock, offset;
function init(_idSplitter, _idLleftBlock, _idRightBlock, _offset) {
    splitter = $(`#${_idSplitter}`)[0];
    idSplitter = _idSplitter;
    idLeftBlock = _idLleftBlock;
    idRightBlock = _idRightBlock;
    offset = _offset;
    startPos = 0;
    endPos = 0;
    splitter.style.height = `${$(`#${_idLleftBlock}`).css('height')}`;
    splitter.style.marginLeft = `${(parseInt($(`#${_idLleftBlock}`).css('width'))) + 2}` + "px";
    console.log(splitter.style.marginLeft);
}

function splitterMoveStart(e) {
    startPos = e.clientX;
    $(`#${idSplitter}`).off('mousedown');
    $(document).mousemove((e) => splitterMove(e))
    $(document).mouseup((e) => splitterMoveStop(e))
}

function splitterMoveStop(e) {
    $(document).off('mousemove');
    $(document).off('mouseup');
    $(`#${idSplitter}`).mousedown(splitterMoveStart);

    let dif = startPos - endPos + parseInt($(`#${idSplitter}`).css("width"));
    let lb = parseInt($(`#${idLeftBlock}`).css("width"));
    let rb = parseInt($(`#${idRightBlock}`).css("width"));


    if (dif < 0) {
        $(`#${idLeftBlock}`).css("width", lb + Math.abs(dif));
        $(`#${idRightBlock}`).css("width", rb - Math.abs(dif));
        splitter.style.marginLeft = `${parseInt($(`#${idLeftBlock}`).css("width")) +2}px`;
    }
    else if (dif > 0) {
        $(`#${idLeftBlock}`).css("width", lb - Math.abs(dif));
        $(`#${idRightBlock}`).css("width", rb + Math.abs(dif));
        splitter.style.marginLeft = `${parseInt($(`#${idLeftBlock}`).css("width"))+2}px`;
    }
    else
        return;

    createDemoChart($(`.chart`).css("height"));
}

function splitterMove(e) {
    splitter.style.marginLeft = `${e.clientX-offset-17}px`;
    endPos = e.clientX;

    console.log(offset);
}


// init('splitterVertical', 'leftB', 'rightB');
// $(`#${idSplitter}`).mousedown((e) => splitterMoveStart(e));

function SpliterSetEvent(){
    $(`#${idSplitter}`).mousedown((e) => splitterMoveStart(e));
}
