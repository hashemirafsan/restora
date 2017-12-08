const oauth_credentials = {
	client_id: 2,
	client_secret: 'STkSsTrL7n5FHS9gPglgmC2kADKYVrHtrPOs8Qwi',
	grant_type: 'password',
	scope: '*',
	username: '',
	password: ''
}

const route = {
	app_url  : 	'http://server.dev',
	// app_url : 'https://api.reviewsfood.com/',
	get oauth_token(){
		return this.app_url + '/oauth/token'
	},
	get registration() {
		return this.app_url + '/register'
	},
	get user() {
		return this.app_url + '/api/v1' + '/user'
	}
}

export {
	oauth_credentials,
	route
};