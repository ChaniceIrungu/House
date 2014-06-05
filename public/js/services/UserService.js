app.factory('User', function($http, $rootScope, $location) {
    var userProfile = {};
    var currentGroup = {};

    var updateCache = function (user) {
        console.log("User fetched. ", user);
        userProfile = user;
        currentGroup = user.groups[0];
        $rootScope.$emit('change:user', user);
    };

    var User = {};

    User.fetch = function(id) {
        var id = id || userProfile._id;
        return $http.get('/api/user/' + id).success(updateCache);
    };

    User.get = function () { return userProfile; };
    User.set = function (userAttrs) {
        Object.keys(userAttrs).forEach(function(key) {
            userProfile[key] = userAttrs[key];
        });

        console.log(userProfile);

        return $http.put('/api/user/' + userProfile._id, userProfile)
            .success(updateCache);
    };

    User.currentGroup = function(groupName) {
        if (arguments.length === 0) {
            return currentGroup;
        } else {
            userProfile.groups.forEach(function(group) {
                if (groupName === group.name) {
                    currentGroup = group;
                }
            });
            return currentGroup;
        }
    };

    User.getId = function() { return userProfile._id; }

    return User;
});