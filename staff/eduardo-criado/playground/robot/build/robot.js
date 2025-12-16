/*
REQUIREMENTS
- state: xy, orientation (N,E,S,W)
- behavior: forward,backward,right,left by steps
*/
export var robot = {
    x: 0,
    y: 0,
    orientation: "E",
    forward: function () {
        switch (this.orientation) {
            case "E":
                this.x = this.x + 10;
                break;
            case "S":
                this.y = this.y + 10;
                break;
            case "W":
                this.x = this.x - 10;
                break;
            case "N":
                this.y = this.y - 10;
                break;
        }
    },
    backward: function () {
        switch (this.orientation) {
            case "E":
                this.x = this.x - 10;
                break;
            case "S":
                this.y = this.y - 10;
                break;
            case "W":
                this.x = this.x + 10;
                break;
            case "N":
                this.y = this.y + 10;
                break;
        }
    },
    left: function () {
        switch (this.orientation) {
            case "E":
                this.orientation = "N";
                break;
            case "S":
                this.orientation = "E";
                break;
            case "W":
                this.orientation = "S";
                break;
            case "N":
                this.orientation = "W";
                break;
        }
    },
    right: function () {
        switch (this.orientation) {
            case "E":
                this.orientation = "S";
                break;
            case "S":
                this.orientation = "W";
                break;
            case "W":
                this.orientation = "N";
                break;
            case "N":
                this.orientation = "E";
                break;
        }
    },
};
