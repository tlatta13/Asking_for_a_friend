// Creating our QandA model
module.exports = function(sequelize, DataTypes) {
  var QandA = sequelize.define('QandA', {
    // The question must be a string and not null
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    question: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    // The answer must be a string and can be null.
    answer: {
      type: DataTypes.STRING,
      allowNull: true
    }
  });
  return QandA;
};