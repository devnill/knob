// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.

/*
 comName -- serial port
 productId '0x0483'
 vendorId  '0x16c0'
*/
const serialport = require('serialport');

serialport.list((err, ports) => {
  console.log('ports', ports.filter((port)=>{
    return port.productId === '0x0483' && port.vendorId === '0x16c0';
  }));
  
  if (err) {
    document.getElementById('error').textContent = err.message;
    return;
  } else {
    document.getElementById('error').textContent = '';
  }

  if (ports.length === 0) {
    document.getElementById('error').textContent = 'No ports discovered';
  }

});
