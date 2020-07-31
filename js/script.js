/******************************************************
 * GLOBAL VARIABLES
 ******************************************************/

    const designPanel = document.getElementById('design');
    const jsPuns = designPanel.firstElementChild.nextElementSibling.value;
    const heartJs = designPanel.lastElementChild.value;
    const jobTitle = document.getElementById('title');
    const otherTitle = document.getElementById('other-title');

    const designOptions = document.getElementById('design').children;
    const designSelector = designOptions[0].parentNode;
    const colorOptions = document.getElementById('color').children;
    const colorSelector = colorOptions[0].parentNode;
    const colorDiv = document.getElementById('colors-js-puns');

    const activitiesSelector = document.getElementsByClassName('activities')[0];
    const activities = activitiesSelector.querySelectorAll('input');
    let totalPrice = 0;

    const paymentSelector = document.getElementById("payment");

    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('mail');
    const form = document.getElementsByTagName('form')[0];
    const creditCardInput = document.getElementById('cc-num');
    const zipCodeInput = document.getElementById('zip');
    const cvvInput = document.getElementById('cvv');

    let creditCardSelected = true;

    const currentBorderColor = nameInput.style.borderColor;

    const creditCardDiv = document.getElementById('credit-card');
    const paypalDiv = document.getElementById('paypal');
    const bitcoinDiv = document.getElementById('bitcoin');
//


/******************************************************
 * UPDATES UPPON LAUNCHING
 ******************************************************/

    //When the web page loads, the first text field is automatically selected, in 'focus' for editing
    document.getElementById('name').focus();

    //Hides the 'other' text field upon launching
    otherTitle.style.display = 'none';

    const totalCostDisplay = document.createElement('h2');
    totalCostDisplay.textContent = 'TOTAL: $0';
    activitiesSelector.appendChild(totalCostDisplay);

    bitcoinDiv.hidden = true;
    paypalDiv.hidden = true;
    
    colorDiv.hidden = true;

//


/******************************************************
 * FUNCTIONS
 ******************************************************/

    function jobRoleHandler( trigger ) {
        if ( trigger === 'other' ) {
            otherTitle.style.display = 'block';
        } else {
            otherTitle.style.display = 'none';
        }
    }


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
    function updateDesignPanel () {
        if (designOptions[0].textContent === 'Select Theme') {
            designSelector.removeChild(designSelector.firstElementChild);
        }
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
    


    function activityHandler ( trigger ) {
        const checkboxes = activitiesSelector.querySelectorAll('input');
        if (trigger.checked === true) {
            totalPrice += +trigger.getAttribute('data-cost');
        } else if (trigger.checked === false) {
            totalPrice -= +trigger.getAttribute('data-cost');
        }
        totalCostDisplay.textContent = `TOTAL: $${totalPrice}`;
        if (trigger.checked === true) {
            for (let i = 0; i < checkboxes.length; i++) {
                if (checkboxes[i].getAttribute('data-day-and-time') === trigger.getAttribute('data-day-and-time') && checkboxes[i].getAttribute('name') !== trigger.getAttribute('name')) {
                    checkboxes[i].disabled = true;
                }
            }
        } else {
            for (let i = 0; i < checkboxes.length; i++) {
                if (checkboxes[i].getAttribute('data-day-and-time') === trigger.getAttribute('data-day-and-time') && checkboxes[i].getAttribute('name') !== trigger.getAttribute('name')) {
                    checkboxes[i].disabled = false;
                }
            }
        }
    }


    function paymentHandler( trigger ) {   
        if (paymentSelector.firstElementChild.value === 'select method') {
        paymentSelector.removeChild(paymentSelector[0]);
        }
        if ( trigger === 'paypal') {
            creditCardDiv.hidden = true;
            bitcoinDiv.hidden = true;
            paypalDiv.hidden = false;
            creditCardSelected = false;
        } else if ( trigger === 'bitcoin') {
            creditCardDiv.hidden = true;
            bitcoinDiv.hidden = false;
            paypalDiv.hidden = true;   
            creditCardSelected = false;     
        } else if ( trigger === 'credit card') {
            creditCardDiv.hidden = false;
            bitcoinDiv.hidden = true;
            paypalDiv.hidden = true;
            creditCardSelected = true;
        }

    }
//



/******************************************************
 * VALIDATION FUNCTIONS
 ******************************************************/

function nameValidation () {
    const nameRequirement = /^\w+/;
    return  nameRequirement.test(nameInput.value);
}
function emailValidation () {
    const emailRequirement = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;
    const testValue = emailRequirement.test(emailInput.value);
    
    if(!testValue) {
        emailInput.style.borderColor = 'red';
        finalVal = false;
        const emailRequirement = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;
        
        try {
            document.getElementsByClassName('emptyFieldWarning')[0].parentNode.removeChild(document.getElementsByClassName('emptyFieldWarning')[0])
        } catch {
            console.log('error');
        }

        const emptyFieldWarning = document.createElement('h3');
        emptyFieldWarning.className = 'emptyFieldWarning';
        emptyFieldWarning.style.color = 'red';

        if (emailInput.value == '' || emailInput.value == null) {
            emptyFieldWarning.textContent = 'Please enter your email!'; 

        } else if (!emailRequirement.test(emailInput.value)) {
            emptyFieldWarning.textContent = 'Please enter a valid email (example@abc.de)!';
        }

        emailInput.parentNode.insertBefore(emptyFieldWarning, emailInput.nextSibling);

    } else {
        emailInput.style.borderColor = currentBorderColor;
        try {
            document.getElementsByClassName('emptyFieldWarning')[0].parentNode.removeChild(document.getElementsByClassName('emptyFieldWarning')[0])
        } catch {
            console.log('error');
        }
    }
    return testValue;
}
function activityValidation () {
    let condition = false;
    for ( let i = 0; i < activities.length; i ++) {
        if (activities[i].checked) {
            condition = true;
        }
    }
    return condition;
}


//Regex source: https://stackoverflow.com/questions/40775674/credit-card-input-validation-using-regular-expression-in-javascript
function creditCardNumValidation () {
  const visaRegEx = /^(?:4[0-9]{12}(?:[0-9]{3})?)$/;
  const mastercardRegEx = /^(?:5[1-5][0-9]{14})$/;
  const amexpRegEx = /^(?:3[47][0-9]{13})$/;
  const discovRegEx = /^(?:6(?:011|5[0-9][0-9])[0-9]{12})$/;

  if (visaRegEx.test(creditCardInput.value)) {
    return true;
  } else if(mastercardRegEx.test(creditCardInput.value)) {
    return true;
  } else if(amexpRegEx.test(creditCardInput.value)) {
    return true;
  } else if(discovRegEx.test(creditCardInput.value)) {
    return true;
  } else {
      return false;
  }
}
//Regex source: http://zparacha.com/validate-zip-code-using-javascript-regular-expression
function zipCodeValidation () {
    const zipCodeRequirement = /^\d{5}$|^\d{5}-\d{4}$/;
    return zipCodeRequirement.test(zipCodeInput.value);
}
function cvvValidation () {
    const cvvRequirement = /^[0-9]{3,4}$/;
    return cvvRequirement.test(cvvInput.value);
}




function finalValidation () {
    let finalVal = true;
    if (!nameValidation()) {
        nameInput.style.borderColor = 'red';
        finalVal = false;
    } else {
        nameInput.style.borderColor = currentBorderColor;
    }

    if (!emailValidation) {
        finalVal = false;
    }

    if (!activityValidation()) {
        activitiesSelector.style.border = 'solid red';
        activitiesSelector.style.paddingLeft = '5px';
        finalVal = false;
    } else {
        activitiesSelector.style.border = '';
        activitiesSelector.style.paddingLeft = '';
    }

    if (creditCardSelected) {
        if (!creditCardNumValidation()) {
            creditCardInput.style.borderColor = 'red';
            finalVal = false;
        } else {
            creditCardInput.style.borderColor = currentBorderColor;
        }

        if (!zipCodeValidation()) {
            zipCodeInput.style.borderColor = 'red';
            finalVal = false;
        } else {
            zipCodeInput.style.borderColor = currentBorderColor;
        }

        if (!cvvValidation()) {
            cvvInput.style.borderColor = 'red';
            finalVal = false;
        } else {
            cvvInput.style.borderColor = currentBorderColor;
        }
    }
    return finalVal;
}



/******************************************************
 * EVENT LISTENERS
 ******************************************************/

    jobTitle.addEventListener('change', (e) => {
        jobRoleHandler(e.target.value);
    })

    emailInput.addEventListener('keyup', (e) => {
        console.log(emailValidation());
        
    })
    
    designPanel.addEventListener('change', (e) => {
        updateColorPanel(e.target.value);
        colorDiv.hidden = false;
        updateDesignPanel();

    })

    activitiesSelector.addEventListener('change', (e) => {
        activityHandler(e.target);
    });

    paymentSelector.addEventListener('change', (e) =>{
        paymentHandler(e.target.value);
    })

    form.addEventListener('submit', (e) => {
        
        if (!finalValidation()) {
            e.preventDefault();
        } else {
          console.log(' ');  
    }});
//


/******************************************************
 * CALLING FUNCTIONS
 ******************************************************/

    tshirtSection();
    paymentHandler();
//