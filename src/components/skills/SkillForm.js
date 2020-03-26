import React, { useRef } from "react"
import { Link, withRouter } from "react-router-dom"
import { postItem } from "../../modules/apiManager"

const SkillForm = props => {
	const name = useRef();
  const avatar = useRef()

  const handleSkillCreation = e => {
  	e.preventDefault()
  	// TODO: actually pass in avatar uploaded by user
  	const skillObj = {
  		name: name.current.value,
  		avatar: 'http://placeimg.com/200/200/any'
  	}
    // TODO: prevent creating duplicate skill. prompt user if it's a dupe.
  	postItem('skills', skillObj)
  		.then(skill => {
  			const userSkillObj = {
  				skill_id: skill.id,
  				is_moderator: true
  			}

  			postItem('userskills', userSkillObj)
  				.then(() => props.history.push({ pathname: "/" }))
  		})
  }

  return (
  	<main className='pa4 black-80'>
  		<Link to='/'><div className="orange fr f4 fw3">x</div></Link>
  		<form className="measure center" onSubmit={handleSkillCreation}>
  			<fieldset className="ba b--transparent ph0 mh0">
  				<legend className="f4 fw6 ph0 mh0">Create Skill</legend>
  				<div className="mt3">
            <label className="db fw6 lh-copy f6" htmlFor="skill-name">
              Name
            </label>
            <input
              className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
              type="text"
              required
              ref={name}
              id="skill-name"
              autoFocus
              placeholder=""
            />
          </div>
  			</fieldset>
  			<input
          className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib"
          type="submit"
          value="Create"
        />
  		</form>
  	</main>
  )
}

export default withRouter(SkillForm)