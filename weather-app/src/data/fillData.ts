import readline from 'readline'
import {City} from "../types"

const data: Array<City> = []

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.question('Please enter a color? ', (value) => {
    let color = value
    console.log(`You entered ${color}`);
    rl.close();
});
