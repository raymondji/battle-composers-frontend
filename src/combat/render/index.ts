import kaboom from 'kaboom';

// Start kaboom with default options (will create a fullscreen canvas under <body>)
kaboom();

// Init with some options (check out #KaboomOpt for full options list)
kaboom({
  width: 320,
  height: 240,
  font: 'sinko',
  canvas: document.querySelector('#mycanvas'),
  background: [0, 0, 255],
});
