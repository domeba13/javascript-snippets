'use strict' // gibt eher eine Fehlermeldung, bzw achtet auf Kleinigkeiten

class Car {
    engineIsRunning = false
    maxSpeed = 0
    currentSpeed = 0
    image = ""
    brand = ""
    modelName = ""
    positionX = 0
    imgElement;
    renderInterval;

    renderIntervalStart() {
        var me = this
        this.renderInterval = setInterval(function () {
            me.positionX = me.positionX + Math.floor(me.currentSpeed / 20)
            me.render()
        }, 300)
    }

    renderIntervalStop() {
        clearInterval(this.renderInterval)
    }


    //           339, "Ferrari", "SF90"
    constructor(maxSpeed, brand, modelName, image) {
        this.maxSpeed = maxSpeed
        this.brand = brand
        this.modelName = modelName
        this.image = image
        this.renderFirst()
    }

    printSpeed() {
        console.log(this.brand + " " + this.modelName + " fährt " + this.currentSpeed + "km/h")

    }

    accelerate(kmh) {
        //Wenn Motor aus ist, dann starte den Motor

        if (!this.engineIsRunning) {
            this.engineStart()
        }

        const newSpeed = this.currentSpeed + kmh
        if (this.maxSpeed < newSpeed) {
            this.currentSpeed = this.maxSpeed
        } else {
            this.currentSpeed = newSpeed
        }
        this.printSpeed()
    }

    break(kmh) {
        const newSpeed = this.currentSpeed - kmh
        if (newSpeed <= 0) {
            this.currentSpeed = 0
            this.engineStop()
        } else {
            this.currentSpeed = newSpeed
        }
        this.printSpeed()
    }

    engineStart() {
        if (this.engineIsRunning) {
            return
        }
        this.renderIntervalStart()
        this.engineIsRunning = true
        console.log(this.brand + " " + this.modelName + " Motor gestartet ")
    }

    engineStop() {
//        if (this.engineIsRunning === false) {
//            return
//        }
        if (!this.engineIsRunning) {
            return
        }
        this.renderIntervalStop()
        this.engineIsRunning = false
        console.log(this.brand + " " + this.modelName + " Motor ausgeschaltet ")
    }

    render() {
        this.imgElement.setAttribute("style", "position:absolute; top:0px; right:" + this.positionX + "px")
    }

    renderFirst() {
        if (!this.imgElement) {
            this.imgElement = document.createElement("img")
            this.imgElement.src = this.image
            this.imgElement.width = 200
        }
        this.imgElement.setAttribute("style", "position:absolute; top:0px; right:" + this.positionX + "px")
        document.querySelector("body").append(this.imgElement)
    }
}

//const Ferrari = new Car(339, "Ferrari", "SF90")
//const Golf = new Car(200, "Volkswagen", "Golf 1.9TDI")
const Bentley = new Car(334, "Bentley", "Continental GT Speed", "bentley.jpg")
//const Bentley = new Car() // new = neues object , Car = Bauplan
//const Golf = new Car()
//Golf.maxSpeed = 200
//Golf.brand = "Volkswagen"
//Golf.modelName = "Golf 1.9TDI"

document.getElementById("btnAccelerate").addEventListener("click", function () {
    Bentley.accelerate(10)
})
document.getElementById("btnBreak").addEventListener("click", function () {
    Bentley.break(10)
})
