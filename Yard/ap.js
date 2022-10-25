

function call(timeout) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        console.log(`This call took ${timeout} seconds`);
        resolve('to='+timeout);
      }, timeout * 1000);
    });
  }



  async function run(){
    call(5).then((r) => {
      console.log(r);
    });
    await call(2); //This will print result first
    let rr = call(1);
    console.log(rr);
  }


  run()
  console.log("end");