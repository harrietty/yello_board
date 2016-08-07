import { Mongo } from 'meteor/mongo';
import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';

export const Cards = new Mongo.Collection('cards');

Meteor.methods({
  'cards.insert' (task, listId) {
    check(task, String);

    if (!this.userId) {
      throw new Meteor.Error('not-authorized');
    }
    Cards.insert({
      text: task,
      createdAt: new Date(),
      completed: false,
      owner: this.userId,
      username: Meteor.users.findOne(this.userId).username,
      listId: listId
    });
  },

  'cards.remove' (cardId) {
    check(cardId, String);
    Cards.remove(cardId);
  },

  'cards.update' (cardId, newText) {
    check(cardId, String);
    Cards.update(cardId, {
      $set: {text: newText}
    });
  }
});
