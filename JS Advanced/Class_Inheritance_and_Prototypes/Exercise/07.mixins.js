const classes = require('06.computer.js');

function createMixins() {
    function computerQualityMixin(classToExtend) {
        classToExtend.prototype.getQuality = function () {
            return (this.processorSpeed + this.ram + this.hardDiskSpace) / 3.
        };

        classToExtend.prototype.isFast = function () {
            return this.processorSpeed > (this.ram / 4)
        };

        classToExtend.prototype.isRoomy = function () {
            return this.hardDiskSpace > Math.floor(this.ram * this.processorSpeed);
        };
    }

    function styleMixin(classToExtend) {
        classToExtend.prototype.isFullSet = function () {
            return this.manufacturer === this.keyboard.manufacturer && this.manufacturer === this.monitor.manufacturer;
        };

        classToExtend.prototype.isClassy = function () {
            let batteryLife = this.battery.expectedLife >= 3;
            let color = this.color === "Silver" || this.color === "Black";
            let weight = this.weight < 3;

            return batteryLife && color && weight;
        };
    }

    return {
        computerQualityMixin,
        styleMixin
    }
}
