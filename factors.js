const getAllPrimeFactors = (n) => {
    const factors = new Set();

    // make sure n is an integer
    n = parseInt(n);
    const originalN = n;

    // keep track of how many 2's we have
    let power_2 = 0;

    // divide by two until the number is odd
    while (n % 2 === 0) {
        power_2++;
        n /= 2;
    }

    // no point in showing 2^0 is a factor
    if (power_2 !== 0) factors.add([2, power_2]);

    // n must be odd at this point. So we can skip the multiples of 2 by incrementing i by 2
    for (let i = 3; i <= originalN; i += 2) {
        let factor_i = 0;

        while (n % i === 0) {
            factor_i++;
            n /= i;
        }

        factor_i === 0 ? null : factors.add([i, factor_i]);
    }

    return Array.from(factors);
};

const getCommonPrimeFactors = (n1, n2) => {
    const factors1 = getAllPrimeFactors(n1);
    const factors2 = getAllPrimeFactors(n2);

    const commonFactors = [];

    for (const factor1 of factors1) {
        const num = factor1[0];
        const factorPower1 = factor1[1];

        const common = factors2.find((factor2) => factor2[0] === num);
        const factorPower2 = common ? common[1] : 0;

        const power = Math.min(factorPower1, factorPower2);

        if (power === 0) continue;

        commonFactors.push({
            factor: num,
            power: Math.min(factorPower1, factorPower2)
        });
    }

    return commonFactors;
};

const getFractionInSimplestForm = ({ numerator, denominator }) => {
    const commonFactors = getCommonPrimeFactors(numerator, denominator);

    // divide the numerator and denominator with each factor in the common factors
    for (const factor of commonFactors) {
        numerator /= Math.pow(factor.factor, factor.power);
        denominator /= Math.pow(factor.factor, factor.power);
    }

    return {
        numerator,
        denominator
    };
};