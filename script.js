function isLeapYear(year) {
    return (year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0);
}

function getDaysInMonth(month, year) {
    return [31, (isLeapYear(year)?29:28), 31,30,31,30,31,31,30,31,30,31][month-1];
}

function getMonthName(month) {
    return ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"][month-1];
}

function calculateIntervals() {
    const startInput = document.getElementById('startDate').value;
    if(!startInput) return alert('Please select a date!');

    const startDate = new Date(startInput);
    let day = startDate.getDate();
    let month = startDate.getMonth() + 1;
    let year = startDate.getFullYear();

    const today = new Date();
    const outputDiv = document.getElementById('output');
    outputDiv.innerHTML = "<h2 class='text-2xl font-bold mb-4 text-gray-800 text-center'>3-Month Interval Dates:</h2>";

    let count = 1;
    let nextInterval = null;

    while(true) {
        month += 3;
        if(month > 12){
            year += Math.floor((month-1)/12);
            month = ((month-1)%12) + 1;
        }

        let maxDay = getDaysInMonth(month, year);
        let displayDay = day > maxDay ? maxDay : day;

        const intervalDate = new Date(year, month-1, displayDay);

        if(intervalDate > today && !nextInterval) {
            nextInterval = intervalDate;
        }

        if(intervalDate <= today) {
            const dateStr = `${String(displayDay).padStart(2,'0')} ${getMonthName(month)} ${year}`;
            outputDiv.innerHTML += `<p class="p-3 bg-gradient-to-r from-indigo-200 via-purple-200 to-pink-200 rounded-xl mb-2 shadow-md text-gray-800 font-medium hover:scale-105 transform transition duration-200">${count}. ${dateStr}</p>`;
            count++;
        } else {
            break;
        }
    }

    if(nextInterval) {
        const nextDateStr = `${String(nextInterval.getDate()).padStart(2,'0')} ${getMonthName(nextInterval.getMonth()+1)} ${nextInterval.getFullYear()}`;
        outputDiv.innerHTML += `<p class="p-3 bg-green-300 rounded-xl mb-2 shadow-md text-gray-900 font-semibold hover:scale-105 transform transition duration-200">Next Interval After Today: ${nextDateStr}</p>`;
    }
}

// Attach event listener
document.getElementById('calculateBtn').addEventListener('click', calculateIntervals);
