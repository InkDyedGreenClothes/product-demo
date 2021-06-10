const util = {
  currentTime() {
    let date = new Date();
    let Y = date.getFullYear();
    let M = date.getMonth()  + 1;
    let D = date.getDate();
    let h = date.getHours();
    let m = date.getMinutes();
    let s = date.getSeconds();
    console.log(Y ,M,D,h,m,s);
  }
}

export default util