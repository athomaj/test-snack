'use strict';

/**
 * kitchen service.
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::kitchen.kitchen');
