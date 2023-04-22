const grpc = require('grpc');
const protoLoader = require('@grpc/proto-loader');

const packageDefinition = protoLoader.loadSync('calculator.proto');
const protoDescriptor = grpc.loadPackageDefinition(packageDefinition);

const { CalculatorService } = protoDescriptor.calculator;
const server = new grpc.Server();

function calculate(call, callback) {
  const { a, b, operator } = call.request;
  let result;
  switch (operator) {
    case '+':
      result = a + b;
      break;
    case '-':
      result = a - b;
      break;
    case '*':
      result = a * b;
      break;
    case '/':
      result = a / b;
      break;
    default:
      return callback(new Error('Invalid operator'));
  }
  const response = { result };
  callback(null, response);
}

server.addService(CalculatorService.service, { calculate });
server.bind('0.0.0.0:50051', grpc.ServerCredentials.createInsecure());
server.start();

console.log('Server started on port 50051');

