import React, { useState, useEffect, useRef } from "react"
import { withRouter } from "react-router-dom"
import { Swipeable } from 'react-swipeable'
import { getAll, patchItem } from "../../modules/apiManager"

const PostEditForm = ({ location, history }) => {
  const { post_id, skill, post_type } = location.state
  const { name, avatar } = skill
  const [currPostPages, setPages] = useState([])
  const [currPageNum, setPageNum] = useState(0)
  const [currPageContent, setContent] = useState('')
  const [currPageCaption, setCaption] = useState('')
  const currCaptionInput = useRef()

  const getCurrPostPages = () => {
    getAll(`postpages?post=${post_id}`)
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

  // TODO: refactor to combine left and right swipe
  const handleLeftPostSwipe = () => {
    const numOfPages = currPostPages.length

    if (numOfPages > 1 && currPageNum !== numOfPages) {
      const newPageNum = currPageNum + 1
      const { content, caption } = currPostPages[currPageNum]
      const currCaptionInputValue = currCaptionInput.current.value

      if (currPageCaption !== currCaptionInputValue) {
        const newPostPages = currPostPages
        newPostPages[currPageNum-1].caption = currCaptionInputValue
        setPages(newPostPages)
      }

      setPageNum(newPageNum)
      setContent(content)
      setCaption(caption)
      currCaptionInput.current.value = caption
    }   
  }

  const handleRightPostSwipe = () => {
    const numOfPages = currPostPages.length

    if (numOfPages > 1 && currPageNum > 1) {
      const newPageNum = currPageNum - 1
      const { content, caption } = currPostPages[newPageNum - 1]
      const currCaptionInputValue = currCaptionInput.current.value

      if (currPageCaption !== currCaptionInputValue) {
        const newPostPages = currPostPages
        newPostPages[currPageNum-1].caption = currCaptionInputValue
        setPages(newPostPages)
      }

      setPageNum(newPageNum)
      setContent(content)
      setCaption(caption)
      currCaptionInput.current.value = caption
    }
  }

  const handlePostPublish = e => {
    e.preventDefault()

    const currCaptionInputValue = currCaptionInput.current.value

    if (currPageCaption !== currCaptionInputValue) {
      const newPostPages = currPostPages
      newPostPages[currPageNum-1].caption = currCaptionInputValue
      setPages(newPostPages)
    }

    const postObj = {
      modified_at: null,
      is_public: true
    }

    Promise.all(
      currPostPages.map(({ id, caption }) => {
        const postPageObj = {
          modified_at: null,
          caption
        }
        
        patchItem('postpages', id, postPageObj)
      })
    )

    patchItem('posts', post_id, postObj)
    history.push('/')
  }

  const currPostElem = post_type === 'Photo'
    ? 
      <img avatar='Post'
        className='w-100'
        src={currPageContent}
      /> 
    :
      <video autoPlay preload='true'
        className='w-100' 
        src={currPageContent}
        type="video/mp4"
      />

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
              ref={currCaptionInput}
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