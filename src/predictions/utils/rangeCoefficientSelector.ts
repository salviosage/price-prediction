export const coefficientSelector = (distance:Number):{min:Number, max:Number} => {
    let coefficient = {
        min:0,
        max:0
    }
    if(distance >= 0 && distance < 10){
         coefficient ={
            min: 17,
            max: 18
        }
    }
    else if(distance >= 10 && distance < 20){
        coefficient ={
            min: 8,
            max: 10.2
        }
    }
    else if(distance >= 20 && distance < 40){
        coefficient ={
            min: 7,
            max: 10
        }
    }
    else if(distance >= 40 && distance < 90){
        coefficient ={
            min: 5,
            max: 6
        }
    }
    else {
        coefficient ={
            min: 4,
            max: 5
        }
    }

    return coefficient;
}