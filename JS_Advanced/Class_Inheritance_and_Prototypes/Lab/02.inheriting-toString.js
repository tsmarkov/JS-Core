function getPersonAndTeacherClasses() {
    class Person {
        constructor(name, email) {
            this.name = name;
            this.email = email;
        }

        toString() {
            return `${this.constructor.name} (name: ${this.name}, email: ${this.email})`
        }
    }

    class Teacher extends Person {
        constructor(name, email, subject) {
            super(name, email);
            this.subject = subject;
        }

        toString() {
            let superText = super.toString();
            superText = superText.slice(0, superText.length - 1);
            return superText + `, subject: ${this.subject})`;
        }
    }

    class Student extends Person {
        constructor(name, email, course) {
            super(name, email);
            this.course = course;
        }

        toString() {
            let superText = super.toString();
            superText = superText.slice(0, superText.length - 1);
            return superText + `, course: ${this.course})`
        }
    }

    return {
        Person,
        Teacher,
        Student
    }
}

let obj = getPersonAndTeacherClasses();
let person = new obj.Person('Pesho', 'pesho@abv.bg');
let teacher = new obj.Teacher('Gosho', 'gosho@abv.bg', 'js');
let student = new obj.Student('Pesho', 'pesho@abv.bg', 'jsCore');

console.log(person.toString());
console.log(teacher.toString());
console.log(student.toString());
