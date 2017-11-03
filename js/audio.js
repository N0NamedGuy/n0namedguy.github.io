define(["lib/util", "underscore/underscore"], function (Util) {
    "use strict";

    var Audio = {};

    Audio.play = function (sample_) {
        var sample = this.samples[sample_];
        
        if (sample !== undefined) {
            sample.play();
        } else {
            console.warn("Sample " + sample_ + " not found");
        }
    };

    Audio.load = function (assets, cb) {
        this.assets = assets;
        this.samples = assets.audio;

        if (typeof cb === "function") {
            cb.call();
        }
    };

    return Audio;
});
