import { Meteor } from 'meteor/meteor';
import { _ } from 'meteor/underscore';
import { DDPRateLimiter } from 'meteor/ddp-rate-limiter';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { ValidatedMethod } from 'meteor/mdg:validated-method';

// API
import { SearchShare } from './searchShare.js';

export const upsert = new ValidatedMethod({
  name: 'searchShare.upsert',
  validate: new SimpleSchema({
    count: { type: Number },
    summary: { type: String },
    shareImageFilename: { type: String },
    locale: { type: String },
  }).validator(),
  run({ count, summary, shareImageFilename, locale }) {
    const filename = shareImageFilename;

    const shareSearchObject = {
      filename,
      count,
      summary,
      locale,
    };

    // Upsert only requires count + one of the other two
    // since filename is just a hashed version of modifiers
    SearchShare.upsert({
      filename,
      count,
    }, shareSearchObject);
  },
});

// Get all method names
const METHODS = _.pluck([
  upsert,
], 'name');

if (Meteor.isServer) {
  // Only allow 5 operations per connection per second
  DDPRateLimiter.addRule({
    name(name) {
      return _.contains(METHODS, name);
    },

    // Rate limit per connection ID
    connectionId() { return true; },
  }, 5, 1000);
}
