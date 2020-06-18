/* eslint-disable linebreak-style */
module.exports = function (sequelize, DataTypes) {
  var Answer = sequelize.define('Answer', {
    // The answer must be a string and not null
    answer: {
      type: DataTypes.STRING,
      allowNull: false,
      //notEmpty: true
    },

  });
  Answer.associate = function(model) {
    Answer.belongsTo(model.Question, {
      foreignKey: {
        allowNull: false
      },
    });
  };
  return Answer;
};