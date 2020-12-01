'use strict';

const IRMA_SERVER = 'https://demo.irma.dev/backend';
const IRMA_TOKEN = 'ZiHnhN0yPuop3YjQCf8BTHhekaaimy';

let options = {
  // Developer options
  debugging: true,

  // Front-end options
  language: 'nl',

  // Back-end options
  session: {
  // Point this to your IRMA server:
  url: IRMA_SERVER,

  // Define your disclosure request:
  start: {
    method: 'POST',
    headers: {
    'Content-Type': 'application/json'
    },
    body: JSON.stringify({
    "@context": "https://irma.app/ld/request/disclosure/v2",
    "disclose": [
      [
      [
        "irma-demo.gemeente.personalData.bsn",
        "irma-demo.gemeente.personalData.firstnames",
        "irma-demo.gemeente.personalData.familyname",
        "irma-demo.gemeente.personalData.dateofbirth"
      ]
      ]
    ]
    })
  }
  }
};

let testresult = Boolean(Math.round(Math.random()));
let bsn = '';
let firstname = '';
let lastname = '';
let dateofbirth = '';

let irmaPopup = irma.newPopup(options);
document.getElementById('login-with-irma').onclick = () => {
  irmaPopup.start()
  .then(result => {
    console.log("Successful disclosure! 🎉", result)
      let testresult_text = testresult ? 'negatief': 'positief';
      console.log('Your test result is: ' + testresult);
      bsn = result.disclosed[0][0].rawvalue;
      firstname = result.disclosed[0][1].rawvalue;
      lastname = result.disclosed[0][2].rawvalue;
      dateofbirth = result.disclosed[0][3].rawvalue;
      document.getElementById('irma-buttons').style = 'display: none !important';
      document.getElementById('irma-web-form').style.display = 'block';
      document.getElementById('irma-web-form-data').innerHTML = 'Hoi ' + firstname + ', uw testuitslag is <strong>' + testresult_text + '</strong>. Voeg deze testuitslag toe aan IRMA.'
  })
  .catch(error => {
    if (error === 'Aborted') {
    console.log('We closed it ourselves, so no problem 😅');
    return;
    }
    console.error("Couldn't do what you asked 😢", error);
  })
  .finally(() => irmaPopup = irma.newPopup(options));
};
document.getElementById('login-with-digid').onclick = () => {
  window.location.replace("https://services-test.nijmegen.nl/testuitslag/ophalen");
}

document.getElementById('issue-irma').onclick = () => {
  let date = new Date();
  // Issue, by showing a popup.
   const request = {
     '@context': 'https://irma.app/ld/request/issuance/v2',
     "credentials": [
      {
        "credential": "irma-demo.ggd.coronatest",
        "attributes": {
          "date": "30-11-2020",
          "dateofbirth": dateofbirth,
          "familyname": lastname,
          "firstnames": firstname,
          "kind": "PCR",
          "negativetestresult": testresult?'yes':'no',
          "performer": "GGD delfland"
        }
      }
    ]
   };
   console.log('issuing test attributes:', request);

   irma.newPopup({
     session: {
       url: IRMA_SERVER,
       start: {
         method: 'POST',
         headers: { 'Content-Type': 'application/json' },
         body: JSON.stringify(request),
       }
     },
   })
   .start()
   .then(() => {
     console.log("Issuance successful");
     document.getElementById('irma-web-form-data').innerHTML = "Kaartje is toegevoegd."
     document.getElementById('issue-irma').style.display = "none";
   })
   .catch(error => console.error("Issuance failed: ", error));
}
