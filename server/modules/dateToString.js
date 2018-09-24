const dateToString = (date) => {
    try{
        return date.toISOString().substring(0,10)
    }catch(err){
        return null;
        
    }
}

module.exports = { dateToString };