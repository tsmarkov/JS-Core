class SortedList {
    constructor() {
        this.arr = [];
        this.size = 0;
    }

    add(element) {
        this.arr.push(element);
        this.size++;
        this.sort();
    }

    remove(index) {
        if (index >= 0 && index < this.size) {
            this.arr.splice(index, 1);
            this.size--;
        }
    }

    get(index) {
        if (index >= 0 && index < this.size) {
            return this.arr[index];
        }
    }

    sort() {
        this.arr.sort((a, b) => a - b);
    }

    toString() {
        return this.arr.join(", ");
    }
}