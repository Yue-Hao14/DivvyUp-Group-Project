import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getExpenseCommentsThunk } from '../../store/comments'
import { getMMDDYYYY } from '../../utils/utils'
import OpenModalButton from '../OpenModalButton'
import CommentFormModal from './CommentModalComponents/CommentFormModal'
import DeleteCommentConfirmationModal from './CommentModalComponents/DeleteCommentConfirmationModal'
import './Comments.css'

function Comments({ expenseId }) {
    const dispatch = useDispatch();
    const sessionUser = useSelector(state => state.session.user)
    const comments = useSelector(state => state.comments[expenseId])

    // sort comments from oldest to newest
    const orderedComments = comments?.sort((a,b) => {
        return (new Date(a.createdAt)).valueOf() - (new Date(b.createdAt)).valueOf()
    })

    useEffect(() => {
      dispatch(getExpenseCommentsThunk(expenseId))
    }, [dispatch, expenseId])

  return (
    <>
    {/* <div className="comment_heading_container"></div> */}
      <div className={`comments_heading ${comments && comments.length === 0 ? 'no_comments_heading' : ''}`}>
      {comments && comments.length === 0 ? 'Be the first to comment!' : 'COMMENTS'}
    </div>
      <div className='comments_container'>
        {orderedComments &&
          orderedComments.map(comment => {
            const fomattedCreatedAt = getMMDDYYYY(new Date(comment.createdAt))
            const fomattedUpdatedAt = getMMDDYYYY(new Date(comment.updatedAt))

            return (
              <div key={comment.id} className='comment_div'>
                {sessionUser.id === comment.user.id && (
                  <div className='comment_edit_delete_buttons_div'>
                    <OpenModalButton
                      buttonText={
                        <i className='edit_comment_button fa-solid fa-pen-to-square' />
                      }
                      modalComponent={
                        <CommentFormModal
                          expenseId={expenseId}
                          commentId={comment.id}
                        />
                      }
                    />
                    <OpenModalButton
                      buttonText={
                        <i className='remove_comment_button fa-solid fa-trash' />
                      }
                      modalComponent={
                        <DeleteCommentConfirmationModal comment={comment} />
                      }
                    />
                  </div>
                )}
                <div
                  className={
                    sessionUser.id === comment.user.id
                      ? 'comment_wrapper_with_buttons'
                      : 'comment_wrapper'
                  }
                >
                  <div className='comment'>{comment.comment}</div>
                </div>
                <div className='comment_details_div'>
                  <div className='comment_author'>
                    {comment.user.firstName} {comment.user.lastName[0]}.
                  </div>
                  <div className='comment_timestamp_div'>
                    <div className='comment_timestamp'>
                      Posted On: {fomattedCreatedAt}
                    </div>
                    <div className='comment_timestamp'>
                      Last Edited: {fomattedUpdatedAt}
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        <OpenModalButton
          className='post_comment_button'
          buttonText='Add a Comment'
          modalComponent={<CommentFormModal expenseId={expenseId} />}
        />
      </div>
    </>
  )
}

export default Comments
