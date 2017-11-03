/**
 * @author David Serrano <david.ma.serrano@gmail.com>
 */
require(["thief_game", "lib/util"], function (ThiefGame) {
    "use strict";

    var game = new ThiefGame($_("container"), function () {
        game.addEventListener("levelchanged", function (event, level) {
            console.log("Game loaded", level);
        });

        game.playLevel("title.json");
    });

    var loadMap = function (file) {
        var reader = new FileReader();

        reader.addEventListener('load', function (e_) {
            var map = JSON.parse(e_.target.result);
            var onQuit = function () {
                game.playLevel(map);
                game.removeEventListener("quit", onQuit);
            }

            game.addEventListener("quit", onQuit());
            game.quit();

        }, false);
        reader.readAsText(file);
    }

    var onDragOver = function (e) {
        e.preventDefault();
    };


    var onDrop = function (e) {
        e.preventDefault();

        var file = e.dataTransfer.files[0];
        loadMap(file);

        return false;
    };

    var onFileChange = function (e) {
        var file = e.target.files[0];
        loadMap(file);
    }

    document.addEventListener('dragover', onDragOver, false);
    document.addEventListener('drop', onDrop, false);

    $_("maploader").addEventListener('change', onFileChange, false);
});
