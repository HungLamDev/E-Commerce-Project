import React, {  memo } from 'react';
import { Button, Votebar, VoteOption, Showcoment } from '..';
import { renderStarFromNunber } from '../../ultils/helpers';
import { apiRatings } from '../../apis';
import { useDispatch, useSelector } from 'react-redux';
import { showModal } from '../../store/appSlice';
import path from '../../ultils/path';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const Comment = ({ title, total, ratings = [], pid, rerender }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isLoggedIn } = useSelector(state => state.user);

  const handleSubmitVoteOption = async ({ comment, score }) => {
    if (!comment || !pid || !score) {
      alert('Vui lòng vote đầy đủ!');
      return;
    }
    await apiRatings({ star: score, comment, pid, updatedAt: Date.now() });
    rerender();
    dispatch(showModal({ isShowModal: false, modalChildren: null }));
  };

  const handleVoteNow = () => {
    if (!isLoggedIn) {
      Swal.fire({
        text: 'Login To Vote',
        cancelButtonText: 'Cancel',
        confirmButtonText: 'Go login',
        title: 'Oops!',
        showCancelButton: true
      }).then((rs) => {
        if (rs.isConfirmed) navigate(`/${path.LOGIN}`);
      });
    } else {
      dispatch(showModal({
        isShowModal: true,
        modalChildren: <VoteOption 
          title={title}
          handleSubmitVoteOption={handleSubmitVoteOption}
        />
      }));
    }
  };

  return (
    <div className='w-full'>
      <div className='items-center gap-2 relative bottom-[-1px]'>
        <div className='p-4 flex items-center justify-center'>Đánh giá & nhận xét sản phẩm {title}</div>
        <div className='flex'>
          <div className='flex-4 border border-red-400 flex flex-col items-center justify-center'>
            <span className='font-semibold text-3xl'>{`${total}/5`}</span>
            <span className='flex items-center gap-1'>
              {renderStarFromNunber(total)?.map((el, index) => (
                <span key={index}>{el}</span>
              ))}
            </span>
            <span className='text-sm pt-2'>{`${ratings.length} Đánh giá và nhận xét`}</span>
          </div>
          <div className='flex-6 border p-4 flex flex-col gap-2'>
            {Array.from(Array(5).keys()).reverse().map(el => (
              <Votebar
                key={el}
                number={el + 1}
                ratingTotal={ratings.length}
                ratings={ratings.filter(i => i.star === el + 1).length}
              />
            ))}
          </div>
        </div>
        <div className='flex flex-col justify-center items-center p-4 gap-2'>
          <span>Do you review this product</span>
          <Button handleOnclick={handleVoteNow}>
            Vote now
          </Button>
        </div>
        <div className='flex flex-col gap-4'>
          {ratings.map(el => (
            <Showcoment 
              key={el.id || el._id}
              star={el.star}
              updatedAt={el.updatedAt}
              comment={el.comment}
              name={`${el.postedBy?.lastname} ${el.postedBy?.firstname}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default memo(Comment)
