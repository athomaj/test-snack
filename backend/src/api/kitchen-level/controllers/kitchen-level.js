'use strict';

/**
 *  kitchen-level controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::kitchen-level.kitchen-level');
