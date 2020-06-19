const math = require('../src/math');
const { add } = require('../src/math');

test('Should calculate total with tip', () => {
    const total = math.calculateTip(10, .3);

    expect(total).toBe(13);
});

test('Should calculate total with default tip', () => {
    const total = math.calculateTip(10);

    expect(total).toBe(12.5);
});

test('Should convert 32 F to 0 C', () => {
    const temp = math.fahrenheitToCelsius(32);

    expect(temp).toBe(0);
});

test('Should convert 0 C to 32 F', () => {
    const temp = math.celsiusToFahrenheit(0);

    expect(temp).toBe(32);
});

test('Aync test demo', done => {
    setTimeout(() => {
        expect(1).toBe(1);
        done();
    }, 2000);
});

test('Should add two numbers', async () => {
    const sum = await add(2, 5);
    expect(sum).toBe(7);
});