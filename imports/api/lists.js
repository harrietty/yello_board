import { Mongo } from 'meteor/mongo';
import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import { Cards } from './cards';

export const Lists = new Mongo.Collection('lists');

Meteor.methods({
  'lists.insert' (title) {
    check(title, String);

    if (!this.userId) {
      throw new Meteor.Error('not-authorized');
    }

    Lists.insert({
      title,
      createdAt: new Date(),
      owner: this.userId,
      username: Meteor.users.findOne(this.userId).username
    });
  },

  'lists.remove' (listId) {
    check(listId, String);
    Lists.remove(listId);
    Cards.remove({listId: listId})
  },

  'lists.update' (listId, newTitle) {
    check(listId, String);
    Lists.update(listId, {
      $set: {title: newTitle}
    });
  }
});
