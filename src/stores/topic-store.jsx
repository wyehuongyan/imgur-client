var Api = require('../utils/api');
var Reflux = require('reflux');
var Actions = require('../actions');

module.exports = Reflux.createStore({
    listenables: [Actions], // listens to actions to call getTopics
    getTopics: function() {
        return Api.get('topics/defaults')
        .then(function(json) {
            // this refers to this instance
            this.topics = json.data;
            this.triggerChange();
        }.bind(this));
    },
    triggerChange: function() {
        this.trigger('change', this.topics);
    }
});