import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { getAll, postItem } from "../../modules/apiManager";
import { toLower } from "lodash";

export default props => {
  const [skills, setSkills] = useState([]);
  const [searchResults, setResults] = useState([]);
  const searchInput = useRef();

  // filter out skills the user is already following
  const getFilteredSkills = () => {
    getAll("skills").then(async allSkills => {
      const userSkills = await getAll("userskills");
      const userSkillIds = userSkills.map(({ skill }) => skill.id);
      const filteredSkills = allSkills.filter(
        ({ id }) => !userSkillIds.includes(id)
      );

      setSkills(filteredSkills);
    });
  };

  useEffect(getFilteredSkills, []);

  const getSearchResults = () => {
    const userInput = toLower(searchInput.current.value);
    const results = skills.filter(({ name }) =>
      toLower(name).includes(userInput)
    );

    setResults(results);
  };

  const handleSkillClick = (id, name) => {
    const skillFollowConfirmed = window.confirm(
      `Would you like to follow ${name}?`
    );
    const userSkillObj = {
      skill_id: id,
      is_moderator: false
    };

    if (skillFollowConfirmed)
      postItem("userskills", userSkillObj).then(() => {
        const remainingSkills = skills.filter(skill => skill.id !== id);
        setSkills(remainingSkills);
        setResults([]);
      });
  };

  const searchResultsItems = searchResults.map(({ id, name, avatar }) => {
    return (
      <div
        key={id}
        className="mb1 pa2 pt3 inline-flex items-center"
        onClick={() => handleSkillClick(id, name)}
      >
        <img src={avatar} alt="avatar" className="br-100 h1 w1 dib" />
        <span className="pl2 f6 fw6 dib">{name}</span>
      </div>
    );
  });

  return (
    <main className="pa4 black-80">
      <Link to="/">
        <div className="orange fr f4 fw3">x</div>
      </Link>
      <label className="f4 fw6 ph0 mh0" htmlFor="search">
        Search skill
      </label>
      <input
        className="center mt3 pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
        type="text"
        id="search"
        ref={searchInput}
        onChange={getSearchResults}
        autoComplete="off"
        autoFocus="on"
        placeholder=""
      />
      <div>{searchResultsItems}</div>
      <Link to="/skill/new">
        <div className="mt3 b ph3 pv2 ba black b--black bg-transparent grow f6 dib link">
          Create a skill
        </div>
      </Link>
    </main>
  );
};
