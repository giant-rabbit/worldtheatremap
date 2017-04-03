/* eslint-disable prefer-arrow-callback */
import { TAPi18n } from 'meteor/tap:i18n';
import { Profiles } from '../profiles.js';
import { _ } from 'meteor/underscore';
import escapeRegExp from 'lodash.escaperegexp';

TAPi18n.publish('profiles.public', function profilesPublic() {
  return Profiles.i18nFind({}, {
    fields: Profiles.publicFields,
  });
});

TAPi18n.publish('profiles.autocomplete', function profilesAutocomplete() {
  return Profiles.i18nFind({}, {
    fields: { name: 1 },
  });
});

TAPi18n.publish('profiles.autocompleteQuery', function profilesAutocompleteQuery(search) {
  const regex = new RegExp(`.*${escapeRegExp(search)}.*`, 'i');
  return Profiles.i18nFind({ name: { $regex: regex } }, {
    fields: Profiles.autocompleteFields,
    limit: 5,
  });
});

TAPi18n.publish('profiles.search', function profilesSearch(plainTextQuery, skip, locale) {
  const processedQuery = _.clone(plainTextQuery);

  if (plainTextQuery.name) {
    if (!_.isEmpty(locale) && locale !== 'en') {
      const i18nKey = `i18n.${locale}.name`;
      delete processedQuery.name;
      processedQuery[i18nKey] = new RegExp(`.*${escapeRegExp(plainTextQuery.name)}.*`, 'i');
    } else {
      processedQuery.name = new RegExp(`.*${escapeRegExp(plainTextQuery.name)}.*`, 'i');
    }
  }

  if (plainTextQuery.postalCode) {
    processedQuery.postalCode = new RegExp(`.*${escapeRegExp(plainTextQuery.postalCode)}.*`, 'i');
  }

  const limit = 20;

  return Profiles.i18nFind(processedQuery, {
    fields: Profiles.publicFields,
    sort: { name: 1 },
    limit,
    skip,
  });
});

TAPi18n.publish('profiles.searchNames', function profilesSearchNames(query, requestedPage) {
  const processedQuery = _.clone(query);

  if (processedQuery.name) {
    processedQuery.name = new RegExp(query.name, 'i');
  }

  const limit = 20;
  const skip = requestedPage ? requestedPage * limit : 0;

  return Profiles.i18nFind(processedQuery, {
    fields: { name: 1 },
    sort: { name: 1 },
    limit,
    skip,
  });
});

TAPi18n.publish('profiles.byId', function profilesById(ids) {
  return Profiles.i18nFind({ _id: { $in: ids } }, {
    fields: Profiles.publicFields,
  });
});

TAPi18n.publish('profiles.singleById', function profilesSingleById(id) {
  return Profiles.i18nFind({ _id: id }, {
    fields: Profiles.publicFields,
    limit: 1,
  });
});
