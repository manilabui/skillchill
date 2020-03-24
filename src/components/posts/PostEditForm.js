import React, { useState, useEffect, useRef } from "react"
import { Link, withRouter } from "react-router-dom"
import { useSwipeable, Swipeable } from 'react-swipeable'
import { getAll, patchItem } from "../../modules/apiManager"

const PostEditForm = ({ location }) => {
  const { id, skill } = location
  const { name, avatar, created_at } = skill
  const [currPostPages, setPages] = useState([])
  const [currPageNum, setPageNum] = useState(0)
  const [currPageContent, setContent] = useState('')
  const currPageCaption = useRef()

  const getCurrPostPages = () => {
    getAll(`postpages?post=${id}`)
      .then(pages => {
        if (pages.length) {
          const { content, page_num } = pages[0]
          setPages(pages)
          setPageNum(page_num)
          setContent(content)
        }
      })
  }

  useEffect(getCurrPostPages, [])

  const handleLeftPostSwipe = () => {
    const numOfPages = currPostPages.length

    if (numOfPages > 1 && currPageNum !== numOfPages) {
      const newPageNum = currPageNum + 1
      const { content } = currPostPages[currPageNum]

      setPageNum(newPageNum)
      setContent(content)
    } 
  }

  const handleRightPostSwipe = () => {
    const numOfPages = currPostPages.length

    if (numOfPages > 1 && currPageNum > 1) {
      const newPageNum = currPageNum - 1
      const { content, caption } = currPostPages[newPageNum - 1]

      setPageNum(newPageNum)
      setContent(content)
      setCaption(caption)
    } 
  }

  const handlePostPublish = e => {
    e.preventDefault()
    // edit post to publish
  }

  return (
    <main className='pa4 black-80'>
      <form className="measure center" onSubmit={handlePostPublish}>
        <fieldset className="ba b--transparent ph0 mh0">
          <legend className="f4 fw6 ph0 mh0">Edit Post</legend>
          <div className='mb1 dib pa2 pt3 inline-flex items-center'>
            <img src={avatar} alt="avatar"
              className="br-100 h1 w1 dib" />
            <span className='pl2 f6 fw6 dib'>{name}</span>
          </div>
          <div className='w-100'>
            <Swipeable 
              onSwipedLeft={handleLeftPostSwipe}
              onSwipedRight={handleRightPostSwipe}>
              {currPostElem}
            </Swipeable>
          </div>
          <div className="mt3">
            <label className="db fw6 lh-copy f6" htmlFor="caption">
              Caption
            </label>
            <input
              className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
              type="text"
              required
              ref={caption}
              id="caption"
              autoFocus
              placeholder=""
            />
          </div>
        </fieldset>
        <input
          className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib"
          type="submit"
          value="Share"
        />
      </form>
    </main>
  )
}

export default withRouter(PostEditForm)