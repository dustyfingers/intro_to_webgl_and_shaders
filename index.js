console.log('this script runs!');

// create and configure canvas
var canvas = document.createElement('canvas');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
document.body.appendChild(canvas);

// grab webgl context from canvas we attached to dom
var gl = canvas.getContext('webgl');

gl.clearColor(1, 0, 1, 1);
gl.clear(gl.COLOR_BUFFER_BIT);

// create and comile vertex and frag shaders
var vertexShader = gl.createShader(gl.VERTEX_SHADER);
gl.shaderSource(vertexShader, [
    'attribute vec2 position;',
    'void main() {',
    'gl_Position = vec4(position, 0.0, 1.0);',
    '}'
].join('\n'));
gl.compileShader(vertexShader);

var fragShader = gl.createShader(gl.FRAGMENT_SHADER);
gl.shaderSource(fragShader, [
    'precision highp float;',
    'uniform vec4 color;',
    'void main() {',
    'gl_FragColor = color;',
    '}'
].join('\n'));
gl.compileShader(fragShader);

// create program and link shaders to it
var program = gl.createProgram();
gl.attachShader(program, vertexShader);
gl.attachShader(program, fragShader);

// link program to webgl context
gl.linkProgram(program);

// draw a triangle
var vertices = new Float32Array([
    -0.5, -0.5,
    0.5, -0.5,
    0.0, 0.5
]);
var buffer = gl.createBuffer();
gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);

// this tells webgl we are using the shader program above to do our drawing
gl.useProgram(program);

// define color uniform
program.color = gl.getUniformLocation(program, 'color');
gl.uniform4fv(program.color, [0, 1, 0, 1]);

// define position attribute
program.position = gl.getAttribLocation(program, 'position');
gl.enableVertexAttribArray(program.position);
// vertices are 2-dimensional, so we use 2 as the hardcoded value here
gl.vertexAttribPointer(program.position, 2, gl.FLOAT, false, 0, 0);

gl.drawArrays(gl.TRIANGLES, 0, vertices.length / 2)