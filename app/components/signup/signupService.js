deadlinesApp
	.service('signup', function($http){
		this.signup = function(user){
			return $http.post('http://api.deadlinesapi.dev:88/users', {user: {email: user.email, password: user.password, password_confirmation: user.password_confirmation} });
		}
	})