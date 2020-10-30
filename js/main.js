import Navigation from './nav.js';
import {Teams} from './apiFootball.js';

const main = () => {
    const nav = new Navigation();
    const teams = new Teams();
    nav.main();
    teams.getTeams();
};

export default main;