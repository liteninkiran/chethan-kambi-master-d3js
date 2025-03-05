const buttonPressed = (event) => {
    const button = event.target;
    if (button && button.value) {
        selectingElements(button.value, button.innerText);
    }
}

const buttons = document.querySelector('.buttons');

const rgbCodes = () => [Math.random() * 255, Math.random() * 255, Math.random() * 255];

const applyColour = (obj, i, red, green, blue) => obj.style.fill = `rgba(${red}, ${green}, ${blue}, ${(i + 1) * 0.25})`;

const getObjects = (className, isSelect) => isSelect ? d3.select(className) : d3.selectAll(className);

const selectingElements = (name, label) => {
    document.querySelector('div#output').firstElementChild.innerText = label;
    const [red, green, blue] = rgbCodes();
    const isSelect = name === 'select';
    const elements = [
        getObjects('.circle', isSelect),
        getObjects('.square', isSelect),
        getObjects('.rectangle', isSelect),
    ];

    const fn = function (_d, i) {
        if (name === 'filterOdd') {
            if (i % 2 === 0) {
                applyColour(this, i, red, green, blue);
            }
        }
        else if (name === 'filterEven') {
            if (i % 2 !== 0) {
                applyColour(this, i, red, green, blue);
            }
        }
        else {
            applyColour(this, i, red, green, blue);
        }
    }

    elements.forEach((element) => element.filter(fn));
}

buttons.addEventListener('click', buttonPressed);
