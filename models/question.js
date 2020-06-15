// Creating our User model
module.exports = function(sequelize, DataTypes) {
  var QandA = sequelize.define('QandA', {
    // The username cannot be null
    question: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    // The password cannot be null
    answer: {
      type: DataTypes.STRING,
      allowNull: true
    }
  });
  // Creating a custom method for our User model. This will check if an unhashed password entered by the user can be compared to the hashed password stored in our database
  return QandA;
};