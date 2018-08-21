module.exports = {


  friendlyName: 'Get User role',


  description: '',


  inputs: {

    userId: {
      required: true,
      type: 'number',
      custom: async (valueToCheck) => {
        let foundUser = await User.findOne(valueToCheck);
        return foundUser
      },
    },

    serverId: {
      required: true,
      type: 'number',
      custom: async (valueToCheck) => {
        let foundServer = await SdtdServer.findOne(valueToCheck);
        return foundServer
      },
    },

  },


  exits: {
    success: {
      outputFriendlyName: 'Success',
      outputType: 'json'
    },

  },

  fn: async function (inputs, exits) {

    let foundUser = await User.findOne(inputs.userId);
    let foundServer = await SdtdServer.findOne(inputs.serverId);

    let foundPlayer = await Player.findOne({
      where: {
        steamId: foundUser.steamId,
        server: foundServer.id
      }
    });

    try {
      await sails.helpers.discord.setRoleFromDiscord(foundPlayer.id);
    } catch (error) {
      sails.log.debug(`Couldn't update players roles via discord - ${error}`)
    }

    let foundRole;

    let amountOfRoles = await Role.count({
      server: foundPlayer.server
    });

    if (amountOfRoles === 0) {
      await Role.create({
        name: "Default role",
        level: 9999,
        server: foundPlayer.server,
        amountOfteleports: 5
      });
    }

    if (foundPlayer.role) {
      foundRole = await Role.findOne(foundPlayer.role);
    } else {
      foundRole = await Role.find({
        where: {
          server: foundPlayer.server
        },
        sort: 'level DESC',
        limit: 1
      });
      foundRole = foundRole[0]
    }

    sails.log.verbose(`Found role ${foundRole.name} for user ${foundUser.name}`)
    return exits.success(foundRole);

  }


};
