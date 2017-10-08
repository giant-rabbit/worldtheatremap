// This file configures the Accounts package to define the UI of the reset password email.
import './reset-password-email.js';

// Set up some rate limiting and other important security settings.
import './security.js';

// This defines all the collections, publications and methods that the application provides
// as an API to the client.
import './register-api.js';

// Ensure indexes
import './mongo-index.js';

// Browser policy
import './browser-policy.js';

// File restrictions
import './file-restrictions.js';

// Country prepopulate
import './country-prepopulate.js';

// Content prepopulate
import './content-prepopulate.js';

// Interests prepopulate
import '../../api/interests/interests-list.js';
