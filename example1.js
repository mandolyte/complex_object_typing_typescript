"use strict";
exports.__esModule = true;
// function to convert word frequency map
// to an object suitable for MaterialTable
exports.wf_to_mt = (function (ob) {
    var mt = {};
    mt.title = "Word Frequency";
    mt.columns = [
        { title: 'Word', field: 'word' },
        { title: 'Count', field: 'count' },
    ];
    mt.data = [];
    Object.keys(ob).forEach(function (w) {
        mt.data.push({ word: w, count: ob[w] });
    });
    mt.options = { sorting: true };
    return mt;
});
