const line = document.querySelector('.fraction-initial > .line');
const fractionInitial = document.querySelector('.fraction-initial');

const fractionFinal = document.querySelector('.fraction-final');

const numeratorElement = document.querySelector(
    '.numerator input[type="number"]'
);
const denominatorElement = document.querySelector(
    '.denominator input[type="number"]'
);

const inputs = {
    numerator: '',
    denominator: ''
};

const inputStates = [false, false];

const numeratorOutputElement = document.querySelector('.num-output');
const denominatorOutputElement = document.querySelector('.denom-output');

const submitButton = document.querySelector('.go');

numeratorElement.addEventListener('change', () => {
    inputs.numerator = numeratorElement.value;

    if (numeratorElement.value) {
        if (!inputStates[0]) inputStates[0] = true;
    } else {
        if (inputStates[0]) inputStates[0] = false;
    }

    if (inputStates[0] && inputStates[1]) {
        if (!fractionInitial.classList.contains('fraction-incomplete')) return;

        fractionInitial.classList.toggle('fraction-incomplete');
        fractionInitial.classList.toggle('fraction-complete');
    } else {
        if (fractionInitial.classList.contains('fraction-incomplete')) return;

        fractionInitial.classList.toggle('fraction-incomplete');
        fractionInitial.classList.toggle('fraction-complete');
    }
});

denominatorElement.addEventListener('change', () => {
    inputs.denominator = denominatorElement.value

    if (denominatorElement.value) {
        if (!inputStates[1]) inputStates[1] = true;
    } else {
        if (inputStates[1]) inputStates[1] = false;
    }

    if (inputStates[0] && inputStates[1]) {
        if (!fractionInitial.classList.contains('fraction-incomplete')) return;

        fractionInitial.classList.toggle('fraction-incomplete');
        fractionInitial.classList.toggle('fraction-complete');
    } else {
        if (fractionInitial.classList.contains('fraction-incomplete')) return;

        fractionInitial.classList.toggle('fraction-incomplete');
        fractionInitial.classList.toggle('fraction-complete');
    }
});

document.addEventListener('keyup', (key) => {
    switch (key.key) {
        case 'Enter':
            submitButton.click();
            break;

        case 'n':
            numeratorElement.focus();
            break;

        case 'd':
            denominatorElement.focus();
            break;

        case 'Escape':
            document.activeElement.blur();
            break;
        
        default:
            break;
    }
});

submitButton.addEventListener('click', () => {
    const numerator = inputs.numerator;
    const denominator = inputs.denominator;

    const updated = getFractionInSimplestForm({ numerator, denominator });

    numeratorOutputElement.animate(
        {
            opacity: 0,
            easing: 'ease-in-out'
        },
        {
            fill: 'forwards',
            duration: 100
        }
    );
    denominatorOutputElement.animate(
        {
            opacity: 0,
            easing: 'ease-in-out'
        },
        {
            fill: 'forwards',
            duration: 100
        }
    );

    numeratorOutputElement.innerHTML = updated.numerator;
    denominatorOutputElement.innerHTML = updated.denominator;

    numeratorOutputElement.animate(
        {
            opacity: 1,
            easing: 'ease-in-out'
        },
        {
            fill: 'forwards',
            duration: 100
        }
    );
    denominatorOutputElement.animate(
        {
            opacity: 1,
            easing: 'ease-in-out'
        },
        {
            fill: 'forwards',
            duration: 100
        }
    );

    const numeratorLength = updated.numerator.toString().length;
    const denominatorLength = updated.denominator.toString().length;

    const preferredLength = Math.max(numeratorLength, denominatorLength);

    fractionFinal.style.setProperty('--letter', preferredLength);
});
