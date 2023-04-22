// GENERATED CODE -- DO NOT EDIT!

'use strict';
var grpc = require('grpc');
var calculator_pb = require('./calculator_pb.js');

function serialize_calculator_Calculation(arg) {
  if (!(arg instanceof calculator_pb.Calculation)) {
    throw new Error('Expected argument of type calculator.Calculation');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_calculator_Calculation(buffer_arg) {
  return calculator_pb.Calculation.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_calculator_Result(arg) {
  if (!(arg instanceof calculator_pb.Result)) {
    throw new Error('Expected argument of type calculator.Result');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_calculator_Result(buffer_arg) {
  return calculator_pb.Result.deserializeBinary(new Uint8Array(buffer_arg));
}


var CalculatorServiceService = exports.CalculatorServiceService = {
  calculate: {
    path: '/calculator.CalculatorService/Calculate',
    requestStream: false,
    responseStream: false,
    requestType: calculator_pb.Calculation,
    responseType: calculator_pb.Result,
    requestSerialize: serialize_calculator_Calculation,
    requestDeserialize: deserialize_calculator_Calculation,
    responseSerialize: serialize_calculator_Result,
    responseDeserialize: deserialize_calculator_Result,
  },
};

exports.CalculatorServiceClient = grpc.makeGenericClientConstructor(CalculatorServiceService);
