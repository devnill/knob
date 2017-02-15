
/*
 comName -- serial port
 productId '0x0483'
 vendorId  '0x16c0'
 */
const serialport = require('serialport');

let _devicePollInt = null;
let activeDevice   = null;

let deviceList = document.querySelector('#device-list>.devices');

function pollDevices(cb){
  serialport.list((err, ports = []) => {
    let devices = ports.filter((port)=>{
      return port.productId === '0x0483' && port.vendorId === '0x16c0';
    });
    cb(err, devices);
  });
}

function updateDeviceList(){
  pollDevices((err, devices)=>{
    if(err){
      fatalError(err);
    }
    else{
      //update screen
      let list=document.createDocumentFragment();
      if(devices.length===0){
        let li = document.createElement('li');
        li.innerHTML = 'no devices found';
        list.appendChild(li);
      }
      else{
        for(let device of devices){
          let li = document.createElement('li');
          let a = document.createElement('a');
          let span = document.createElement('span');
          li.className = 'device';
          a.innerHTML = 'select device';
          a.setAttribute('device-id', device.serialNumber);
          a.href='#';          
          span.innerHTML = device.pnpId;
          li.appendChild(span);
          li.appendChild(a);
          list.appendChild(li);
        }
      }
      deviceList.innerHTML = '';
      deviceList.appendChild(list);
    }
  });
}

function setActiveDevice(deviceId){
  activeDevice = null;
  // Connect to active device
  // Set messages to send to getMessage
}

function sendMessage(deviceId, message){
  console.info(`sending ${JSON.stringify(message)} to ${deviceId}`);
}

function getMessage(device, message){
  console.info(device, message);
}

function fatalError(err){
  console.error('u dun goofd', err);
}

function init(){
  deviceList.addEventListener('click', (e)=>{
    setActiveDevice(e.target.getAttribute('device-id'));
  });
  _devicePollInt = setInterval(updateDeviceList, 1000);  
  //set event listeners
}

init();

