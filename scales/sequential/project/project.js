const getInputValue = (input) => Number(document.getElementById(input).value);

const onClick = () => {
    const cement = getInputValue('cement');
    const blast = getInputValue('blast');
    const ash = getInputValue('ash');
    const age = getInputValue('age');

    const inputs = {
        cement: cement >= 100 && cement <= 500,
        blast: blast >= 0 && blast <= 360,
        ash: ash >= 0 && ash <= 200,
        age: age >= 1 && age <= 365,
        domain: cement + blast + ash + age > 0,
    }

    const cementColour = d3.scaleSequential()
        .domain([101, 1425])
        .interpolator(d3.interpolateGreys);

    const domainValue = cement + blast + ash + age;

    if (
        inputs.cement &&
        inputs.blast &&
        inputs.ash &&
        inputs.age &&
        inputs.domain
    ) {
        const colour = cementColour(domainValue);
        d3.select('svg rect').attr('fill', colour);
        d3.select('svg text').text(colour).attr('x', '10').attr('y', '480');
    }
}

document.querySelector('button').addEventListener('click', onClick);
