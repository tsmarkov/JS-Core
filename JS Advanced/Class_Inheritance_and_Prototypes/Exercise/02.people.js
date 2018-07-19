function classes() {
    class Employee {
        constructor(name, age) {
            if (new.target === Employee) {
                throw Error("Cannot instantiate directly");
            }

            this.name = name;
            this.age = age;
            this.salary = 0;
            this._tasks = [];
        }


        get tasks() {
            return this._tasks;
        }

        set tasks(value) {
            this._tasks = value;
        }

        getSalary() {
            return this.salary;
        }

        work() {
            let currentTask = this._tasks.shift();
            console.log(currentTask);
            this._tasks.push(currentTask);
        }

        collectSalary() {
            console.log(`${this.name} received ${this.getSalary()} this month.`);
        }
    }

    class Junior extends Employee {
        constructor(name, age) {
            super(name, age);
            this.tasks.push(`${name} is working on a simple task.`)
        }
    }

    class Senior extends Employee {
        constructor(name, age) {
            super(name, age);
            this.tasks = [`${name} is working on a complicated task.`,
                `${name} is taking time off work.`,
                `${name} is supervising junior workers.`];
        }
    }

    class Manager extends Employee {
        constructor(name, age) {
            super(name, age);
            this.dividend = 0;
            this.tasks = [`${name} scheduled a meeting.`,
                `${name} is preparing a quarterly report.`];
        }

        getSalary() {
            return this.salary + this.dividend;
        }
    }

    return {
        Employee,
        Junior,
        Senior,
        Manager
    }
}