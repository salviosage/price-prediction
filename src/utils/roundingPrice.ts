export const round = (price: number) => {
    if( price % 10 === 0){
        return price;
    }

    return price + (10 - (price % 10));

}