import { Meteor } from 'meteor/meteor';
import { Profiles } from '../../api/profiles/profiles.js';
import { createContainer } from 'meteor/react-meteor-data';
import ProfilePage from '../pages/ProfilePage.jsx';

export default createContainer(({ params: { id } }) => {
  // const todosHandle = Meteor.subscribe('todos.inList', id);
  // const loading = !todosHandle.ready();
  const profile = Profiles.findOne(id);
  const plays = profile ? profile.getPlays().fetch() : null;
  const roles = profile ? profile.getRoles() : null;
  // const profileExists = !loading && !!profile;
  return {
    // loading,
    profile,
    // profileExists,
    plays,
    roles,
  };
}, ProfilePage);
