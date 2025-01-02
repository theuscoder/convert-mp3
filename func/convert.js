function c320(name_file) {
const { spawn } = require('child_process');

var nome_saida = name_file.replace('128', '320');

const ffmpeg = spawn('ffmpeg', [
    '-i', 'public/' + name_file,
    '-ar', '44100',
    '-ac', 2,
    '-b:a', '320k',
    'public/' + nome_saida
]);

ffmpeg.stdout.on('data', (data) => {
    console.log(`stdout: ${data}`);
});

ffmpeg.stderr.on('data', (data) => {
    console.error(`stderr: ${data}`);
});

return nome_saida;

}

module.exports = c320;