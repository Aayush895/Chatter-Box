import { User } from './Auth/AuthSchemas.js';
import { Friendship } from './FriendshipSchema.js';
import { Message } from './MessageSchema.js';

// TODO: Need to understand this relation in mysql as well as Sequelize

// Self-referential many-to-many: a User can have many friends (other Users)
// through the Friendship join table.
User.belongsToMany(User, {
  through: Friendship,
  as: 'friends',
  foreignKey: 'requesterId',
  otherKey: 'receiverId',
});

// Direct access to raw Friendship rows, split by direction.
User.hasMany(Friendship, { as: 'sentFriendRequests', foreignKey: 'requesterId' });
User.hasMany(Friendship, { as: 'receivedFriendRequests', foreignKey: 'receiverId' });

// Lets you go from a Friendship row back to the two Users involved.
Friendship.belongsTo(User, { as: 'requester', foreignKey: 'requesterId' });
Friendship.belongsTo(User, { as: 'receiver', foreignKey: 'receiverId' });

Message.belongsTo(User, { as: 'sender', foreignKey: 'senderId' });
Message.belongsTo(User, { as: 'receiver', foreignKey: 'receiverId' });

User.hasMany(Message, { as: 'sentMessages', foreignKey: 'senderId' });
User.hasMany(Message, { as: 'receivedMessages', foreignKey: 'receiverId' });

export { User, Friendship, Message };
