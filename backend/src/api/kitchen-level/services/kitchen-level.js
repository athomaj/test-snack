'use strict';

/**
 * kitchen-level service.
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::kitchen-level.kitchen-level');
