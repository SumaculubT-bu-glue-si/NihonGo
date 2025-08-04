// @ts-check
const { Knex } = require('knex')

/**
 * @param {Knex} knex
 */
async function up(knex) {
    await knex.schema.alterTable('user_game_stats', (table) => {
        table.bigInteger('last_heart_loss_timestamp').nullable().after('diamonds');
    });
}

/**
 * @param {Knex} knex
 */
async function down(knex) {
    await knex.schema.alterTable('user_game_stats', (table) => {
        table.dropColumn('last_heart_loss_timestamp');
    });
}

module.exports = { up, down }
