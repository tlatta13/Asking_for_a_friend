// Creating our QandA model
module.exports = function(sequelize, DataTypes) {
  var Question = sequelize.define('Question', {
    // The question must be a string and not null
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    question: {
      type: DataTypes.STRING,
      allowNull: false,
    }
  });
  Question.associate = function(model){
    Question.hasMany(model.Answer);
  };
  return Question;
};
