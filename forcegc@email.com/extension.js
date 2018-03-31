const Mainloop = imports.mainloop;
const Lang = imports.lang;

const ForceGC = new Lang.Class({
    Name: 'ForceGC',
    _enabled: false,
    _init: function() {
        this._enable();
    },
    _enable: function() {
        this._enabled = true;
        Mainloop.timeout_add_seconds(60, Lang.bind(this, function() {
            imports.system.gc();
            return this._enabled;
        }));
    },
    _disable: function() {
        this._enabled = false;
    }
});

let forcegc = null;

function init() {}

function enable() {
    if (forcegc != null) {
        forcegc._disable();
        forcegc = null;
    }

    forcegc = new ForceGC();
}

function disable() {
    forcegc._disable();
    forcegc = null;
}
