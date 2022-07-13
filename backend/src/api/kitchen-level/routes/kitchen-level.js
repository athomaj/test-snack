'use strict';

/**
 * kitchen-level router.
 */

const { createCoreRouter } = require('@strapi/strapi').factories;

module.exports = createCoreRouter('api::kitchen-level.kitchen-level');
