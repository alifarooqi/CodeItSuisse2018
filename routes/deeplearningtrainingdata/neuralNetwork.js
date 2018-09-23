const math = require('mathjs')

class NeuralNetwork{
    NeuralNetwork(input_x_hidden_weights, hidden_x_output_weights){
        this.activationFunction = function sigmoid(x) {
            return 1 / (1 + Math.exp(-x));
        }
        this.input_x_hidden_weights = math.matrix(input_x_hidden_weights);
        this.hidden_x_output_weights = math.matrix(hidden_x_output_weights);
    }

    query = (input_array)=>{
        let inputs = math.matrix(input_array);

        let hidden_layer_input = math.multiply(inputs, this.input_x_hidden_weights);
        let hidden_layer_output = hidden_layer_input.map(x => this.activationFunction(x));

        let output_layer_input = math.multiply(hidden_layer_output, this.hidden_x_output_weights);
        let output_layer_output = output_layer_input.map(x => this.activationFunction(x));

        return output_layer_output;
    }
}