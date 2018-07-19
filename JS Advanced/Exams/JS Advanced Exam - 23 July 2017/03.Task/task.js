class Task {
    constructor(title, deadline) {
        this.title = title;
        this._deadline = deadline;
        this.status = "Open";
        this._isOverdue = this.isOverdue;
    }

    get rank() {
        if (this.isOverdue) {
            return 0;
        } else if (this.status === "In Progress") {
            return 1;
        } else if (this.status === "Open") {
            return 2;
        } else if (this.status === "Complete") {
            return 3;
        }
    }

    get icon() {
        if (this.status === "Overdue") {
            return "\u26A0";
        } else if (this.status === "Complete") {
            return "\u2714";
        } else if (this.status === "In Progress") {
            return "\u219D";
        } else if (this.status === "Open") {
            return "\u2731";
        }
    }

    get deadline() {
        return this._deadline;
    }

    set deadline(value) {
        if (value < Date.now()) {
            throw Error('Can not create deadline in the past');
        }

        this._deadline = value;
    }

    get isOverdue() {
        if (this.deadline < Date.now()  && this.status !== "Complete") {
            this.status = "Overdue";
            return true;
        }

        return false;
    }

    toString() {
        if (this.status === "Complete") {
            return `[${this.icon}] ${this.title}`
        } else if (this.isOverdue){
            return `[${this.icon}] ${this.title} (overdue)`
        } else {
            return `[${this.icon}] ${this.title} (${this.deadline})`
        }
    }


    static comparator(a, b) {
        if (a.rank === b.rank) {
            return a.deadline - b.deadline;
        }

        return a.rank - b.rank;
    }
}

let date1 = new Date();
date1.setDate(date1.getDate() + 7); // Set date 7 days from now
let task1 = new Task('JS Homework', date1);
let date2 = new Date();
date2.setFullYear(date2.getFullYear() + 1); // Set date 1 year from now
let task2 = new Task('Start career', date2);
console.log(task1 + '\n' + task2);
let date3 = new Date();
date3.setDate(date3.getDate() + 3); // Set date 3 days from now
let task3 = new Task('football', date3);
// Create two tasks with deadline set to current time
let task4 = new Task('Task 4', new Date());
let task5 = new Task('Task 5', new Date());
task1.status = 'In Progress';
task3.status = 'In Progress';
task5.status = "Complete";
let tasks = [task1, task2, task3, task4, task5];
setTimeout(() => {
    tasks.sort(Task.comparator);
    console.log(tasks.join('\n'));
}, 1000); // Sort and print one second later

// should throw an Error
//let overdueTask = new Task('Overdue Task', new Date(2005, '4', '20'));
// should throw an Error
//task1.deadline = new Date(2005, '4', '20');

/* Output
[✱] JS Homework (deadline: Wed Jul 26 2017 11:52:23 GMT+0300 (FLE Daylight Time))
[✱] Start career (deadline: Thu Jul 19 2018 11:52:23 GMT+0300 (FLE Daylight Time))

[⚠] Task 4 (overdue)
[↝] football (deadline: Sat Jul 22 2017 11:52:23 GMT+0300 (FLE Daylight Time))
[↝] JS Homework (deadline: Wed Jul 26 2017 11:52:23 GMT+0300 (FLE Daylight Time))
[✱] Start career (deadline: Thu Jul 19 2018 11:52:23 GMT+0300 (FLE Daylight Time))
[✔] Task 5*/
