'use strict';

const IRMA_SERVER = 'https://demo.irma.dev';
const IRMA_TOKEN = 'ZiHnhN0yPuop3YjQCf8BTHhekaaimy';

let options = {
  // Developer options
  debugging: true,

  // Front-end options
  language: 'en',
  translations: {
  header: 'Proceed with IRMA <i class="irma-web-logo">IRMA</i>',
  loading: 'Just one second please!'
  },

  // Back-end options
  session: {
  // Point this to your IRMA server:
  url: IRMA_SERVER,

  // Define your disclosure request:
  start: {
    method: 'POST',
    headers: {
    'Content-Type': 'application/json',
    //'Authorization': IRMA_TOKEN
    },
    body: JSON.stringify({
    "@context": "https://irma.app/ld/request/disclosure/v2",
    "disclose": [
      [
      [
        "irma-demo.gemeente.persoonalData.bsn",
        "irma-demo.gemeente.persoonalData.firstenames",
        "irma-demo.gemeente.persoonalData.familyname",
        "irma-demo.gemeente.persoonalData.dateofbirth",
      ]
      ]
    ]
    })
  }
  }
};

let irmaPopup = irma.newPopup(options);
document.getElementById('login-with-irma').onclick = () => {
  irmaPopup.start()
  .then(result => {
    console.log("Successful disclosure! 🎉", result)
    // Continue to main page if user is 18+
    if (result.disclosed[0][0].rawvalue.toLowerCase() === 'yes') {
      window.location.href = 'index.html';
    } else {
      let testresult = Boolean(Math.round(Math.random()));
      console.log('Your test result is: ' + testresult);
      // Show age notification if user is <18
      document.getElementById('irma-buttons').style.display = 'hidden';
      document.getElementById('irma-web-form').style.display = 'block';
    }
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
