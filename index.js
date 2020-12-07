require('dotenv').config()
const cron = require('node-cron');
const { getPrices } = require('./jobs');

const CRON_SCHEDULE = process.env.CRON_SCHEDULE;

// Setting cron for scheduled task
cron.schedule(CRON_SCHEDULE, getPrices);
