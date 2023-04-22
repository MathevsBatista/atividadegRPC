const grpc = require('grpc');
const protoLoader = require('@grpc/proto-loader');
const readline = require('readline');

const packageDefinition = protoLoader.loadSync('calculator.proto');
const protoDescriptor = grpc.loadPackageDefinition(packageDefinition);
const { CalculatorService } = protoDescriptor.calculator;

const client = new CalculatorService('localhost:50051', grpc.credentials.createInsecure());

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

function calculate(a, op, b) {
  return new Promise((resolve, reject) => {
    const calculation = { a, b, operator: op };
    client.Calculate(calculation, (err, response) => {
      if (err) {
        reject(err);
      } else {
        resolve(response.result);
      }
    });
  });
}

async function run() {
  console.log('Enter a calculation (e.g. 2 + 3)');
  for await (const line of rl) {
    const [a, op, b] = line.trim().split(' ');
    try {
      const result = await calculate(parseFloat(a), op, parseFloat(b));
      console.log(`Result: ${result}`);
    } catch (err) {
      console.error(err);
    }
    console.log('\nEnter another calculation (e.g. 5 - 2), or press Ctrl+C to exit');
  }
}

run();

