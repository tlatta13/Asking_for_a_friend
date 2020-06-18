// Creating our QandA model
module.exports = function(sequelize, DataTypes) {
  var Question = sequelize.define('Question', {
    // The question must be a string and not null
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      //notEmpty: true
    },
    question: {
      type: DataTypes.STRING,
      allowNull: false,
      //notEmpty: true
    }
  });
  Question.associate = function(model){
    Question.hasMany(model.Answer);
  };
  return Question;
};
