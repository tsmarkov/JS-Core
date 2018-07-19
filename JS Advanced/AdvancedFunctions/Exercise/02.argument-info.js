function result() {
  let containerMap = new Map();

  for (const value of arguments) {
    console.log(`${typeof (value)}: ${value}`);

    if (!containerMap.has(typeof (value))) {
      containerMap.set(typeof (value), 0);
    }

    let currentCount = Number(containerMap.get(typeof (value)));
    containerMap.set(typeof (value), ++currentCount);
  }

  containerMap = new Map([...containerMap]
    .sort((a, b) => {
      return b[1] - a[1];
    }));

  for (const element of [...containerMap]) {
    console.log(`${element[0]} = ${element[1]}`);
  }
}

result('cat', 42, function () { console.log('Hello world!') });
