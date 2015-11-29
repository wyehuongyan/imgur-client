var Api = require('../utils/api');
var Reflux = require('reflux');
var Actions = require('../actions');
var _ = require('lodash');

module.exports = Reflux.createStore({
    listenables: [Actions], // listens to actions to call getImages/getImage
    getImages: function(topicId) {
        Api.get('topics/' + topicId)
        .then(function(json) {
            this.images = _.reject(json.data, function(image) {
                return image.is_album;
            });

            // tell the world
            this.triggerChange();
        }.bind(this))
    },
    getImage: function(id) {
        Api.get('gallery/image/' + id)
        .then(function(json) {
            if(this.images) {
                // already exists
                this.images.push(json.data);
            } else {
                // new array
                this.images = [json.data];
            }

            // tell the world
            this.triggerChange();
        }.bind(this));
    },
    find: function(id) {
        var image = _.findWhere(this.images, {
            id: id
        });

        // if this.images has not been loaded yet
        if(image) {
            return image;
        } else {
            // get this image only
            this.getImage(id);
            return null;
        }
    },
    triggerChange: function() {
        // send a event to the world
        this.trigger('change', this.images);
    }
});