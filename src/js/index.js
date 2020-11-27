'use strict';

import _ from 'lodash';

const irma = require('@privacybydesign/irma-frontend');

const IRMA_SERVER = 'https://demo.irma.dev/backend';



function component() {
   const element = document.createElement('div');

   // Lodash, now imported by this script
   element.innerHTML = _.join(['Hello', 'webpack'], ' ');

   return element;
 }

 document.body.appendChild(component());
