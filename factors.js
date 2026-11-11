const gcd = ({a, b}) => {
    let temp;

    while (b) {
        a %= b;

        temp = a;
        a = b;
        b = temp;
    }

    return a;
}

const getFractionInSimplestForm = ({ numerator, denominator }) => {
    const hcf = gcd({ numerator, denominator });

    numerator /= hcf;
    denominator /= hcf;

    return {
        numerator,
        denominator
    };
};