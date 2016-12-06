
export default {
	methods : {
		teamColor ({mannschaft_id : id}) {
			return 'hsl('+((id * 30) % 361)+', 50%, 80%)'
		},

		teamLogo ({hat_logo : hasLogo = false, mannschaft_id : id}) {
			if (hasLogo)
				return './static/team-logos/'+ id +'.png'
			else
				return './static/img/no-logo.png'
		}
	}
}
