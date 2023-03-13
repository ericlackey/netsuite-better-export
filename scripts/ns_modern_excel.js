// Create div to show export options
const divBE = document.createElement('div');
divBE.classList.add('better_export');
divBE.setAttribute('onmouseleave','complete();');
document.body.appendChild(divBE);

// Define available export formats
const exportFormats = {
    "xlsx": {
        "ext": "xlsx",
        "name": "Excel 2007+"
    },
    "xlml": {
        "ext": "xls",
        "name": "Excel 2003-2004"
    },
    "csv": {
        "ext": "csv",
        "name": "Comma Separated Values"
    },
    "txt": {
        "ext": "txt",
        "name": "Text"
    },
    "html": {
        "ext": "html",
        "name": "HTML Document"
    },
    "ods": {
        "ext": "ods",
        "name": "Open Document Spreadsheet"
    },
}

// Find the proper place in the DOM to inject the Better Export icon
const observer = new MutationObserver(function(mutations_list) {
    mutations_list.forEach(function(mutation) {
        mutation.addedNodes.forEach(function(added_node) {
            if (!added_node.children || added_node.children.length==0) {
                return;
            }
            const childZero = added_node.children[0];
            try {
                if (childZero && childZero.getAttribute('data-button-code') == 'export') {
                    let myTD = document.createElement('td');
                    let myDiv = document.createElement('div');
                    myImgUrl = document.getElementById('me-icon').src;
                    myDiv.classList.add('better_export_icon');
                    myDiv.style=`background-image:url(${myImgUrl});background-repeat: no-repeat;background-size: cover;`;            
                    myDiv.setAttribute('onclick','displayOptions(this);');
                    myTD.append(myDiv);
                    childZero.parentNode.before(myTD);
                }
            } catch (err) {
                console.log(err);
                console.log(childZero);
            }
        });
    });
});
observer.observe(document.querySelector("[id=div__footer]"), { subtree: true, childList: true });

// Build the list of options
function displayOptions(button) {

    // If user clicks icon again and menu is already visible, then hide it
    if (divBE.style.visibility=='visible') {
        divBE.style.visibility='hidden';
        return;
    }

    // Find the location of the BE icon. We want to put the options menu right below it.
    const buttonCoordinates = button.getBoundingClientRect();
    divBE.style.top = `${buttonCoordinates.top+20}px`;
    divBE.style.left = `${buttonCoordinates.left}px`;

    // Make sure DIV is cleared of content
    divBE.innerHTML = '';

    let divRow = '';

    // Add all available export options
    for (const [key, format] of Object.entries(exportFormats)) {
        divRow = document.createElement('div');
        divRow.setAttribute('onclick',`exportSearchResults('${key}','${format.ext}')`);
        divRow.textContent = format.name;
        divRow.classList.add('better_export_option');
        divBE.appendChild(divRow);
    }

    // Make the options list visible
    divBE.style.visibility='visible';

    return;
}

// Indicate the the search results are loading
function loading(message) {
    divBE.innerHTML = '';
    let imgLoading = document.createElement('img');
    imgLoading.src = document.getElementById('me-loading-icon').src;
    imgLoading.classList.add('better_export_loading_image');
    divBE.append(imgLoading);
    let textBox = document.createElement('div');
    textBox.classList.add('better_export_loading_text');
    textBox.textContent = message;
    divBE.append(textBox);
}

// Display error message if the convert didn't work
function showError() {
    divBE.textContent = 'Oops, an error occurred. Check the error console for more details. Try again and then try another export option if that fails.';
}

// Hide the dropdown when complete
function complete() {
    divBE.style.visibility='hidden';
}

function exportSearchResults(format, ext) {
    
    console.log(window.location.pathname);

    const excelUrl = appendFormDataToURL(`${window.location.pathname}?searchType=Customer`).replace("OfficeXML=F","OfficeXML=T").replace("csv=HTML","csv=Export");

    let fileName = document.title;
    
    fileName = fileName.split(/(\:|\-)/)[0].replace(/\s+/g,'');

    console.log(fileName);

 
    (async() => {
    
        try {
            loading('Downloading...');
            const myArrayBuffer = await (await fetch(excelUrl)).arrayBuffer();
            loading('Converting...');
            var data = new Uint8Array(myArrayBuffer);
            var arr = new Array();
            for(var i = 0; i != data.length; ++i) arr[i] = String.fromCharCode(data[i]);
            var bstr = arr.join("");
            const workbook = await XLSX.read(bstr, {
                type: "binary",
                cellDates: true,
                cellHTML: true,
                cellText: true,
                cellStyles: true,
                cellNF: true
            });
            const wopts = { bookType:format, bookSST:false, type:'binaryx' };
            XLSX.writeFile(workbook, `${fileName}.${ext}`, wopts);
            complete();
        } catch(error) {
            console.error(error);
            showError();
        }

    })();

}

