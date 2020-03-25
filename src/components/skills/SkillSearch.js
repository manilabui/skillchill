import React, { useState, useEffect, useRef } from 'react'
import { Link } from "react-router-dom"
import { getAll } from '../../modules/apiManager'
import { toLower } from 'lodash'

export default props => {
	const [skills, setSkills] = useState([])
	const [searchResults, setResults] = useState([])
	const searchInput = useRef()

	const getCurrUserSkills = () => {
    getAll("userskills")
      .then(skills => setUserSkills(skills))
  }

	const getAllSkills = () => { 
		getAll('skills').then(skills => {
			setSkills(skills)
		})
	}

	const getFilteredSkills = () => {
		getAll('skills')
			.then(allSkills => {
				getAll("userskills")
					.then(userSkills => {
						// do filtering here
						const 
					})
			})
	}

	useEffect(getAllSkills, [])

	const getSearchResults = () => {
    const userInput = toLower(searchInput.current.value)
    const results = allSkills.filter(({ name }) => toLower(name).includes(userInput))
    
    setResults(results)
  }

  const searchResultsItems = searchResults.map(({ id, name, avatar }) => {
  	return (
  		<div key={id} className='mb1 pa2 pt3 inline-flex items-center'>
	      <img src={avatar} alt="avatar" className="br-100 h1 w1 dib" />
	      <span className='pl2 f6 fw6 dib'>{name}</span>
    	</div>
    )
  })

	return (
		<main className='pa4 black-80'>
			<Link to='/'><div className="orange fr f4 fw3">x</div></Link>
			<label className="f4 fw6 ph0 mh0" htmlFor='search'>Search skill</label>
			<input
        className="center mt3 pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
        type="text"
        id="search"
        ref={searchInput}
        onChange={getSearchResults}
        autoComplete="on"
        autoFocus="on"
        placeholder=""
      />
      <div>{searchResultsItems}</div>
      <Link to='/skill/new'>
      	<div className='mt3 b ph3 pv2 ba black b--black bg-transparent grow f6 dib link'>
      		Create a skill
      	</div>
      </Link>
		</main>
	)
}