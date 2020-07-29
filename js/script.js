/******************************************************
 * GLOBAL VARIABLES
 ******************************************************/

const designPanel = document.getElementById('design');
const jsPuns = designPanel.firstElementChild.nextElementSibling.value;
const heartJs = designPanel.lastElementChild.value;

const colorOptions = document.getElementById('color').children;
const colorSelector = colorOptions[0].parentNode;


/******************************************************
 * UPDATES UPPON LAUNCHING
 ******************************************************/

//When the web page loads, the first text field is automatically selected, in 'focus' for editing
document.getElementById('name').focus();

//Hides the 'other' text field upon launching
document.getElementById('other-title').style.display = 'none';



/******************************************************
 * FUNCTIONS
 ******************************************************/

function tshirtSection() {
    const selectOptionElement = document.createElement('option');
    selectOptionElement.value = 'selecttshirt';
    selectOptionElement.textContent = 'Please select T-shirt theme';
    

    for (let i = 0; i < colorOptions.length; i++) {
        colorOptions[i].style.display = 'none';
    }

    colorSelector.value = ''
    colorSelector.insertBefore(selectOptionElement, colorSelector.firstElementChild);
}

function updateColorPanel ( trigger ) {
    
    if (colorOptions[0].value === 'selecttshirt') {
        colorSelector.removeChild(colorSelector.firstElementChild);
    }

    if (trigger == jsPuns) {
        for (let i = 0; i < 3; i++) {
            colorOptions[i].style.display = 'block';
        }
        for (let i = 3; i < 6; i++) {
            colorOptions[i].style.display = 'none';
        }
        colorSelector.options[0].selected = 'selected';
    } else if (trigger == heartJs) {
        for (let i = 3; i < 6; i++) {
            colorOptions[i].style.display = 'block';
        }
        for (let i = 0; i < 3; i++) {
            colorOptions[i].style.display = 'none';
        }
        colorSelector.options[3].selected = 'selected';
    }
    
}



/******************************************************
 * EVENT LISTENERS
 ******************************************************/

//Detecting change in the design panel
designPanel.addEventListener('change', (e) => {
    updateColorPanel(e.target.value);
})



/******************************************************
 * CALLING FUNCTIONS
 ******************************************************/

tshirtSection();