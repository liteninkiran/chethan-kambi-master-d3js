const labelsFor = ['fname', 'lname', 'male', 'female', 'nomention'];
const labels = d3.selectAll('label');

const addFor = function (_d, i) {
    d3.select(this).attr('for', labelsFor[i]);
}

// Add "for" to the inputs. Notice that clicking on a label gives focus to the input.
labels.filter(addFor);

// Find the first/last name input
const firstNameInput = d3.select('#fname');
const lastNameInput = d3.select('#lname');

// Define properties
const setProperties = (input, placeholder) => {
    // Add the type of input. Notice the CSS is applied to First Name.
    input.property('type', 'text');

    // Update the placeholder
    input.property('placeholder', placeholder);
}

// Set type / placeholder properties
setProperties(firstNameInput, 'e.g. John');
setProperties(lastNameInput, 'e.g. Doe');

// Output placeholders
console.log(firstNameInput.property('placeholder'));
console.log(lastNameInput.property('placeholder'));

// Find the submit input element
const submitInput = d3.select('#submit');

// Update submit button. Notice the CSS now styles the input to look like a button.
submitInput
    .property('type', 'submit')
    .property('value', 'Submit');

// Find gender inputss
const genderInputs = d3.selectAll('.gender input');

// Change to checkbox
genderInputs.property('type', 'checkbox');

// Update values (check dev tools to see value has been included on the elements)
const genderValues = ['male', 'female', 'nomention'];
genderInputs.property('value', (_d, i) => genderValues[i]);

// Set no mention to true by default
const nomention = d3.select('#nomention');
nomention.property('checked', 'true');

document.querySelector('#formsubmit')
    .addEventListener('submit', e => {
        e.preventDefault();
        console.log(firstNameInput.property('value'));
        console.log(lastNameInput.property('value'));
        console.log(genderInputs._groups[0][0].checked);
        console.log(genderInputs._groups[0][1].checked);
        console.log(genderInputs._groups[0][2].checked);
    }
);
