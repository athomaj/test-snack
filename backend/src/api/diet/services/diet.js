'use strict';

/**
 * diet service.
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::diet.diet');
