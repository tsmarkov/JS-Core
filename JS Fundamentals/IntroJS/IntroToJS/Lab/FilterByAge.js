function filterByAge(minAge, firstName, firstAge, secondName, secondAge) {
    let person1 = {name:firstName, age:firstAge};
    let person2 = {name:secondName, age:secondAge};

    if (person1.age >= minAge) {
        console.log(person1);
    }
    
    if (person2.age >= minAge) {
        console.log(person2);
    }
}

filterByAge(12, 'Ivan', 15, 'Asen', 9);