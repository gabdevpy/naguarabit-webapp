pubnub.addListener({
    message: function(m) {
        // handle message
        var channelName = m.channel; // The channel to which the message was published
        var channelGroup = m.subscription; // The channel group or wildcard subscription match (if exists)
        var pubTT = m.timetoken; // Publish timetoken
        var msg = m.message; // The Payload
        var publisher = m.publisher; //The Publisher
    },
    presence: function(p) {
        // handle presence
        var action = p.action; // Can be join, leave, state-change, or timeout
        var channelName = p.channel; // The channel to which the message was published
        var occupancy = p.occupancy; // Number of users subscribed to the channel
        var state = p.state; // User State
        var channelGroup = p.subscription; //  The channel group or wildcard subscription match (if exists)
        var publishTime = p.timestamp; // Publish timetoken
        var timetoken = p.timetoken;  // Current timetoken
        var uuid = p.uuid; // UUIDs of users who are subscribed to the channel
    },
    signal: function(s) {
        // handle signal
        var channelName = s.channel; // The channel to which the signal was published
        var channelGroup = s.subscription; // The channel group or wildcard subscription match (if exists)
        var pubTT = s.timetoken; // Publish timetoken
        var msg = s.message; // The Payload
        var publisher = s.publisher; //The Publisher
    },
    objects: (objectEvent) => {
        var channel = objectEvent.channel; // The channel
        var channelGroup = objectEvent.subscription; // The channel group
        var timetoken = objectEvent.timetoken; // The event timetoken
        var publisher = objectEvent.publisher; // The UUID that triggered this event
        var event = objectEvent.event; // The event name that occurred
        var type = objectEvent.type; // The event type that occurred
        var data = objectEvent.data; // The event data that occurred
    },
    messageAction: function(ma) {
        // handle message action
        var channelName = ma.channel; // The channel to which the message was published
        var publisher = ma.publisher; //The Publisher
        var event = ma.message.event; // message action added or removed
        var type = ma.message.data.type; // message action type
        var value = ma.message.data.value; // message action value
        var messageTimetoken = ma.message.data.messageTimetoken; // The timetoken of the original message
        var actionTimetoken = ma.message.data.actionTimetoken; // The timetoken of the message action
    },
    file: function (event) {
        const channelName = event.channel; // Channel to which the file belongs
        const channelGroup = event.subscription; // Channel group or wildcard subscription match (if exists)
        const publisher = event.publisher; // File publisher
        const timetoken = event.timetoken; // Event timetoken
        const message = event.message; // Optional message attached to the file
        const fileId = event.file.id; // File unique id
        const fileName = event.file.name;// File name
        const fileUrl = event.file.url; // File direct URL
    },
    status: function(s) {
        var affectedChannelGroups = s.affectedChannelGroups; // The channel groups affected in the operation, of type array.
        var affectedChannels = s.affectedChannels; // The channels affected in the operation, of type array.
        var category = s.category; //Returns PNConnectedCategory
        var operation = s.operation; //Returns PNSubscribeOperation
        var lastTimetoken = s.lastTimetoken; //The last timetoken used in the subscribe request, of type long.
        var currentTimetoken = s.currentTimetoken; //The current timetoken fetched in the subscribe response, which is going to be used in the next request, of type long.
        var subscribedChannels = s.subscribedChannels; //All the current subscribed channels, of type array.
    },
});
