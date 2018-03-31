const Mainloop = imports.mainloop;
const Lang = imports.lang;

let _forcegc_enabled = false;
const ForceGC = new Lang.Class({
    Name: 'ForceGC',

    _init: function() {
        this._enable();
    },
    _enable: function() {
        Mainloop.timeout_add_seconds(60, this._zzforcegc);
        _forcegc_enabled = true;
    },
    _zzforcegc: function() {
        imports.system.gc();
        return _forcegc_enabled;
    }
});

let forcegc = null;

function init() {}

function enable() {
    if (forcegc != null) {
        forcegc._enable();
        return;
    }

    forcegc = new ForceGC();

}

function disable() {
    _forcegc_enabled = false;
}
