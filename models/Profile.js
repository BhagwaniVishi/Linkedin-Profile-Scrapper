// models/Profile.js
module.exports = (sequelize, DataTypes) => {
    const Profile = sequelize.define("Profile", {
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        url: {
            type: DataTypes.STRING,
            allowNull: false
        },
        about: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        bio: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        location: {
            type: DataTypes.STRING,
            allowNull: true
        },
        followerCount: {
            type: DataTypes.STRING,
            allowNull: true
        },
        connectionCount: {
            type: DataTypes.STRING,
            allowNull: true
        }
    });
    return Profile;
};
