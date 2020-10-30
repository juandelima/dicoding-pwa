
import Database from './db.js';

let db = new Database();

const favorite = (id, data) => {
    $(document).ready(() => {
        $(`#click_favorite_${id}`).click(() => {
            if ($(`#add_start_${id}`).hasClass("fa-heart")) {
                    db.removeFavTeam(id);
                    $(`#click_favorite_${id}`).removeClass('active')
                setTimeout(() =>  {
                    $(`#click_favorite_${id}`).removeClass('active-2')
                }, 30)
                    $(`#click_favorite_${id}`).removeClass('active-3')
                setTimeout(() =>  {
                    $(`#add_start_${id}`).removeClass('fa-heart')
                    $(`#add_start_${id}`).addClass('fa-heart-o')
                }, 15)
            } else {
                db.saveFavoriteTeam(data);
                $(`#click_favorite_${id}`).addClass('active')
                $(`#click_favorite_${id}`).addClass('active-2')
                setTimeout(() =>  {
                    $(`#add_start_${id}`).addClass('fa-heart')
                    $(`#add_start_${id}`).removeClass('fa-heart-o')
                }, 150)
                setTimeout(() => {
                    $(`#click_favorite_${id}`).addClass('active-3')
                }, 150)
            }
        })
    });
};

export default favorite;