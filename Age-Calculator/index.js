function calculate(evt) {
    let date, today, day, month, year, nowday, nowmonth, nowyear, calculateDay, calculateMonth, CalculateYear;
    evt.preventDefault()
    const input = evt.target[0].value;
    date = new Date(input);
    today = new Date();

    day = date.getUTCDate();
    month = date.getUTCMonth() + 1;
    year = date.getUTCFullYear();

    nowday = today.getUTCDate();
    nowmonth = today.getUTCMonth() + 1;
    nowyear = today.getUTCFullYear();

    CalculateYear = nowyear - year;
    calculateMonth = nowmonth - month;
    calculateDay = nowday - day;

    const result = document.getElementById('result');
    const error = document.getElementById('error');
    if (year > nowyear | input == "") {
        result.style.color = "#ff0000";
        error.style.display = "flex";
        error.innerText = "Error, the date cannot be greater than the current date, and cannot be empty."
        result.innerText = "0 years 0 months";
    } else {
        result.innerText = `${CalculateYear} years ${calculateMonth} months`
    }    
}
