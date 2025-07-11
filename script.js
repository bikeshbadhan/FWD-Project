// script.js

const subjectDB = {
  // Semester 1
  "BTPH-101-23": { name: "Engineering Physics", credits: 4 },
  "BTPH-102-23": { name: "Engineering Physics - Lab", credits: 1 },
  "BTAM-101-23": { name: "Engineering Mathematics", credits: 4 },
  "BTEE-101-18": { name: "Basic Electrical Engineering", credits: 4 },
  "BTEE-102-18": { name: "Basic Electrical Engineering - Lab", credits: 1 },
  "BTME-101-21": { name: "Engineering Graphics & Design", credits: 3 },

  // Semester 2
  "BTCH-101-23": { name: "Chemistry", credits: 4 },
  "BTCH-102-18": { name: "Chemistry - Lab", credits: 1 },
  "BTAM-201-23": { name: "Engineering Mathematics - II", credits: 4 },
  "BTPS-101-18": { name: "Programming for Problem Solving", credits: 3 },
  "BTPS-102-18": { name: "Programming for Problem Solving - Lab", credits: 2 },
  "BTME-101-18": { name: "Workshop & Manufacturing Practices", credits: 3 },
  "BTHU-101-18": { name: "English", credits: 2 },
  "BTHU-102-18": { name: "English - Lab", credits: 1 },

  // Semester 3
  "BTES-301-18": { name: "Digital Electronics", credits: 3 },
  "BTCS-301-18": { name: "Data Structure & Algorithms", credits: 3 },
  "BTCS-302-18": { name: "Object Oriented Programming", credits: 3 },
  "BTAM-302-23": { name: "Mathematics - III", credits: 3 },
  "HSMC101/102-18": { name: "Foundation Course in Humanities", credits: 3 },
  "BTES-302-18": { name: "Digital Electronics - Lab", credits: 1 },
  "BTCS-303-18": { name: "Data Structure & Algorithms - Lab", credits: 2 },
  "BTCS-304-18": { name: "Object Oriented Programming - Lab", credits: 2 },
  "BTCS-305-18": { name: "IT Workshop", credits: 1 }
};

const gradePoints = {
  "O": 10,
  "A+": 9,
  "A": 8,
  "B+": 7,
  "B": 6,
  "C": 5,
  "P": 4,
  "F": 0
};

function loadSubjects() {
  const semester = document.getElementById('semester').value;
  const semSubjects = {
    "Sem1": [
      "BTPH-101-23", "BTPH-102-23", "BTAM-101-23", "BTEE-101-18",
      "BTEE-102-18", "BTME-101-21"
    ],
    "Sem2": [
      "BTCH-101-23", "BTCH-102-18", "BTAM-201-23", "BTPS-101-18",
      "BTPS-102-18", "BTME-101-18", "BTHU-101-18", "BTHU-102-18"
    ],
    "Sem3": [
      "BTES-301-18", "BTCS-301-18", "BTCS-302-18", "BTAM-302-23",
      "HSMC101/102-18", "BTES-302-18", "BTCS-303-18", "BTCS-304-18",
      "BTCS-305-18"
    ]
  };

  const subjects = semSubjects[semester] || [];
  const gradeForm = document.getElementById('grade-form');
  gradeForm.innerHTML = '';

  subjects.forEach(code => {
    const data = subjectDB[code];
    if (data) {
      const div = document.createElement('div');
      div.innerHTML = `
        <label>${data.name} (${code}) - ${data.credits} credits</label>
        <input type="text" name="${code}" placeholder="Enter grade (O, A+, A, etc.)" />
      `;
      gradeForm.appendChild(div);
    }
  });

  document.getElementById('subject-entry').classList.remove('hidden');
}

function calculateSGPA() {
  let totalCredits = 0;
  let totalPoints = 0;
  let hasFail = false;

  const inputs = document.querySelectorAll('#grade-form input');
  for (const input of inputs) {
    const grade = input.value.trim().toUpperCase();
    const mcode = input.name;

    if (!gradePoints.hasOwnProperty(grade)) {
      alert(`Invalid grade "${grade}" for ${mcode}`);
      return;
    }

    if (grade === "F") hasFail = true;

    const subject = subjectDB[mcode];
    if (subject) {
      totalCredits += subject.credits;
      totalPoints += subject.credits * gradePoints[grade];
    }
  }

  const resultBox = document.getElementById('sgpa-display');
  document.getElementById('result').classList.remove('hidden');

  if (hasFail) {
    resultBox.textContent = "No SGPA Because of Reappear";
    resultBox.style.color = "#e74c3c";
  } else {
    const sgpa = totalCredits === 0 ? 0 : (totalPoints / totalCredits).toFixed(2);
    resultBox.textContent = `Your SGPA is: ${sgpa}`;
    resultBox.style.color = "#27ae60";
  }
}
