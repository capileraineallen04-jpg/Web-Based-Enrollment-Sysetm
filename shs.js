const birthdateInput = document.querySelector('[name="birthdate"]');

birthdateInput.addEventListener("input", function () {
  let value = this.value.replace(/\D/g, "");

  if (value.length > 8) {
    value = value.substring(0, 8);
  }

  if (value.length >= 5) {
    value =
      value.substring(0, 2) +
      "/" +
      value.substring(2, 4) +
      "/" +
      value.substring(4);
  } else if (value.length >= 3) {
    value = value.substring(0, 2) + "/" + value.substring(2);
  }

  this.value = value;
});

function updateBirthdateAndAge() {
  const birthInput = document.querySelector('[name="birthdate"]');

  const ageInput = document.querySelector('[name="age"]');

  if (!birthInput.value) {
    ageInput.value = "";
    return;
  }

  const birthDate = new Date(birthInput.value);

  const today = new Date();

  let age = today.getFullYear() - birthDate.getFullYear();

  const monthDifference = today.getMonth() - birthDate.getMonth();

  if (
    monthDifference < 0 ||
    (monthDifference === 0 && today.getDate() < birthDate.getDate())
  ) {
    age--;
  }

  ageInput.value = age;
}

// =====================================================
// COPY PERMANENT ADDRESS
// =====================================================

function copyPermanentAddress() {
  const sameAddress = document.querySelector('[name="sameaddress"]');

  sameAddress.addEventListener("change", function () {
    if (this.value === "YES") {
      document.querySelector('[name="permanenthouseNO"]').value =
        document.querySelector('[name="currenthouseNO"]').value;

      document.querySelector('[name="permanentstreet"]').value =
        document.querySelector('[name="currentstreet"]').value;

      document.querySelector('[name="permanentbarangay"]').value =
        document.querySelector('[name="currentbarangay"]').value;

      document.querySelector('[name="permanentcity"]').value =
        document.querySelector('[name="currentmunicipalitycity"]').value;

      document.querySelector('[name="permanentprovince"]').value =
        document.querySelector('[name="currentprovince"]').value;

      document.querySelector('[name="permanentzipCode"]').value =
        document.querySelector('[name="currentzipCode"]').value;
    } else {
      document.querySelector('[name="permanenthouseNO"]').value = "";

      document.querySelector('[name="permanentstreet"]').value = "";

      document.querySelector('[name="permanentbarangay"]').value = "";

      document.querySelector('[name="permanentcity"]').value = "";

      document.querySelector('[name="permanentprovince"]').value = "";

      document.querySelector('[name="permanentzipCode"]').value = "";
    }
  });
}

// =====================================================
// JHS / SHS
// =====================================================

const gradeLevel = document.getElementById("gradeLevel");

const shsSection = document.getElementById("shsSection");

const track = document.getElementById("track");

const strand = document.getElementById("strand");

// =====================================================
// SHS TRACK AND STRAND
// =====================================================

// =====================================================
// SHS TRACK AND CLUSTER OPTIONS
// =====================================================


const shsOptions = {
  "GRADE 11": {
    ACADEMIC: [
      "HUMANITIES AND SCOIAL SCIENCE",
      "SCIENCE TECHNOLOGY ENGINEERING and MATHEMATICS",
      "ACCOUNTANT BUISINESS MANAGEMENT"
    ],

    "TECH-PRO": [
      "INFORMATION AND COMMUNICATION TECHNOLOGY",
      "INDUSTRIAL TECHNOLOGY",
      "HOME ECONOMICS"
    ]
  },

  "GRADE 12": {
    ACADEMIC: [
      "HUMANITIES AND SOCIAL SCIENCE",
      "SCIENCE TECHNOLOGY ENGINEERING AND MATHEMATICS",
      "ACCOUNTANT BUISNESS MANAGEMENT",
      "GENERAL ACADEMIC STRAND"
    ],

    "TECHNOLOGICAL-VOCATIONAL LIVEHOOD": [
      "COMPUTER PROGRAMMING",
      "CONSUMER ELECTRONICS",
      "HOME ECONOMICS"
    ]
  }
};

// =====================================================
// CHECK IF SHS
// =====================================================

function isSHS() {
  return (
    gradeLevel.value === "GRADE 11" ||
    gradeLevel.value === "GRADE 12"
  );
}

// =====================================================
// UPDATE SHS SECTION
// Does not show or hide the section
// =====================================================

function updateSHSSection() {
  const strandLabel = document.getElementById("strandLabel");

  // Update the label only for SHS grade levels
  if (gradeLevel.value === "GRADE 11") {
    strandLabel.textContent = "Cluster";
  } else if (gradeLevel.value === "GRADE 12") {
    strandLabel.textContent = "Strand";
  }

  // Update Track and Strand/Cluster options
  updateTracks();
}

// =====================================================
// UPDATE TRACKS
// =====================================================

function updateTracks() {
  track.innerHTML = '<option value="">Select Track</option>';
  strand.innerHTML = '<option value="">Select Strand</option>';

  if (!isSHS()) {
    return;
  }

  const selectedGrade = gradeLevel.value;
  const gradeOptions = shsOptions[selectedGrade];

  if (!gradeOptions) {
    return;
  }

  Object.keys(gradeOptions).forEach((trackName) => {
    const option = document.createElement("option");

    option.value = trackName;
    option.textContent = trackName;

    track.appendChild(option);
  });
}

// =====================================================
// UPDATE STRANDS / CLUSTERS
// =====================================================

function updateStrands() {
  strand.innerHTML = '<option value="">Select Strand</option>';

  const selectedGrade = gradeLevel.value;
  const selectedTrack = track.value;

  if (
    !selectedGrade ||
    !selectedTrack ||
    !shsOptions[selectedGrade] ||
    !shsOptions[selectedGrade][selectedTrack]
  ) {
    return;
  }

  shsOptions[selectedGrade][selectedTrack].forEach(
    (clusterOrStrand) => {
      const option = document.createElement("option");

      option.value = clusterOrStrand;
      option.textContent = clusterOrStrand;

      strand.appendChild(option);
    }
  );
}

// =====================================================
// EVENT LISTENERS
// =====================================================

document.addEventListener("DOMContentLoaded", function () {
  if (gradeLevel) {
    gradeLevel.addEventListener("change", updateSHSSection);
  }

  if (track) {
    track.addEventListener("change", updateStrands);
  }

  // Initialize options
  updateSHSSection();
});


// =====================================================
// OPTIONAL FIELD CONTROL
// =====================================================

function controlOptionalFields() {
  const withLRN = document.querySelector('[name="with-lrn"]');

  const lrn = document.querySelector('[name="lrn"]');

  const balikAral = document.querySelector('[name="balik-aral"]');

  const lastGrade = document.querySelector('[name="Lastgradelevel"]');

  const lastSchool = document.querySelector('[name="Lastschool"]');

  const lastSchoolYear = document.querySelector('[name="Lastschoolyear"]');

  const schoolID = document.querySelector('[name="schoolid"]');

  const ip = document.querySelector('[name="ip"]');

  const culture = document.querySelector('[name="culture"]');

  const disability = document.querySelector('[name="disability"]');

  const disabilityType = document.querySelector('[name="disType"]');

  const fourPs = document.querySelector('[name="4Ps"]');

  const houseID = document.querySelector('[name="HouseID"]');

  // LRN

  lrn.disabled = withLRN.value === "NO";

  if (withLRN.value === "NO") {
    lrn.value = "";
  }

  // BALIK-ARAL

  const disableReturning = balikAral.value === "NO";

  [lastGrade, lastSchool, lastSchoolYear, schoolID].forEach((field) => {
    field.disabled = disableReturning;

    if (disableReturning) {
      field.value = "";
    }
  });

  // INDIGENOUS PEOPLE

  culture.disabled = ip.value === "NO";

  if (ip.value === "NO") {
    culture.value = "";
  }

  // DISABILITY

  disabilityType.disabled = disability.value === "NO";

  if (disability.value === "NO") {
    disabilityType.value = "";
  }

  // 4Ps

  houseID.disabled = fourPs.value === "NO";

  if (fourPs.value === "NO") {
    houseID.value = "";
  }
}

// =====================================================
// DATABASE NAME
// =====================================================

function getDatabaseName() {
  const selectedGrade = gradeLevel.value;

  const formattedGrade = selectedGrade.replace(/\s+/g, "-");

  // JHS

  if (
    selectedGrade === "GRADE 7" ||
    selectedGrade === "GRADE 8" ||
    selectedGrade === "GRADE 9" ||
    selectedGrade === "GRADE 10"
  ) {
    return `JHS-Students-${formattedGrade}`;
  }

  // SHS

  if (selectedGrade === "GRADE 11" || selectedGrade === "GRADE 12") {
    return `SHS-Students-${formattedGrade}`;
  }

  return null;
}

// =====================================================
// FIREBASE URL
// =====================================================

const FIREBASE_URL =
  "https://enrollease---enrollment-form-default-rtdb.asia-southeast1.firebasedatabase.app";

// =====================================================
// ENROLL
// =====================================================

async function goToSuccess() {
  try {
    // -------------------------------------------------
    // GET FIELDS
    // -------------------------------------------------

    const fields = {
      schoolYear: document.querySelector('[name="schoolYear"]'),

      gradeLevel: document.querySelector('[name="gradeLevel"]'),

      semester: document.querySelector('[name="semester"]'),

      track: document.querySelector('[name="track"]'),

      strand: document.querySelector('[name="strand"]'),

      withLRN: document.querySelector('[name="with-lrn"]'),

      balikAral: document.querySelector('[name="balik-aral"]'),

      psa: document.querySelector('[name="psa"]'),

      lrn: document.querySelector('[name="lrn"]'),

      lastName: document.querySelector('[name="lastName"]'),

      firstName: document.querySelector('[name="firstName"]'),

      middleName: document.querySelector('[name="middleName"]'),

      extension: document.querySelector('[name="extension"]'),

      birthdate: document.querySelector('[name="birthdate"]'),

      sex: document.querySelector('[name="sex"]'),

      age: document.querySelector('[name="age"]'),

      placeOfBirth: document.querySelector('[name="placeOfBirth"]'),

      religion: document.querySelector('[name="religion"]'),

      motherTongue: document.querySelector('[name="motherTongue"]'),

      currentHouse: document.querySelector('[name="currenthouseNO"]'),

      currentStreet: document.querySelector('[name="currentstreet"]'),

      currentBarangay: document.querySelector('[name="currentbarangay"]'),

      currentCity: document.querySelector('[name="currentmunicipalitycity"]'),

      currentProvince: document.querySelector('[name="currentprovince"]'),

      currentZip: document.querySelector('[name="currentzipCode"]'),

      sameAddress: document.querySelector('[name="sameaddress"]'),

      permanentHouse: document.querySelector('[name="permanenthouseNO"]'),

      permanentStreet: document.querySelector('[name="permanentstreet"]'),

      permanentBarangay: document.querySelector('[name="permanentbarangay"]'),

      permanentCity: document.querySelector('[name="permanentcity"]'),

      permanentProvince: document.querySelector('[name="permanentprovince"]'),

      permanentZip: document.querySelector('[name="permanentzipCode"]'),

      fatherName: document.querySelector('[name="fatherName"]'),

      fatherContact: document.querySelector('[name="fatherContact"]'),

      motherName: document.querySelector('[name="motherName"]'),

      motherContact: document.querySelector('[name="motherContact"]'),

      guardianName: document.querySelector('[name="guardianName"]'),

      guardianContact: document.querySelector('[name="guardianContact"]'),

      ip: document.querySelector('[name="ip"]'),

      culture: document.querySelector('[name="culture"]'),

      disability: document.querySelector('[name="disability"]'),

      disabilityType: document.querySelector('[name="disType"]'),

      fourPs: document.querySelector('[name="4Ps"]'),

      houseID: document.querySelector('[name="HouseID"]'),

      learningModalities: document.querySelector('[name="LearningModalities"]'),

      lastGrade: document.querySelector('[name="Lastgradelevel"]'),

      lastSchool: document.querySelector('[name="Lastschool"]'),

      lastSchoolYear: document.querySelector('[name="Lastschoolyear"]'),

      schoolID: document.querySelector('[name="schoolid"]'),
    };

    // -------------------------------------------------
    // UPPERCASE TEXT
    // -------------------------------------------------

    Object.values(fields).forEach((field) => {
      if (
        field &&
        field.tagName === "INPUT" &&
        field.type !== "date" &&
        field.type !== "number"
      ) {
        field.value = field.value.toUpperCase();
      }
    });

    // -------------------------------------------------
    // COPY ADDRESS
    // -------------------------------------------------

    if (fields.sameAddress.value === "YES") {
      fields.permanentHouse.value = fields.currentHouse.value;

      fields.permanentStreet.value = fields.currentStreet.value;

      fields.permanentBarangay.value = fields.currentBarangay.value;

      fields.permanentCity.value = fields.currentCity.value;

      fields.permanentProvince.value = fields.currentProvince.value;

      fields.permanentZip.value = fields.currentZip.value;
    }

    // -------------------------------------------------
    // REQUIRED FIELDS
    // -------------------------------------------------

    const requiredFields = [
      [fields.schoolYear, "School Year"],

      [fields.gradeLevel, "Grade Level"],

      [fields.withLRN, "With LRN"],

      [fields.balikAral, "Balik-Aral"],

      [fields.psa, "PSA NO."],

      [fields.lastName, "Last Name"],

      [fields.firstName, "First Name"],

      [fields.birthdate, "Birthdate"],

      [fields.sex, "Sex"],

      [fields.placeOfBirth, "Place of Birth"],

      [fields.religion, "Religion"],

      [fields.motherTongue, "Mother Tongue"],

      [fields.currentHouse, "Current House NO."],

      [fields.currentStreet, "Current Street"],

      [fields.currentBarangay, "Current Barangay"],

      [fields.currentCity, "Current City"],

      [fields.currentProvince, "Current Province"],

      [fields.currentZip, "Current Zip Code"],

      [fields.sameAddress, "Same Address"],

      [fields.fatherName, "Father's Name"],

      [fields.fatherContact, "Father's Contact"],

      [fields.motherName, "Mother's Name"],

      [fields.motherContact, "Mother's Contact"],

      [fields.guardianName, "Guardian Name"],

      [fields.guardianContact, "Guardian Contact"],

      [fields.ip, "Indigenous People"],

      [fields.disability, "Disability"],

      [fields.fourPs, "4P's Community"],

      [fields.learningModalities, "Learning Modalities"],
    ];

    // -------------------------------------------------
    // LRN REQUIRED ONLY IF YES
    // -------------------------------------------------

    if (fields.withLRN.value === "YES") {
      requiredFields.push([fields.lrn, "LRN"]);
    }

    // -------------------------------------------------
    // SHS REQUIRED FIELDS
    // -------------------------------------------------

    if (isSHS()) {
      requiredFields.push(
        [fields.semester, "Semester"],

        [fields.track, "Track"],

        [fields.strand, "Strand"],
      );
    }

    // -------------------------------------------------
    // BALIK ARAL
    // -------------------------------------------------

    if (fields.balikAral.value === "YES") {
      requiredFields.push(
        [fields.lastGrade, "Last Grade Level"],

        [fields.lastSchool, "Last School Attended"],

        [fields.lastSchoolYear, "Last School Year"],

        [fields.schoolID, "School ID"],
      );
    }

    // -------------------------------------------------
    // PERMANENT ADDRESS
    // -------------------------------------------------

    if (fields.sameAddress.value === "NO") {
      requiredFields.push(
        [fields.permanentHouse, "Permanent House NO."],

        [fields.permanentStreet, "Permanent Street"],

        [fields.permanentBarangay, "Permanent Barangay"],

        [fields.permanentCity, "Permanent City"],

        [fields.permanentProvince, "Permanent Province"],

        [fields.permanentZip, "Permanent Zip Code"],
      );
    }

    // -------------------------------------------------
    // INDIGENOUS PEOPLE
    // -------------------------------------------------

    if (fields.ip.value === "YES") {
      requiredFields.push([fields.culture, "Culture"]);
    }

    // -------------------------------------------------
    // DISABILITY
    // -------------------------------------------------

    if (fields.disability.value === "YES") {
      requiredFields.push([fields.disabilityType, "Disability Type"]);
    }

    // -------------------------------------------------
    // 4Ps
    // -------------------------------------------------

    if (fields.fourPs.value === "YES") {
      requiredFields.push([fields.houseID, "4P's Household ID"]);
    }

    // -------------------------------------------------
    // VALIDATE
    // -------------------------------------------------

    document.querySelectorAll(".input-error").forEach((field) => {
      field.classList.remove("input-error");
    });

    for (const [field, fieldName] of requiredFields) {
      if (!field.value.trim()) {
        field.classList.add("input-error");

        alert(`Please fill out: ${fieldName}`);

        field.focus();

        return;
      }
    }

    // -------------------------------------------------
    // VALIDATE LRN LENGTH
    // -------------------------------------------------

    if (fields.withLRN.value === "YES" && fields.lrn.value.length !== 12) {
      fields.lrn.classList.add("input-error");

      alert("LRN must contain exactly 12 digits.");

      fields.lrn.focus();

      return;
    }

    // -------------------------------------------------
    // GET DATABASE
    // -------------------------------------------------

    const dataset = getDatabaseName();

    if (!dataset) {
      alert("Invalid Grade Level.");

      return;
    }

    // -------------------------------------------------
    // GET EXISTING STUDENTS
    // -------------------------------------------------

    const response = await fetch(`${FIREBASE_URL}/${dataset}.json`);

    if (!response.ok) {
      throw new Error("Unable to connect to Firebase.");
    }

    const allStudents = await response.json();

    // -------------------------------------------------
    // LRN DUPLICATE DETECTION ONLY
    // -------------------------------------------------

    if (fields.withLRN.value === "YES" && allStudents) {
      const enteredLRN = fields.lrn.value.trim();

      const duplicateLRN = Object.values(allStudents).some((student) => {
        const personal = student["1-School-Information"];

        if (!personal) {
          return false;
        }

        const existingLRN = personal["8-LRN"];

        return existingLRN && existingLRN.toString().trim() === enteredLRN;
      });

      if (duplicateLRN) {
        alert("THIS STUDENT IS ALREADY ENROLLED.");

        fields.lrn.focus();

        return;
      }
    }

    // -------------------------------------------------
    // GENERATE STUDENT ID
    // -------------------------------------------------

    let studentID;

    do {
      studentID =
        "STU-" +
        Math.floor(Math.random() * 1000000)
          .toString()
          .padStart(6, "0");
    } while (allStudents && allStudents[studentID]);

    // -------------------------------------------------
    // TIMESTAMP
    // -------------------------------------------------

    const today = new Date();

    const formattedDate =
      String(today.getMonth() + 1).padStart(2, "0") +
      "/" +
      String(today.getDate()).padStart(2, "0") +
      "/" +
      today.getFullYear();

    // -------------------------------------------------
    // STUDENT DATA
    // -------------------------------------------------

    const learnersInformation = {
      "1-SCHOOL-YEAR": fields.schoolYear.value,
      "2-GRADE-LEVEL": fields.gradeLevel.value,
      "3-WITH-LRN": fields.withLRN.value,
      "4-BALIK-ARAL": fields.balikAral.value,
      "5-LRN": fields.lrn.value,
    };

    // =====================================================
    // ONLY ADD SHS INFORMATION FOR GRADE 11 / 12
    // =====================================================

    if (isSHS()) {
      learnersInformation["6-SEMESTER"] = fields.semester.value;
      learnersInformation["7-TRACK"] = fields.track.value;
      learnersInformation["8-STRAND"] = fields.strand.value;
    }

    // =====================================================
    // STUDENT DATA
    // =====================================================

    const studentData = {
      "1-LEARNERS-INFORMATION": learnersInformation,

      "2-PERSONAL-INFORMATION": {
        "1-PSA": fields.psa.value,

        "2-LAST-NAME": fields.lastName.value,

        "3-FIRST-NAME": fields.firstName.value,

        "4-MIDDLE-NAME": fields.middleName.value,

        "5-EXTENSION": fields.extension.value,

        "6-BIRTHDATE": fields.birthdate.value,

        "7-SEX": fields.sex.value,

        "8-AGE": fields.age.value,

        "9-PLACE-OF-BIRTH": fields.placeOfBirth.value,

        "10-RELIGION": fields.religion.value,

        "11-MOTHER-TONGUE": fields.motherTongue.value,
      },

      "3-CURRENT-ADDRESS": {
        "1-HOUSE-NO": fields.currentHouse.value,

        "2-STREET": fields.currentStreet.value,

        "3-BARANGAY": fields.currentBarangay.value,

        "4-CITY": fields.currentCity.value,

        "5-PROVINCE": fields.currentProvince.value,

        "6-ZIP-CODE": fields.currentZip.value,
      },

      "4-PERMANENT-ADDRESS": {
        "1-HOUSE-NO": fields.permanentHouse.value,

        "2-STREET": fields.permanentStreet.value,

        "3-BARANGAY": fields.permanentBarangay.value,

        "4-CITY": fields.permanentCity.value,

        "5-PROVINCE": fields.permanentProvince.value,

        "6-ZIP-CODE": fields.permanentZip.value,
      },

      "5-PARENTS": {
        "1-FATHER-NAME": fields.fatherName.value,

        "2-FATHER-CONTACT": fields.fatherContact.value,

        "3-MOTHER-NAME": fields.motherName.value,

        "4-MOTHER-CONTACT": fields.motherContact.value,

        "5-GUARDIAN-NAME": fields.guardianName.value,

        "6-GUARDIAN-CONTACT": fields.guardianContact.value,
      },

      "6-OPTIONAL": {
        "1-IP": fields.ip.value,

        "2-CULTURE": fields.culture.value,

        "3-DISABILITY": fields.disability.value,

        "4-DISABILITY-TYPE": fields.disabilityType.value,

        "5-4PS": fields.fourPs.value,

        "6-HOUSE-ID": fields.houseID.value,

        "7-LEARNING-MODALITY": fields.learningModalities.value,
      },

      "7-BALIK-ARAL-TRANSFER": {
        "1-LAST-GRADE-LEVEL": fields.lastGrade.value,

        "2-LAST-SCHOOL": fields.lastSchool.value,

        "3-LAST-SCHOOL-YEAR": fields.lastSchoolYear.value,

        "4-SCHOOL-ID": fields.schoolID.value,
      },

      "8-TIME-STAMP": formattedDate,

      "9-REGISTRATION-ID": studentID,
    };

    // -------------------------------------------------
    // SAVE TO FIREBASE
    // -------------------------------------------------

    const saveResponse = await fetch(
      `${FIREBASE_URL}/${dataset}/${studentID}.json`,

      {
        method: "PUT",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify(studentData),
      },
    );

    if (!saveResponse.ok) {
      throw new Error("Failed to save student.");
    }

    // -------------------------------------------------
    // SAVE FOR SUCCESS PAGE
    // -------------------------------------------------

    localStorage.setItem("studentID", studentID);

    localStorage.setItem("studentDatabase", dataset);

    alert("You Registered Successfully!");

    window.location.href = "successful.html";
  } catch (error) {
    console.error("Enrollment Error:", error);

    alert("An error occurred while saving the enrollment. Please try again.");
  }
}

// =====================================================
// EVENT LISTENERS
// =====================================================

document.addEventListener("DOMContentLoaded", function () {
  // Birthdate

  const birthdate = document.querySelector('[name="birthdate"]');

  if (birthdate) {
    birthdate.addEventListener("change", updateBirthdateAndAge);
  }

  // Grade Level

  if (gradeLevel) {
    gradeLevel.addEventListener("change", updateSHSSection);
  }

  // Track

  if (track) {
    track.addEventListener("change", updateStrands);
  }

  // Address

  copyPermanentAddress();

  // Optional fields

  ["with-lrn", "balik-aral", "ip", "disability", "4Ps"].forEach((name) => {
    const field = document.querySelector(`[name="${name}"]`);

    if (field) {
      field.addEventListener("change", controlOptionalFields);
    }
  });

  // Initial state

  updateSHSSection();

  controlOptionalFields();
});
