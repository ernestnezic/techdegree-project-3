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

    //Creating and apending the default ($0) total cost element
    const totalCostDisplay = document.createElement('h2');
    totalCostDisplay.textContent = 'TOTAL: $0';
    activitiesSelector.appendChild(totalCostDisplay);

    //Hiding the bitcoin and the paypal div by default
    bitcoinDiv.hidden = true;
    paypalDiv.hidden = true;
    
    //Hidding the color div by default
    colorDiv.hidden = true;
//



/******************************************************
 * FUNCTIONS
 ******************************************************/

    //Showing the 'Other' text input field if the selected value of the option is 'other'
    function jobRoleHandler( trigger ) {
        if ( trigger === 'other' ) {
            otherTitle.style.display = 'block';
        } else {
            otherTitle.style.display = 'none';
        }
    }


    //Setting the default option of 'color selection' to 'please select t-shirt theme' and hiding all of the other options
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
    //Removing the 'select theme' option if there is one
    function updateDesignPanel () {
        if (designOptions[0].textContent === 'Select Theme') {
            designSelector.removeChild(designSelector.firstElementChild);
        }
    }
    //Updating the 'color selection' based on the design selected by the trigger (event target element)
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
    

    //Displaying the total price and not letting the user select 2 events happening at the same time by disabling checkboxes
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


    //Removing the 'select method' element and displaying the selected payment method panel with the 'credit card' being the default
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

    //Validating the name
    function nameValidation () {
        const nameRequirement = /^\w+/;
        return  nameRequirement.test(nameInput.value);
    }
    //Validating the email live with different error messages appearing based on the error type
    function emailValidation () {
        const emailRequirement = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;
        const testValue = emailRequirement.test(emailInput.value);
        
        
        if(!testValue) {
            finalVal = false;
            emailInput.style.borderColor = 'red';
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
    //Validating the activity
    function activityValidation () {
        let condition = false;
        for ( let i = 0; i < activities.length; i ++) {
            if (activities[i].checked) {
                condition = true;
            }
        }
        return condition;
    }


    //Validating the credit card number
    function creditCardNumValidation () {
    const creditCardRequirement = /^[0-9]{13,16}$/;

    if (creditCardRequirement.test(creditCardInput.value)) {
        return true;
    } else {
        return false;
    }
    }
    //Validating the zip code
    //Regex source: http://zparacha.com/validate-zip-code-using-javascript-regular-expression
    function zipCodeValidation () {
        const zipCodeRequirement = /^\d{5}$|^\d{5}-\d{4}$/;
        return zipCodeRequirement.test(zipCodeInput.value);
    }
    //Validating the cvv
    function cvvValidation () {
        const cvvRequirement = /^[0-9]{3,4}$/;
        return cvvRequirement.test(cvvInput.value);
    }


    //Making sure that all the requirements are met before submiting the form, indicating the error fields
    function finalValidation () {
        let finalVal = true;
        if (!nameValidation()) {
            nameInput.style.borderColor = 'red';
            finalVal = false;
        } else {
            nameInput.style.borderColor = currentBorderColor;
        }

        if (!emailValidation()) {
            finalVal = false;
            emailInput.style.borderColor = 'red';
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
//



/******************************************************
 * EVENT LISTENERS
 ******************************************************/

    //Listens for changes in the 'jobTitle' options menu and calls on the 'jobRoleHandler' method with the value of the event target
    jobTitle.addEventListener('change', (e) => {
        jobRoleHandler(e.target.value);
    })

    //Listenes for input from when user starts typing and calls on the 'emailValidation' method each time a key is inputed
    emailInput.addEventListener('keyup', () => {
        emailValidation();
        
    })
    
    //Listens for change in the design pannel, shows the color panel  and calls on the 'updateColorPanel' and 'updateDesignPanel' methods
    designPanel.addEventListener('change', (e) => {
        updateColorPanel(e.target.value);
        colorDiv.hidden = false;
        updateDesignPanel();

    })

    //Listens for change in the activity panel and calls the 'activityHandler' method with event target
    activitiesSelector.addEventListener('change', (e) => {
        activityHandler(e.target);
    });

    //Listens for change in the payment section and calls the 'paymentHandler' method with current event target's value
    paymentSelector.addEventListener('change', (e) =>{
        paymentHandler(e.target.value);
    })

    //Listens for the form submition event and prevents the form from submiting if the 'finalValidation' method returns 'false'
    form.addEventListener('submit', (e) => {
        if (!finalValidation()) {
            e.preventDefault();
        } 
    });
//



/******************************************************
 * CALLING FUNCTIONS
 ******************************************************/

    tshirtSection();
    paymentHandler();
//