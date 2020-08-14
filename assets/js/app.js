// GET MODULE`
const { dialog } = require('electron').remote;
const fs = require('fs');

// GET DOM
const openFileBtn = document.getElementById('openFile'),
    saveFileBtn = document.getElementById('saveFile'),
    textEditor = document.getElementById('editor');

let fileUrl;

// event listener
openFileBtn.addEventListener('click', clickOpenBtnHandler);
saveFileBtn.addEventListener('click', clickSaveBtnHandler);

// functions
function clickOpenBtnHandler() {
    openFile(data => {
        if(!data) {
            dialog.showMessageBox({message: "not file", buttons: ['okay']});
        }
        textEditor.value = data;

        dialog.showMessageBox({message: "open the file", buttons: ['okay']});

        saveFileBtn.classList.remove('d-none')
    });
}

function clickSaveBtnHandler() {
    changeFile(fileUrl);
}

async function openFile(callback) {
    const optionsDialog = {
        filters: [{ name: 'text', extensions: ['txt'] }],
        title: "open the new txt file"
    };

    try {
        const result = await dialog.showOpenDialog(optionsDialog);

        if(result.canceled) {
            return;
        }

        const resultPath = result.filePaths[0];

        fileUrl = resultPath;``

        fs.readFile(resultPath, 'utf8', (error, data) => {
            if(error) {
                console.log('error in fs file', error);
            }

            callback(data);
        });
    }catch(error) {
        console.log('error on dialog result => ', error);
    }
}

function changeFile(path) {
    fs.writeFile(path, textEditor.value, error => {
        if(error) {
            console.log('error in write file');
            console.log(error);
            return;
        }
        console.log('change the file');
    });
}