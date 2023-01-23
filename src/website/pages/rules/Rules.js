import React from 'react'
import Nav from '../../components/Nav'
import './rules.css'
const Rules = () => {
    return (
        <div className='rules'>
            <Nav active={'rules'}/>
            <h1 className='rules_header'>FX3 Rules</h1>
            <ol className='rules_list'>
                <li> <span className='rules_list_num'>1</span>ممنوع الانتظار داخل الجيم </li>
                <li> <span className='rules_list_num'>2</span>  مممنوع الاحذية داخل المنطقة الحمراء   </li>
                <li> <span className='rules_list_num'>3</span>رجع ادواتك مكانها</li>
                <li> <span className='rules_list_num'>4</span>مترزعش الاوزان علي الارض</li>
                <li> <span className='rules_list_num'>5</span>احترام مساحة الاخرين وقت التمرين</li>
                <li> <span className='rules_list_num'>6</span>الجيم غير مسؤول عن فقدان المتعلقات الشخصية</li>
            </ol>
        </div>
    )
}

export default Rules