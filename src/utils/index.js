const util = {
  currentTime() {
    let date = new Date();
    let Y = date.getFullYear();
    let M = date.getMonth() + 1;
    let D = date.getDate();
    let h = date.getHours();
    let m = date.getMinutes();
    let s = date.getSeconds();
    M = M < 10 ?'0' + M : M;
    D = D < 10 ?'0' + D : D;
    h = h < 10 ?'0' + h : h;
    m = m < 10 ?'0' + m : m;
    s = s < 10 ?'0' + s : s;

    // console.log(Y, M, D, h, m, s);
    return {
      Y, M, D, h, m, s
    }
  }
}

export default util