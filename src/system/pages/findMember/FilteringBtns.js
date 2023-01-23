import React from 'react'
import { BiFilter } from 'react-icons/bi'
import { BsArrowRightCircleFill } from 'react-icons/bs'

const FilteringBtns = ({ filterSetter, filterq }) => {
    return (
        <div className='find-member_main-filter-optoins'>
            <div className='find-member_filter-btn-div'>
                <div>
                    <button className='find-member_main-filter-option find-member_main-filter-option__filter'>Filters <BiFilter className='find-member_main_filter-ico' /></button>
                    <div className='find-member_main_filter_options_btns'>
                        <button onClick={() => filterSetter('all')} className='find-member_main-filter-option find-member_main-filter-option__all'>{filterq === 'all' ? <BsArrowRightCircleFill className='find-member_main-filter-ico__active' /> : ''}All</button>
                        <button onClick={() => filterSetter('exp')} className='find-member_main-filter-option find-member_main-filter-option__exp'>{filterq === 'exp' ? <BsArrowRightCircleFill className='find-member_main-filter-ico__active' /> : ''}Expired</button>
                        <button onClick={() => filterSetter('paid')} className='find-member_main-filter-option find-member_main-filter-option__paid'>{filterq === 'paid' ? <BsArrowRightCircleFill className='find-member_main-filter-ico__active' /> : ''}checked</button>
                        <button onClick={() => filterSetter('new')} className='find-member_main-filter-option find-member_main-filter-option__new'>{filterq === 'new' ? <BsArrowRightCircleFill className='find-member_main-filter-ico__active' /> : ''}New</button>
                        <button onClick={() => filterSetter('male')} className='find-member_main-filter-option find-member_main-filter-option__male'>{filterq === 'male' ? <BsArrowRightCircleFill className='find-member_main-filter-ico__active' /> : ''}Male</button>
                        <button onClick={() => filterSetter('female')} className='find-member_main-filter-option find-member_main-filter-option__female'>{filterq === 'female' ? <BsArrowRightCircleFill className='find-member_main-filter-ico__active' /> : ''}Female</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default FilteringBtns