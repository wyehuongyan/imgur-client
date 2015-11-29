var React = require('react');
var Actions = require('../actions');
var Reflux = require('reflux');
var TopicStore = require('../stores/topic-store');
var ReactRouter = require('react-router');
var Link = ReactRouter.Link;

module.exports = React.createClass({
    mixins: [
        Reflux.listenTo(TopicStore, 'onChange')
    ],
    getInitialState: function() {
        return {
            topics: []
        }
    },
    componentWillMount: function() {
        Actions.getTopics();
    },
    render: function() {
        return <nav className="navbar navbar-default header">
            <div className="container-fluid">
                <a href="#/" className="navbar-brand">
                    Imgur Browser
                </a>
                <ul className="nav navbar-nav navbar-right">
                    {this.renderTopics()}
                </ul>
            </div>
        </nav>
    },
    renderTopics: function() {
        return this.state.topics.map(function(topic) {
            return <li key={topic.id}>
                <Link activeClassName="active" to={"topics/" + topic.id}>
                    {topic.name}
                </Link>
            </li>
        });
    },
    onChange: function(event, topics) {
        this.setState({
            topics: topics
        });
    }
});