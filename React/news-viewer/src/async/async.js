function increase(number) {
  const promise = new Promise((resolve, reject) => {
    // resolve : 성공! , reject : 실패
    setTimeout(() => {
      const result = number + 10;
      if (result > 50) {
        // 50 보다 높으면 에러 발생시키기
        const error = new Error("Number to Big");
        return reject(error);
      }
      resolve(result); // number 값에 + 10 후 성공 처리
    }, 1000);
  });
  return promise;
}

async function runTasks() {
  try {
    let result = await increase(0);
    console.log(result);
    result = await increase(result);
    console.log(result);
    result = await increase(result);
    console.log(result);
    result = await increase(result);
    console.log(result);
    result = await increase(result);
    console.log(result);
    result = await increase(result);
  } catch (e) {
    console.log(e);
  }
}
