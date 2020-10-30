import favorite from './favorite.js';
import Database from './db.js';

class ApiFootball {
    constructor() {
        this.baseUrl = 'https://api.football-data.org/v2';
        this.apiKey = '600c2a01580f42009fe8f9ae532f1a12';
        this.db = new Database();
        this.options = {
            headers: {
                'X-Auth-Token': `${this.apiKey}`
            },
            mode: 'cors'
        };
    }

    status(response) {
        if (response.status !== 200) {
            console.log('Error : ' + response.status);
            return Promise.reject(new Error(response.statusText));
        } else {
            return Promise.resolve(response);
        }
    }

    json(response) {
        return response.json(); 
    }

    error(error) {
        if (!"caches" in window) {
            alert(error);
        } 
    }
}

class Standings extends ApiFootball {
    getStandings() {
        this.checkCacheStandings();
        fetch(`${this.baseUrl}/competitions/2014/standings`, this.options)
        .then(this.status)
        .then(this.json)
        .then(data => {
            setTimeout(() => {
                this.renderStandingsTable(data.standings[0]);    
            }, 1000);
        })
        .catch(this.error);
    }

    renderStandingsTable(standings) {
        const klasemen = document.getElementById("klasemen_table");
        klasemen.innerHTML = '';
        standings.table.forEach(data => {
            const urlImage = data.team.crestUrl.replace(/^http:\/\//i, 'https://');
            klasemen.innerHTML += `
                <tr>
                    <td>${data.position}</td>
                    <td><img src="${urlImage}" width="20" height="20"> ${data.team.name}</td>
                    <td>${data.won}</td>
                    <td>${data.lost}</td>
                    <td>${data.draw}</td>
                </tr>
            `;
        });
    }

    checkCacheStandings() {
        if ("caches" in window) {
            caches.match(`${this.baseUrl}/competitions/2014/standings`)
            .then(this.status)
            .then(this.json)
            .then(data => {
                setTimeout(() => {
                    this.renderStandingsTable(data.standings[0]);
                }, 1000);
            })
            .catch(this.error);
        }
    }
}

class Teams extends ApiFootball {
    getTeams() {
        this.checkCacheTeams();
        fetch(`${this.baseUrl}/competitions/2014/teams`, this.options)
        .then(this.status)
        .then(this.json)
        .then(data => {
            this.db.getAll().
            then(savedTeams => {
                setTimeout(() => {
                    this.renderHtmlTeams(data.teams, savedTeams);
                }, 1000);
            });
        })
        .catch(this.error);
    }

    getSavedTeams() {
        this.db.getAll()
        .then(teams => {
            setTimeout(() => {
                this.renderFavTeams(teams);
            }, 1000);
        });
    }

    renderHtmlTeams(teams, savedTeams) {
        const teamsHtml = document.getElementById("teams");
        teamsHtml.innerHTML = '';
        teams.forEach(data => {
            const urlImage = data.crestUrl.replace(/^http:\/\//i, 'https://');
            let faHeart = 'fa-heart-o';
            let isSaved = false;
            let active = '';
            for(let i = 0; i < savedTeams.length; i++) {
                if(data.id === savedTeams[i].id) {
                    isSaved = true;
                    break;
                }
            }        
            if(isSaved) {
                active = 'active active-2 active-3';
                faHeart = 'fa-heart';
            }
            teamsHtml.innerHTML += `
                <div class="col s12 m6">
                    <div class="card horizontal">
                        <div class="card-image">
                            <img src="${urlImage}" alt="${data.name}" class="responsive-img" style="margin: 10px;">
                        </div>
                        <div class="card-stacked">
                            <div class="col s5" style="margin-top: 5px;">
                                <div class="click ${active}" id="click_favorite_${data.id}">
                                    <span class="fa ${faHeart}" id="add_start_${data.id}"></span>
                                    <div class="ring"></div>
                                    <div class="ring2"></div>
                                </div>
                            </div>
                            <div class="card-content">
                                <span class="card-title" style="color: black;"><strong>${data.name}</strong></span>
                                <p>
                                    Address: ${data.address}
                                </p>
                            </div>
                            <div class="card-action">
                                <a href="${data.website}" target="__blank">Website</a>
                            </div>
                        </div>
                    </div>
                </div>
            `;
            favorite(data.id, data);
        });
    }

    renderFavTeams(teams) {
        const teamsHtml = document.getElementById("favorite_teams");
        teamsHtml.innerHTML = '';
        if(teams.length != 0) {
            teams.forEach(data => {
                const urlImage = data.crestUrl.replace(/^http:\/\//i, 'https://');
                teamsHtml.innerHTML += `
                    <div class="col s12 m6">
                        <div class="card horizontal">
                            <div class="card-image">
                                <img src="${urlImage}" alt="${data.name}" class="responsive-img" style="margin: 10px;">
                            </div>
                            <div class="card-stacked">
                                <div class="card-content">
                                    <span class="card-title" style="color: black;"><strong>${data.name}</strong></span>
                                    <p>
                                        Address: ${data.address}
                                    </p>
                                </div>
                                <div class="card-action">
                                    <a href="${data.website}" target="__blank">Website</a>
                                </div>
                            </div>
                        </div>
                    </div>
                `;
            });
        } else {
            teamsHtml.innerHTML = `
                <h4>The favorite team is empty</h4>
            `;
        }
    }

    checkCacheTeams() {
        if ("caches" in window) {
            caches.match(`${this.baseUrl}/competitions/2014/teams`)
            .then(this.status)
            .then(this.json)
            .then(data => {
                this.db.getAll().
                then(savedTeams => {
                    setTimeout(() => {
                        this.renderHtmlTeams(data.teams, savedTeams);
                    }, 1000);
                });
            })
            .catch(this.error);
        }
    }
}

export {
    Standings,
    Teams
}