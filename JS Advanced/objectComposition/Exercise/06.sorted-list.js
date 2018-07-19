function getSortedList() {
    return {
        arr: [],
        size: 0,
        add: function (element) {
            this.arr.push(element);
            this.size++;
            this.sort();
        },
        remove: function (index) {
            if (index >= 0 && index < this.size) {
                this.arr.splice(index, 1);
                this.size--;
            }
        },
        get: function (index) {
            if (index >= 0 && index < this.size) {
                return this.arr[index];
            }
        },
        sort: function () {
            this.arr.sort((a, b) => a - b);
        },
        toString: function () {
            return this.arr.join(", ");
        }
    }
}

let sortedList = getSortedList();

sortedList.add(1);
sortedList.add(12);
sortedList.add(5);
sortedList.remove(0);
sortedList.remove(0);
sortedList.remove(0);
sortedList.remove(0);
sortedList.remove(0);
console.log(sortedList.size);
console.log(sortedList.toString());