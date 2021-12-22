const fs = require("fs").promises;

async function rgb888_to_bgr555(fileName, outputName) {
    var input = await fs.readFile(fileName);
    var colors = [];
    var outputs = [];
    var intOutputs = [];
    for (let i = 0; i < input.length; i++) {
        const element = input[i];
        if(!colors[Math.floor(i/3)]){
            colors[Math.floor(i/3)] = ["","",""]
        }
        var newNumber = element.toString(2);
        while (newNumber.length < 8){
            newNumber="0"+newNumber;
        }
        newNumber = newNumber.slice(0,5)
        colors[Math.floor(i/3)][i%3] = newNumber;
    }
    colors.forEach(color => {
        color.reverse();
        outputs.push("0"+color.join(""))
    })
    outputs.forEach(binaryString => {
        intOutputs.push(parseInt(binaryString.slice(8,16),2), parseInt(binaryString.slice(0,8),2))
    });
    var binaryOutput = Buffer.from(intOutputs);
    console.log(binaryOutput)
    fs.writeFile(outputName, binaryOutput);
}

rgb888_to_bgr555("spritesheet.pal", "output.pal");