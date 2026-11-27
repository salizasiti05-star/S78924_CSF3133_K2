// Error 1 (grade.html, Line 9): Missing 'return' in onsubmit="checkMark()", changed to onsubmit="return checkMark()".
// Error 2 (grade.html, Line 17): Typo in function call showtable(), changed to showTable().
// Error 3 (grade.html, Line 19): Wrong script filename "grades.js", changed to "grade.js".
// Error 4 (grade.js, Line 5): Used assignment operator '=' instead of comparison '===', changed to (name === "").
// Error 5 (grade.js, Line 9): Typo in isNan(), changed to isNaN().
// Error 6 (grade.js, Line 14): Used logical AND '&&' instead of OR '||', changed to (mark < 0 || mark > 100).
// Error 7 (grade.js, Line 28 & 30): Typo in getElementByID, changed to getElementById.
// Error 8 (grade.js, Line 30): Typo in .style.colour, changed to .style.color.
// Error 9 (grade.js, Line 31): 'return true;' caused page reload and cleared result, changed to 'return false;'.
// Error 10 (grade.js, Line 38): Loop started at i = 1 skipping grade A, changed to i = 0.

function checkMark() {
    let name = document.forms["gradeForm"]["name"].value.trim();
    let mark = document.forms["gradeForm"]["mark"].value.trim();

    // Semak jika nama kosong (Betulkan Error 4)
    if (name === "") {
        alert("Name must be filled out.");
        return false;
    }

    // Langkah 5: Semak jika ruangan markah kosong
    if (mark === "") {
        alert("Mark field cannot be empty.");
        return false;
    }

    // Semak jika bukan nombor (Betulkan Error 5)
    if (isNaN(mark)) {
        alert("Please enter a valid numeric value.");
        return false;
    }

    mark = parseInt(mark);

    // Semak julat markah 0-100 (Betulkan Error 6)
    if (mark < 0 || mark > 100) {
        alert("Mark must be between 0 and 100.");
        return false;
    }

    let grade;
    let resultColor;

    // Langkah 6: Tentukan gred dan warna teks mengikut gred
    if (mark >= 80) {
        grade = "A";
        resultColor = "green";
    } else if (mark >= 65) {
        grade = "B";
        resultColor = "green";
    } else if (mark >= 50) {
        grade = "C";
        resultColor = "orange";
    } else {
        grade = "F";
        resultColor = "red";
    }

    // Paparkan keputusan dan warna (Betulkan Error 7 & 8)
    let resultElement = document.getElementById("result");
    resultElement.innerHTML = name + " got grade " + grade;
    resultElement.style.color = resultColor;
    resultElement.style.fontWeight = "bold";

    // Langkah 8: Paparkan tarikh dan masa semasa menggunakan Date()
    let dateElement = document.getElementById("dateTime");
    dateElement.innerHTML = "Checked on: " + Date();
    dateElement.style.color = resultColor;
    dateElement.style.fontWeight = "bold";

    // Betulkan Error 9: Kekalkan paparan di halaman tanpa refresh
    return false;
}

// Langkah 7: Fungsi untuk menjana markah rawak antara 0 hingga 100
function generateRandomMark() {
    let randomNum = Math.floor(Math.random() * 101);
    document.getElementById("mark").value = randomNum;
}

function showTable() {
    let grades = ["A", "B", "C", "F"];
    let ranges = ["80-100", "65-79", "50-64", "0-49"];
    
    // Tambah tajuk lajur jadual supaya kemas seperti contoh output
    let tableHTML = "<table><tr><th>Grade</th><th>Mark range</th></tr>";
    
    // Betulkan Error 10: Mulakan dari indeks 0 supaya gred A dipaparkan
    for (let i = 0; i < grades.length; i++) {
        tableHTML += "<tr><td>" + grades[i] + "</td><td>" + ranges[i] + "</td></tr>";
    }
    
    tableHTML += "</table>";
    document.getElementById("tableContainer").innerHTML = tableHTML;
}